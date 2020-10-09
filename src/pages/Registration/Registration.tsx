import React from "react";
import {Page} from "../../components/Page/Page";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {LoginVideo} from "../../components/LoginVideo'/LoginVideo";
import {Logo} from "../../components/Logo/Logo";
import {RegForm} from "../../components/forms/RegForm/RegForm";

export const Registration = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <Page h100={true}>
         {isDesktop && <LoginVideo/>}
         {isDesktop && <Logo/>}
         {!isDesktop && <TopNavbar label={"Регистрация"} logo={false}/>}
         <div className={styles.container}>
            {isDesktop &&
            <div className={styles.title}>
	            Регистрация
            </div>}
            <div className={styles.block}>
               <RegForm/>
            </div>
         </div>
      </Page>
   )
}