import { Container } from 'semantic-ui-react';
import NoteDashboard from 'features/notes/dashboard/NoteDashboard';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage'
import NoteForm from 'features/notes/form/NoteForm'
import NoteDetails from 'features/notes/details/NoteDetails';
import { ToastContainer } from 'react-toastify';
import NotFound from 'features/errors/NotFound';
import ServerError from 'features/errors/ServerError';
import { useStore } from 'app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponents';
import ModalContainer from 'app/common/modals/ModalContainer';
import PrivateRoute from './PrivateRoute';
function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token)
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    else
      commonStore.setAppLoaded()
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading app..."/>

  return (
    <div>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer/>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '65px' }}>
              <Switch>
                <PrivateRoute exact path='/notes' component={NoteDashboard} />
                <PrivateRoute path='/notes/:id' component={NoteDetails} />
                <PrivateRoute key={location.key} path={['/createnote', '/manage/:id']} component={NoteForm} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )} />
    </div>
  );
}

export default observer(App);
