import '../App.css'; //Imports CSS 
import { Nav} from 'react-bootstrap'
import {FaFacebook, FaInstagram, FaTwitter, FaTiktok} from 'react-icons/fa'; //Imports icons from react-icons/fa

function Footer(props) {
  return (
    <div className = "footer_sticky">
      <div className = "container">
        <div className = "row">
          {/* Sitemap*/}
          <div className = "col">
              <h4><u>LAN Media</u></h4>
              <ul className = "list-unstyled">
                <li><a href = "Home" class = "footer_sitemap">Home</a></li>
                {props.user === null ? // Check if user is not logged in then show the posts button
                <Nav.Link href = "Login">
                  <li>Posts</li>
                </Nav.Link>
                : // Show the logout button otherwise
                <Nav.Link href = "Feed"> 
                  <li>Posts</li>
                </Nav.Link>
                }
                <li><a href = "Register" class = "footer_sitemap">Register</a></li>
                {props.user === null ? // Check if user is not logged in then show the login button
                <Nav.Link href = "Login">
                  <li>Login</li>
                </Nav.Link>
                : // Show the logout button otherwise
                <Nav.Link href = "Login"> 
                  <li onClick = {props.logoutUser}>Logout</li>
                </Nav.Link>
                }
              </ul> 
            </div>
            {/* Social Media */}
            <div className = "col">
              <h4>Social Media</h4>
              <div class = "footer_socials">
                <ul className = "social_designs">
                  <li class = "facebook"><i class = "fab fa-facebook"></i><FaFacebook class = "nav_icons" alt = "Facebook"/></li>
                  <li class = "instagram"><i class = "fab fa-instagram"></i><FaInstagram class = "nav_icons" alt = "Instagram"/></li>
                  <li class = "twitter"><i class = "fab fa-twitter"></i><FaTwitter class = "nav_icons" alt = "Twitter"/></li>
                  <li class = "tiktok"><i class = "fab fa-tiktok"></i><FaTiktok class = "nav_icons" alt = "Tiktok"/></li>
                </ul> 
              </div>
            </div>
            {/* Login Quick Link */}
            <div className = "col">
              <div className = "footer_join ">
              <h4>Join us and explore LAN social network!</h4>
                <input type = "email" placeholder = "example@email.com" id = "footer_join"></input>
                <form action = "Login">
                  <input type = "submit" value = "Join NOW" id = "footer_join_button"></input>
                </form>
              </div>
            </div>
        </div>
        <hr/>
        <div className = "footer_row">
          <p className = "column-sml">
            &copy;{new Date().getFullYear()} Loop Agile Now | All rights reserved | Terms of Use | Privacy {/* Displays the current year */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
