import React, {FC} from 'react';
import styles from "./styles.module.scss"
import WorkBlock from "../../components/Profile_mPage/WorkBlock/WorkBlock";
import NavBar from "../../components/Profile_mPage/NavBar/NavBar";
import {compose} from 'redux';
import {withAuthRedirect, withTaskRedirect} from "../../hocs/hocs";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

type PropsType = {}

const Work_m: FC<PropsType> = () => {
   const isDesktop = useSelector((state: RootStateType) => state.app.isDesktop)
   return (
      <div className={styles.wrapper}>
         <WorkBlock/>
         <NavBar isDesktop={isDesktop} pageName={"Work"} newTasksNumber={null}/>
      </div>
   )

}

export default compose<FC>(
   withTaskRedirect,
   withAuthRedirect
)(Work_m)