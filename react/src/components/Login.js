import React, { useState } from "react"; // Imports useState and useEffect hooks from react
import { useNavigate } from "react-router-dom"; // Imports react-router-dom to use the useNavigate hook
import { verifyUser } from "../components/DataRepository";

function Login(props) {
  const navigate = useNavigate(); // Uses the navigate hook from react-router-dom
  const originalValue = {email: "", password: ""} // Sets the original values for the form
  const [formValues, setFormValues] = useState(originalValue);
  const [formErrors, setFormErrors] = useState(null);

  const handleChange = (event) => { // Handles change when the user inputs information into the form
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await verifyUser(formValues.email, formValues.password);

    if(user === null) {
      const {isValid} = await handleValidation();
      if(!isValid)
      return;
    }

    // Set user state.
    props.loginUser(user);

    // Navigate to the home page.
    navigate("/");
  };

  const handleValidation = async () => {
    // Login failed, reset password field to blank and set error message.
    setFormValues({ ...formValues, password: "" });
    setFormErrors("Username and / or password invalid, please try again.");
    return {isValid: setFormErrors === "Username and / or password invalid, please try again."};
  }

  return (
    // Login Form
    // Registration Form
    <div className = "login_form">
      <h3 className = "titles_h3">Sign In</h3>
      <hr/> {/* Takes the user input and then submits if unsuccessful it shows them an error */}
      <h4 className = "titles_h4">Fast, simple, now.</h4>
      <form name = "myForm" onSubmit={handleSubmit}>
        <div className = "login_form_info">
          <label htmlFor="email" className = "label">Email</label>
          <input name="email" type="text" value= {formValues.email} onChange={handleChange} id="email"/>
        </div>
        <br/>

        <div className = "login_form_info">
          <label htmlFor="Password" className="label">Password</label>
          <input name="password" type="password" value= {formValues.password} onChange={handleChange} id="Password"/>
        </div>
        {/* Error Message */}
        { <div className = "error" id = "fnameError"> 
          {formErrors !== null &&
            <div className = "error" data-testid = "Error">{formErrors}</div>
          }
        </div> }
        <br/>
        <div className = "login_btn">
          <div className = "inner_login_form"></div>
          <input type = "submit" name = "login" value = "Sign In" className = "btn btn-primary" id = "Sign In"></input>
        </div>
        <div className = "signup_link">Not a member? <a href = "Register">Join LAN Today!</a></div>
      </form>
    </div>
  );
}

export default Login;
