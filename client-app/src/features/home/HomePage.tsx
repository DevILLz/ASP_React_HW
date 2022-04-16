import { useStore } from 'app/stores/store';
import LoginForm from 'features/users/LoginForm';
import RegisterForm from 'features/users/RegisterForm';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();
    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted >
                    <Image size='massive' src='/assets/Logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Notebook
                </Header>
                {userStore.isLoggedIn
                    ? (<>
                        <Header as='h2' inverted content='Welcome to Notebook' />
                        <Button as={Link} to='/notes' size='huge' inverted content="Go To Notes!" />
                    </>)
                    : (<>

                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted content="Log in" />
                        <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted content="Register" />

                    </>)}


            </Container>
        </Segment>
    )
})