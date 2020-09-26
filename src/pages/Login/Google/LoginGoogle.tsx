import React, {FC, useState} from "react";
import Button from "../../../components/Button/Button";
import {login} from "../../../redux/auth/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import GoogleLogin from "react-google-login";
import {appActions} from "../../../redux/app/app-reducer";
import {RootStateType} from "../../../redux/store";

export const LoginGoogle: FC = () => {
   const dispatch = useDispatch()
   const [buttonSuccess, setButtonSuccess] = useState(false)
   const loginSuccess = useSelector((state: RootStateType) => state.auth.loginSuccess)

   const onGmButtonClick = (response: any) => {
      const googleId = "gm-" + response.googleId // generation google auth key
      dispatch(login(googleId, "", setButtonSuccess))
   }

   if (loginSuccess && !buttonSuccess) return <></>

   return (
      <GoogleLogin
         clientId="224348627605-9d3vp1ee0pp05558495ird5njsbtindh.apps.googleusercontent.com"
         onSuccess={onGmButtonClick}
         onFailure={() => {
            dispatch(appActions.setError("Что-то пошло не так...\n Попробуйте снова"))
         }}
         render={renderProps => (
            <Button onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    mod={"Google"}
                    isActive={buttonSuccess}
            >
               {buttonSuccess && "Вы вошли через Google"}
               {!buttonSuccess && "Войти через Google"}
            </Button>
         )}
      />
   )
}