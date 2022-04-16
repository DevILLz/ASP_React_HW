import MyTextInput from "app/common/form/MyTextInput";
import { useStore } from "app/stores/store";
import ValidationErrors from "features/errors/ValidationErrors";
import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Header } from "semantic-ui-react";
import * as Yup from 'yup'

export default observer(function LoginForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{displayName: '',username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.register(values).catch(error =>
                    setErrors({ error }))}
                    validationSchema={Yup.object({
                        displayName: Yup.string().required(),
                        username: Yup.string().required(),
                        email: Yup.string().required().email(),
                        password: Yup.string().required()
                    })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="error" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivites' textAlign='center'/>
                    <MyTextInput name='displayName' placeholder='DisplayName' />
                    <MyTextInput name='username' placeholder='UserName' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() =><ValidationErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})