import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUser, createUser, verifyUser } from "../components/DataRepository";
import React from 'react';

function Register(props) {

  const navigate = useNavigate(); // Allows the navigate hook from React-Router-Dom

  const [fields, setFields] = useState({
    fname: "", lname: "", email: "", password: "", confirmPassword: ""
  });
  const [errors, setErrors] = useState({ });

   // Generic change handler.
   const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const current = new Date();
    // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`; // Gets the current date

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = await handleValidation();
    if(!isValid)
      return;
 
    // Create user.
    const user = await createUser(trimmedFields);
    const account = await verifyUser(trimmedFields["email"], trimmedFields["password"]);

    // Set user state.
    props.loginUser(account);

    // Navigate to the home page.
    navigate("/Profile");
  };

  // Form validation for registering -
  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = { };
    const regexEmail = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}'; // Regex for email
    const regexPassword = /^\S*(?=\S{12,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/ // Regex for password

    let key = "email";
    let field = trimmedFields[key];

    key = "fname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "lname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    key = "email";
    field = trimmedFields[key];
    if (field.length === 0)
      currentErrors[key] = "Email is required.";
    else if (!field.match(regexEmail))
      currentErrors[key] = "Email is invalid";
    else if(await findUser(trimmedFields.email) !== null)
      currentErrors[key] = "Email is already registered.";
    
    key = "password";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if (!field.match(regexPassword))
      currentErrors[key] = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and must be at least 12 characters long";
    
    key = "confirmPassword";
    field = trimmedFields[key];
    if(field !== trimmedFields.password)
      currentErrors[key] = "Passwords do not match.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = { };
    Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
    setFields(trimmedFields);

    return trimmedFields;
  };
  
  return (
    // Registration Form
    <div className = "login_form">
      <h3 className = "titles_h3">Sign Up</h3>
      <hr/>
      <h4 className = "titles_h4">Fast, simple, now.</h4>
      <form onSubmit={handleSubmit} name = "myForm">
        <div className = "login_form_info">
          <label htmlFor="First Name" className="label">First Name</label>
          <input name="fname" type="text" value={fields.fname} onChange={handleInputChange} id="First Name"/> 
        </div>
        {/* Error Message */}
        { <div className = "error" id = "fnameError">
            {errors.fname && 
              <div className = "error">{errors.fname}</div>
            }
        </div> }
        <br/>

        <div className = "login_form_info">
          <label htmlFor="Surname" className="label">Surname</label>
          <input name="lname" type="text" value= {fields.lname} onChange={handleInputChange} id="Surname"/>
        </div>
        {/* Error Message */}
        { <div className = "error" id = "fnameError">
          {errors.lname && 
            <div className = "error">{errors.lname}</div>
          }
        </div> }
        <br/>

        <div className = "login_form_info">
          <label htmlFor="email" className = "label">Email</label>
          <input name="email" type="text" value= {fields.email} onChange={handleInputChange} id="email"/>
        </div>
        {/* Error Message */}
        { <div className = "error" id = "fnameError">
          {errors.email && 
            <div className = "error">{errors.email}</div>
          }
        </div> }
        <br/>

        <div className = "login_form_info">
          <label htmlFor="Password" className="label">Password</label>
          <input name="password" type="password" value= {fields.password} onChange={handleInputChange} id="Password"/>
        </div>
        {/* Error Message */}
        { <div className = "error" id = "fnameError">
          {errors.password && 
            <div className = "error">{errors.password}</div>
          }
        </div> }
        <br/>

        <div className = "login_form_info">
          <label htmlFor="Confirm Password" className="label">Confirm Password</label>
          <input name="confirmPassword" type="password" value= {fields.confirmPassword} onChange={handleInputChange} id="Confirm Password"/>
        </div>
        {/* Error Message */}
        { <div className = "error" id = "fnameError">
          {errors.confirmPassword && 
            <div className = "error">{errors.confirmPassword}</div>
          }
        </div> }
        <br/>

        <div className = "login_btn">
          <div className = "inner_login_form"></div>
          <input type = "submit" name = "login" value = "Sign Up" className = "btn btn-primary" id = "Sign Up"></input>
        </div>
      </form>
    </div>

    
  );
}

export default Register;