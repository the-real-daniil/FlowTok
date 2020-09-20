import React from "react";
import {Page} from "../../components/Page/Page";
import styles from "./styles.module.scss"
import Button from "../../components/Button/Button";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import {TikTokForm} from "../../components/forms/TikTokForm/TikTokForm";
import {UserDataForm} from "../../components/forms/UserDataForm/UserDataForm";
import {Separator} from "../../components/Separator/Separator";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {NavLink} from "react-router-dom";

export const Registration = () => {

   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)

   return (
      <Page>
         {!isDesktop && <TopNavbar label={"Регистрация"}/>}
         <div className={styles.container}>
            {isDesktop &&
            <div className={styles.title}>
	            Регистрация
            </div>}
            <div className={styles.block}>
               <div className={styles.btn}>
                  <Button mod={"Google"} isActive={true}>Войти через Google</Button>
               </div>
               <div className={styles.btn}>
                  <Button mod={"VK"}> Войти через VK</Button>
               </div>
               <Separator m={"12px 0"}/>
               <TikTokForm/>
               <UserDataForm/>
            </div>
            <div className={styles.btnGo}>
               <NavLink to={"/profile"}>
                  <Button mod={"grey"}>
                     Перейти в мой FlowTok
                  </Button>
               </NavLink>
            </div>
         </div>
      </Page>
   )
}