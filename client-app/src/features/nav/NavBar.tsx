import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

interface IProps {
}

const NavBar:React.FC<IProps> = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
            <img src="/assets/logo.png"></img>
            Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to='/activities'/>
        <Menu.Item name="friends">
            <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);