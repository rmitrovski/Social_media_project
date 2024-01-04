import '../App.css'; // Imports CSS
import image from '../assets/landing_welcome.png'; // Imports image from assets/home_welcome.png
import { AiOutlineArrowDown } from "react-icons/ai"; // Imports icons from ai.

function Home() {
  return (
    // LAN Landing Page //
    <div className = "landing_page_wrap">
      <div className = "landing_page_left_content">
        <h4>YOUR TIME</h4>
        <h1>Kick Back<br/>
            Relax<br/> 
            Repeat.
        </h1>
        <p>
          providing the social love you need during this pandemic.<br/>
          What are you waiting for? Login, explore and share<br/>
          your moments beyond the 4 walls...
        </p>
        <div className = "landing_btn_container">
          <button className = "landing_btn"><a href = "Register">Get Started!</a></button>
          {/* About Us Section */}
          <button className = "landing_btn">About Us <AiOutlineArrowDown className = "about_us_open" alt = "More Info"/></button>
        </div>
        <div className = "about_container">
            <h3>LAN's Mission</h3>
            <p>
            We know that COVID-19 has had a massive impact on everyones lives. Isolation and restrictions all the time are just the beginning.
            Through this platform, we wish to give you, the devoted team at Loop Agile, a chance to enjoy that social aspect from the comfort of your home.
            Embark on this amazing journey and get started now! Register your account, personalise your profile, start posting and chat to your friends! 
            Create your network now all from home...
            </p>
          </div>
      </div>
      <div className = "landing_page_right_content">
        <div className = "landing_image_contanier">
          <img className = "landing_image" src={image} alt = "Landing Page"/> 
        </div>
      </div>
    </div>
  );
}

export default Home;
