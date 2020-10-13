import {BaseThunkType, InferActionsType} from "../store";
import {authApi, AuthMeReqPayloadType, SendMoreInfoReqPayloadT} from "../../api/auth-api";
import {getUserData, userActions} from "../user/user-reducer";
import {checkMessageNotification} from "../../utils/checkMessageNotification";
import {appActions, initialize} from "../app/app-reducer";
import {tikTokUrlParser} from "../../utils/tikTokUrlParser";
import {commonThunkHandler} from "../../utils/commonThunkHandler";
import {userApi, VerifyPayloadType} from "../../api/user-api";
import {createAuthReqBody} from "../../utils/createAuthReqBody";
import {setLanguage} from "../../utils/setLanguage";

const initialState = {
   isNew: false,
   isAuth: false,
   role: "Nobody" as UserRolesType,
   firstSuccess: false,
   secondSuccess: false,
   isAdv: false,
   loginSuccess: false,
   tikTokSuccess: false,
   verifySuccess: false,
   needMoreInfo: false
}
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case "auth/SET_IS_NEW":
         return {
            ...state,
            isNew: action.isNew
         }
      case "auth/SET_LOGIN_SUCCESS":
         return {
            ...state,
            loginSuccess: action.success
         }
      case "auth/SET_VERIFY_SUCCESS":
         return {
            ...state,
            verifySuccess: action.success
         }
      case "auth/SET_IS_AUTH":
         return {
            ...state,
            isAuth: action.isAuth
         }
      case "auth/SET_IS_ADV":
         return {
            ...state,
            isAdv: action.isAdv
         }
      case "auth/SET_USER_ROLE":
         return {
            ...state,
            role: action.role
         }
      case "auth/SET_NEED_MORE_INFO":
         return {
            ...state,
            needMoreInfo: action.flag
         }
      case "auth/CLEAR":
         return {
            ...state,
            role: "Nobody",
            secondSuccess: false,
            firstSuccess: false,
            isAuth: false,
            isNew: false,
         }
      default:
         return state
   }
}
export default authReducer

export const authActions = {
   setIsNew: (isNew: boolean) => ({type: "auth/SET_IS_NEW", isNew} as const),
   setIsAuth: (isAuth: boolean) => ({type: "auth/SET_IS_AUTH", isAuth} as const),
   setIsAdv: (isAdv: boolean) => ({type: "auth/SET_IS_ADV", isAdv} as const),
   setUserRole: (role: UserRolesType) => ({type: "auth/SET_USER_ROLE", role} as const),
   setLoginSuccess: (success: boolean) => ({type: "auth/SET_LOGIN_SUCCESS", success} as const),
   setVerifySuccess: (success: boolean) => ({type: "auth/SET_VERIFY_SUCCESS", success} as const),
   setNeedMoreInfo: (flag: boolean) => ({type: "auth/SET_NEED_MORE_INFO", flag} as const),
   clear: () => ({type: "auth/CLEAR"} as const),
}

export const authMe = (payload: AuthMeReqPayloadType,
                       handleReset: () => void,
                       setIsLoading: (flag: boolean) => void,): ThunkType => {
   return async (dispatch, getState) => {
      // login & registration
      await commonThunkHandler(async () => {
         setIsLoading(true)

         // set refId in payload
         const refId = localStorage.getItem("ref")
         if (refId) {
            payload.ref = refId
         }

         const data = await authApi.authMe(payload)

         if (data.success) {
            // if token received set it
            localStorage.setItem("token", data.data.token)
            handleReset() // reset form

            if (data.data.needMoreInfo) {
               dispatch(authActions.setNeedMoreInfo(true))
            } else {
               await dispatch(getUserData())
            }


         } else if (!data.success && data.error && data.error.name === "wrong_password") {
            dispatch(appActions.setError("Неверный пароль!"))
         } else {
            await dispatch(exit())
         }
         setIsLoading(false)
         checkMessageNotification(data, dispatch)
      }, dispatch)
   }
}

export const exit = (): ThunkType => {
   return async (dispatch) => {
      // log out and clear all
      localStorage.setItem("token", "")
      dispatch(authActions.clear())
      dispatch(userActions.clear())
      dispatch(appActions.clear())
      await dispatch(initialize())
   }
}

type ActionsType = InferActionsType<typeof authActions>
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType
export type UserRolesType = "Blogger" | "Advertiser" | "Nobody"
export type LoginStepType = 1 | 2 | 3