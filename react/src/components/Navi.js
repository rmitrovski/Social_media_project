import 'bootstrap/dist/css/bootstrap.css' // Imports react components from bootstrap
import { Nav, Navbar} from 'react-bootstrap'
import { Container } from "react-bootstrap";
import image_logo from '../assets/logo.png'; // Import logo
import {FaHome, FaRegEdit} from 'react-icons/fa'; // Imports react icons from react-icons
import { BiLogIn, BiLogOut } from "react-icons/bi"; // Import icons from BoxIcon
import { MdManageAccounts } from "react-icons/md"; // Import icons from Material Design icons 
import {useState} from 'react';

function Navi(props) { // Navi function that has the user's details
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => { // Function if user hovers over navbar links
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  
  return (
    // Navbar //
    <Navbar class = "nav_bar">
        <Container class = "nav_bar_contents">
          <div class = "logo">
            <Navbar.Brand href = "Home"><img src={image_logo} alt = "logo"/></Navbar.Brand> 
          </div>
          <Nav className = "me-auto" class = "nav_links">
            <div class = "nav_btn" >
              <Nav.Link href = "Home">
                {/* Detects if navlink is being hovered over and sets value as true or false */}
              <div onMouseOver = {handleMouseOver} onMouseOut = {handleMouseOut}> 
                <FaHome class = "nav_icons" alt = "Home"/>
                {/* If hovered over, display name of nav icon */}
                {isHovering && <h3 className = "hovered_nav">Home</h3>}
              </div>
              </Nav.Link>
            </div>
            <div class = "nav_btn">
            {props.user != null ? // Check if user is not logged in then show the login button
              <Nav.Link href = "Feed">
              <div onMouseOver = {handleMouseOver} onMouseOut = {handleMouseOut}>
                <FaRegEdit class = "nav_icons" alt = "News Feed"/>
                {isHovering && <h3 className = "hovered_nav">Posts</h3>}
              </div>
              </Nav.Link>
              :
              <Nav.Link href = "Login">
              <div onMouseOver = {handleMouseOver} onMouseOut = {handleMouseOut}>
                <FaRegEdit class = "nav_icons" alt = "News Feed"/>
                {isHovering && <h3 className = "hovered_nav">Posts</h3>}
              </div>
              </Nav.Link>
            }
            </div>
          </Nav>
        </Container>
        {props.user !== null ? // Profile button is displayed only to logged in users
            <div class = "nav_btn3">
              <Nav.Link href = "Profile"  activeClassName="active">
              <div onMouseOver = {handleMouseOver} onMouseOut = {handleMouseOut}>
                <MdManageAccounts class = "nav_icons" alt = "Profile"/>
                {isHovering && <h3 className = "hovered_nav">Profile</h3>}
              </div>
              </Nav.Link>
            </div>
            :
            <p class = "nav_btn3_hidden"></p> // Display nothing when a user is not logged in
          }
        <div class = "nav_btn2">
          {props.user === null ? // Logged out users are displayed the login button
            <Nav.Link href = "Login" activeClassName = "active-link">
              <div onMouseOver = {handleMouseOver} onMouseOut = {handleMouseOut}>
                <BiLogIn class = "nav_icons" alt = "Login"/>
                {isHovering && <h3 className = "hovered_nav">Login</h3>}
              </div>
            </Nav.Link>
            : // Show the logout button when user is logged in
            <Nav.Link href = "Login" activeClassName = "active-link"> 
              <div onMouseOver = {handleMouseOver} onMouseOut = {handleMouseOut}>
                <BiLogOut class = "nav_icons" alt = "Logout" onClick={props.logoutUser}/>
                {isHovering && <h3 className = "hovered_nav">Logout</h3>}
              </div>
            </Nav.Link>
          }
        </div>
      </Navbar>
  );
}

export default Navi;