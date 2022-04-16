import { Container, Dropdown, Menu } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { useStore } from 'app/stores/store';

export default observer(function NavBar() {
    const {userStore: {user, logout}} = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item exact as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 5 }} />
                    Phone Notebook
                </Menu.Item>
                <Menu.Item as={NavLink} to='/notes' name="notes" />
                <Menu.Item as={NavLink} to='/createnote' content="Create note" />
                <Menu.Item position='right'>
                    <Dropdown pointing="top left" text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout} text="Logout" icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>

        </Menu>
    )
})