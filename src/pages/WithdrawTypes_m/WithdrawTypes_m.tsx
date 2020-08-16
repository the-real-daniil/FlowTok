import React, {ComponentType, FC} from "react";
import {Page_m} from "../../components/Page/Page_m";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {withRouter} from "react-router";
import {withAuthRedirect, withCabinetRedirect} from "../../hocs/hocs";
import {withdrawTypes} from "../Withdraw_m/Withdraw_m";

type PropsType = {}


const WithdrawTypes_m: FC<PropsType> = () => {

   return (
      <Page_m>
         <div className={styles.container}>
            {Object.keys(withdrawTypes).map((key: string, idx: number) => (
               <div className={styles.btn} key={idx}>
                  <NavLink to={`/withdraw/${key}`}>
                     <Button>
                        {withdrawTypes[key].label}
                     </Button>
                  </NavLink>
               </div>
            ))}
         </div>
      </Page_m>
   )
}

export default compose<ComponentType>(
   withRouter,
   withAuthRedirect,
   withCabinetRedirect
)(WithdrawTypes_m)