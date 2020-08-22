import React, {FC, FormEvent, useState} from "react";
import {Field, FieldProps, Form, Formik, FormikValues} from "formik";
import styles from "./styles.module.scss";
import classNames from "classnames";
import {validateRequiredField, createWithdrawAmountValidator} from "../../../utils/validators";
import Button from "../../Button/Button";
import {WithdrawTypes, withdrawTypes} from "../../../pages/Withdraw_m/Withdraw_m";
import MaskedInput from 'react-text-mask'
import {WithdrawPayloadType} from "../../../api/user-api";
import {withdraw} from "../../../redux/user-reducer";
import {useDispatch} from "react-redux";
import Input from "../../Input/Input";
import {ChooseAmount} from "../common/ChooseAmount/ChooseAmount";


type PropsType = {
   withdrawType: WithdrawTypes
   onChange: (e: FormEvent<HTMLInputElement>) => void
   className: string
   id: string
}

const InputWithMask: FC<PropsType> = ({withdrawType, onChange, className, id}) => {
   return <MaskedInput
      mask={withdrawTypes[withdrawType].mask as Array<RegExp | string>}
      placeholder={withdrawTypes[withdrawType].placeholder as string}
      className={className}
      onChange={onChange}
      id={id}
   />
}

export type WithdrawFormValuesType = {
   wallet: string
   amount: string
}

type WithdrawFormPropsType = {
   type: WithdrawTypes
}

export const WithdrawForm: FC<WithdrawFormPropsType> = ({type,}) => {
   const dispatch = useDispatch()

   const onSubmit = (values: WithdrawFormValuesType, {resetForm}: FormikValues) => {
      const payload: WithdrawPayloadType = {
         money: +values.amount,
         purse: values.wallet,
         type: type,
      }
      dispatch(withdraw(payload))
      resetForm()
   }

   type ActiveBtnType = 100 | 500 | 1000 | 0  // 0 - nobody is selected
   const [activeBtn, setActiveBtn] = useState(0 as ActiveBtnType)
   const amountValidator = createWithdrawAmountValidator(type)

   return (
      <Formik
         validate={(values: WithdrawFormValuesType) => {
            if (+values.amount !== activeBtn) {
               setActiveBtn(0)
            }
         }}
         initialValues={{
            wallet: "",
            amount: "",
         }}
         onSubmit={onSubmit}
         className={styles.formik}
      >
         {
            ({setFieldValue, errors, touched, values}) =>
               <Form className={styles.wrapper}>
                  <div>
                     <div className={styles.label}>
                        {withdrawTypes[type].label}
                     </div>
                     <Field name={"wallet"}
                            validate={validateRequiredField}
                            render={({field}: FieldProps) => <InputWithMask
                               {...field}
                               onChange={(e) => setFieldValue("wallet", e.currentTarget.value)}
                               id={"wallet"}
                               withdrawType={type}
                               className={classNames(styles.input, {[styles.error]: errors.wallet && touched.wallet})}
                            />}
                     />
                     <ChooseAmount setFieldValue={setFieldValue} amount={values.amount} field={"amount"}/>
                     <Field name={"amount"}
                            placeholder={"Ввести свою сумму"}
                            type={"number"}
                            validate={amountValidator}
                            className={classNames(styles.input, {[styles.error]: errors.amount && touched.amount})}
                     />
                     {touched.amount && <div className={styles.errorMsg}>{errors.amount}</div>}
                  </div>
                  <div className={styles.submitBtn}>
                     <Button type="submit">
                        Заказать выплату
                     </Button>
                  </div>
               </Form>}
      </Formik>
   )
}