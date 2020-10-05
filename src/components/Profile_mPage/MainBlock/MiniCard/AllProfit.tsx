import React, {FC} from "react";
import styles from "./styles.module.scss"
import {UserMoneyT} from "../../../../api/user-api";

export type PropsType = {
   allTimeMoney: UserMoneyT
   dayMoney: UserMoneyT
}

export const AllProfit: FC<PropsType> = ({allTimeMoney, dayMoney}) => {
   const {all, large, refrigerator, small} = allTimeMoney

   return (
      <div data-test={"wrapper"} className={styles.wrapper}>
         <div className={styles.label}>
            Получено за все время
         </div>
         <div className={styles.money}>
            {all}₽
            <p className={styles.profit}>+{dayMoney.all}₽</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.column}>
               <p className={styles.size}>Small</p>
               <p className={styles.money_2}>{small}₽</p>
               <p className={styles.profit}>+{dayMoney.small}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Large</p>
               <p className={styles.money_2}>{large}₽</p>
               <p className={styles.profit}>+{dayMoney.large}₽</p>
            </div>
            <div className={styles.column}>
               <p className={styles.size}>Холодильник</p>
               <p className={styles.money_2}>{refrigerator}₽</p>
               <p className={styles.profit}>+{dayMoney.refrigerator}₽</p>
            </div>
         </div>
      </div>
   )
}