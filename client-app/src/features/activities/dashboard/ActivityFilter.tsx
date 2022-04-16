import { Header, Menu } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import Calendar from 'react-calendar';

export default observer(function ActivityFilter() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%' }}>
                <Header icon='filter' attached='top' color='teal' content='Filters' />
                <Menu.Item content='All activities' />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hosting" />
            </Menu>
            <Header />
            <Calendar />
        </>
    )
})