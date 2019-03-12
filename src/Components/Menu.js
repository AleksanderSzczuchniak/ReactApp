import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Button, Responsive } from "semantic-ui-react";
import image from "./trackenLogo.svg";
import firebase from "firebase";
import "./MainMenu.css";
import Auth from "../Auth/Auth";
import ProfilePage from "../ProfilePage";

const NavItem = ({ to, children, exact }) => (
  <Menu.Item to={to} as={NavLink} exact={exact}>
    {children}
  </Menu.Item>
);

class MainMenu extends Component {
  state = {
    user: null,
    isOpen: false
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  handleToggle = () => this.setState({ isOpen: !this.state.isOpen });

  renderMenu(isTogglable = false) {
    const { user, isOpen } = this.state;
    return (
      <div>
        <Menu stackable>
          <Menu.Item>
            <img className="menuLogo" src={image} alt="tracken-logo" />

            {isTogglable && (
              <Button className="menuButton" onClick={this.handleToggle}>
                <p>Show Menu</p>
              </Button>
            )}
          </Menu.Item>
          {((isTogglable === true && isOpen) || isTogglable === false) && (
            <>
              <NavItem exact to="/" as={NavLink}>
                Home
              </NavItem>
              <NavItem to="/dashboard" as={NavLink}>
                Dashboard
              </NavItem>
              <Auth>
                <NavItem to="/contacts-book" as={NavLink}>
                  Contacts Book
                </NavItem>
                <NavItem to="/chat" as={NavLink}>
                  Chat
                </NavItem>
                <NavItem to="/profile-page" as={ProfilePage}>
                  My Profile
                </NavItem>
                <Menu.Item>
                  {user && (
                    <p>
                      <span id="loggenInAs">Logged in as:</span>
                      <span id="loggedInUser">{user.email} </span>
                      <Button
                        id="signOutButton"
                        negative
                        size="mini"
                        onClick={() =>
                          firebase
                            .auth()
                            .signOut()
                            .then(() => this.props.history.push("/"))
                        }
                      >
                        Sign out
                      </Button>
                    </p>
                  )}
                </Menu.Item>
              </Auth>
            </>
          )}
        </Menu>
      </div>
    );
  }

  render() {
    const threshold = Responsive.onlyMobile.maxWidth;
    return (
      <div>
        <Responsive maxWidth={threshold}>{this.renderMenu(true)}</Responsive>
        <Responsive minWidth={threshold + 1}>{this.renderMenu()}</Responsive>
      </div>
    );
  }
}
export default withRouter(MainMenu);