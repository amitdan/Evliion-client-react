import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AppHeader.css';
import pollIcon from '../poll.svg';
import { ACCESS_TOKEN } from "../constants";
import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;
    
class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
        let menuItems;
        if(sessionStorage.getItem(ACCESS_TOKEN)) {
          menuItems = [
            <Menu.Item key="/" title="Home"><Link to="/" className="homeLink"><Icon type="home" className="nav-icon" /></Link></Menu.Item>,
            <Menu.Item key="/EV/new" title="Poll"><Link to="/EV/new" className="new"><img src={pollIcon} alt="poll" className="poll-icon" /></Link></Menu.Item>,
            <Menu.Item key="/map" title="Map"><Link to="/map" className="map"><Icon type="global" className="nav-icon" /></Link></Menu.Item>,
            <Menu.Item key="/store" title="Store"><Link to="/store" className="store addstore editstore"><Icon type="shop" className="nav-icon" /></Link></Menu.Item>,
            <Menu.Item key="/inventory" title="Inventory"><Link to="/inventory" className="inventory addinventory editinventory"><Icon type="solution" className="nav-icon" /></Link></Menu.Item>,
            <Menu.Item key="/profile" title="Profile" className="profile-menu profile"><ProfileDropdownMenu currentUser={this.props.currentUser} handleMenuClick={this.handleMenuClick}/></Menu.Item>
          ]; 

          return (
              <Header className="app-header">
              <div className="container">
                <div className="app-title" >
                  <Link to="/">
                  <svg fill="#1890ff" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path  d="M3,22V8H7V22H3M10,22V2H14V22H10M17,22V14H21V22H17Z" />
                  </svg> Evilion
                    </Link>
                </div>
                <Menu
                  className="app-menu"
                  mode="horizontal"
                  selectedKeys={[this.props.location.pathname]}
                  style={{ lineHeight: '64px' }} >
                    {menuItems}
                </Menu>
              </div>
            </Header>
          );
        } else {
          return (
            <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/">Evilion</Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }}>
              </Menu>
            </div>
          </Header>
        );
        }
    }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser ? props.currentUser.name : "" }
        </div>
        <div className="username-info">
          @{props.currentUser ? props.currentUser.username : ""}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser ? props.currentUser.username : ""}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
         <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);