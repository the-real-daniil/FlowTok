import {BaseResponseType, instance, NotificationT} from "./api";
import {BaseBodyT} from "./user-api";


export const authApi = {
   authMe(body: AuthMeReqPayloadType) {
      return instance.post<BaseResponseType<AuthMeResDataType>>("/users/new", body).then(res => res.data)
   },
   sendMoreInfo(body: SendMoreInfoReqPayloadT) {
      return instance.put<BaseResponseType<SendMoreResDataT>>("/users/udata", body  ).then(res => res.data)
   },
};

type AuthMeResDataType = {
   token: string
   notification?: NotificationT
   needMoreInfo: boolean
}
type SendMoreResDataT = {
   token: string
   notification?: NotificationT
}
export type AuthMeReqPayloadType = {
   auth: string
   password: string
   type?: "u"|"f"
   inn?: string
   ogrn?: string
   name?: string
   ref?: string
   timeOffset: number
   userName?: string
   surname?: string
} & BaseBodyT
export type SendMoreInfoReqPayloadT = {
   inn: string
   ogrn: string
   name: string
} & BaseBodyT

