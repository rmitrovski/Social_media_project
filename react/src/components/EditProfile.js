import '../App.css'; // Imports the css file for the component
import { useState, useEffect, useContext} from "react"; // Imports the useState and useEffect hooks from React
import { useNavigate} from "react-router-dom"; // Imports the useNavigate hook from React-Router-Dom
import { getProfile, updateProfile } from "../components/DataRepository";
import MessageContext from "../components/MessageContext";

function EditProfile(props) { // EditProfile function that has the user information
  const navigate = useNavigate(); // Allows the navigate hook from React-Router-Dom
  const [profile, setProfile] = useState("");
  const [fields, setFields] = useState("");
  const [errors, setErrors] = useState({ });
  const { setMessage } = useContext(MessageContext) || {};
  const email = props.user.email;
  
  useEffect(() => {
    async function loadProfile() {
      const currentProfile = await getProfile(email);
      setProfile(currentProfile);
      setFieldsNullToEmpty(currentProfile);
    }
    loadProfile();
  }, [email]);

  const setFieldsNullToEmpty = (currentFields) => {
    // Make a copy of currentFields so the original parameter is not modified.
    currentFields = { ...currentFields };

    for(const [key, value] of Object.entries(currentFields)) {
      currentFields[key] = value !== null ? value : "";
    }

    setFields(currentFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = handleValidation();
    if(!isValid)
      return;

    // Update profile.
    const profile = await updateProfile(trimmedFields);
    localStorage.setItem('user', JSON.stringify(profile)); //Set the array to local storage
    // Show success message.
    setMessage(<><strong>{profile.first_name} {profile.last_name}</strong> profile has been updated successfully.</>);

    // Navigate to the profiles page.
    navigate("/Profile");

  };
      
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  // Validation for Editing Profile Details -
  const handleValidation = () => {
    const trimmedFields = trimFieldsEmptyToNull();
    const currentErrors = { };
    const regexPassword = /^\S*(?=\S{12,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/ // Regex for password
    trimmedFields["first_name"] = fields.fname
    trimmedFields["last_name"] = fields.lname
    trimmedFields["password_hash"] = fields.password

    let key = "first_name";
    let field = trimmedFields[key];
    
    key = "first_name";
    field = trimmedFields[key];
    if (typeof(field) != "undefined") {
    if(field.length === 0 || field == null)
      currentErrors["fname"] = "First name is required.";
    else if(field.length > 40)
      currentErrors["fname"] = "First name length cannot be greater than 40.";
    } else {
      currentErrors["fname"] = "First name is required.";
    }

    key = "last_name";
    field = trimmedFields[key];
    if (typeof(field) != "undefined") {
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";
    } else {
      currentErrors[key] = "Last name is required.";
    }

    key = "password_hash";
    field = trimmedFields[key]; 
    if (typeof(field) != "undefined") {
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(!field.match(regexPassword))
      currentErrors[key] = "Password must be at least 12 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    } else {
      currentErrors[key] = "Password is required.";
    }

    key = "confirmPassword";
    field = trimmedFields[key];
    if (typeof(field) != "undefined") {
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(fields.confirmPassword !== trimmedFields.password)
      currentErrors[key] = "Passwords do not match.";
    } else {
      currentErrors[key] = "Password is required.";
    }
    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
 
  };

  const trimFieldsEmptyToNull = () => {
    const trimmedFields = { };

    for(const [key, value] of Object.entries(fields)) {
      let field = value;

      // If value is not null trim the field.
      if(field !== null) {
        field = field.trim();

        // If the trimmed field is empty make it null.
        if(field.length === 0)
          field = null;
      }

      trimmedFields[key] = field;
    }

    setFieldsNullToEmpty(trimmedFields);

    return trimmedFields;
  };

  if(profile === null && fields === null)
  return null;

  return (
    // Registration Form
    <div className = "login_form">
      <h3 className = "titles_h3">Edit Profile</h3>
      <hr/>
      <h4 className = "titles_h4">Fast, simple, now.</h4>
      <form name = "myForm" onSubmit={handleSubmit}> {/* Form that submits the information to the handleSubmit function */}
        <div className = "login_form_info">
          <label id = "first-name" className="label">First Name</label>
          <input aria-labelledby = "first-name" name="fname" type="text" value={fields.fname} placeholder={props.user.first_name} onChange={handleInputChange} id="fname"/>
        </div>
        { <div class = "error" id = "fnameError">{errors.fname}</div> /* Displays error */ }
        <br/>

        <div className = "login_form_info">
          <label  htmlFor="Surname" className="label">Surname</label>
          <input name="lname" type="text" value= {fields.lname} placeholder={props.user.last_name} onChange={handleInputChange} id="Surname"/>
        </div>
        {<div class = "error" id = "fnameError">{errors.last_name}</div> /* Displays error */}
        <br/>

        <div className = "login_form_info">
          <label htmlFor="Current/New Password" className = "label">Current/New Password</label>
          <input name="password" type="password" onChange={handleInputChange} id="Current/New Password"/>
        </div>
        {<div class = "error" id = "passwordError">{errors.password_hash}</div> /* Displays error */}
        <br/>

        <div className = "login_form_info">
        <label htmlFor="Confirm Password" className="label">Confirm Password</label>
        <input name="confirmPassword" type="password" value= {fields.confirmPassword} onChange={handleInputChange} id="Confirm Password"/>
      </div>
      { <div className = "error" id = "fnameError"> {errors.confirmPassword} </div>}
      <br></br>
        
        <div className = "login_btn">
          <div className = "inner_login_form"></div>
          <input type = "submit" name = "login" value = "Update Now" className = "btn btn-primary" id = "Update Now"></input>
        </div> {/* Updates the information once clicked*/}

      </form> 
    </div> 
  );
}

export default EditProfile;