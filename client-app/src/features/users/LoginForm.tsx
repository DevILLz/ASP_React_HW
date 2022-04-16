import MyTextInput from "app/common/form/MyTextInput";
import { useStore } from "app/stores/store";
import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Header, Label } from "semantic-ui-react";


export default observer(function LoginForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.login(values).catch(error =>
                    setErrors({ error: 'Invalid email or password' }))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Log in to Notebook' textAlign='center'/>
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() => <Label style={{ marginBottom: 10 }} id="red" content={errors.error} />}
                    />
                    <Button loading={isSubmitting} content='Login' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})