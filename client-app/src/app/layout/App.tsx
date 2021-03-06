import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import ActivityDashboard from "../../features/activties/dashboard/ActivityDashboard";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activties/form/ActivityForm";
import ActivityDetails from "../../features/activties/details/ActivityDetails";
import NotFound from "./NotFound";
import {ToastContainer} from 'react-toastify';
import LoginForm from "../../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if(token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if(!appLoaded) return <LoadingComponent content='Loading app...'></LoadingComponent>

  return (
    <Fragment>
      <ModalContainer></ModalContainer>
      <ToastContainer position='bottom-right'></ToastContainer>
      <Route exact path="/" component={HomePage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar></NavBar>
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  exact
                  path="/activities"
                  component={ActivityDashboard}
                ></Route>
                <Route
                  path="/activities/:id"
                  component={ActivityDetails}
                ></Route>
                <Route
                  path={["/createActivity", "/manage/:id"]}
                  key={location.key}
                  component={ActivityForm}
                ></Route>
                <Route path='/profile/:username' component={ProfilePage}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Container>
          </Fragment>
        )}
      ></Route>
    </Fragment>
  );
};

export default withRouter(observer(App));
