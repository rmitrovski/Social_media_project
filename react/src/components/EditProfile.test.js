import { render, screen, fireEvent } from "@testing-library/react";
import EditProfile from "./EditProfile";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Imports Router from React-Router-Dom
import MessageContext from "./MessageContext";

// Global data for tests.
let container;

// Check Submission of Edit Profile Form with minimum and maximum characters for the 'First Name' Field -
test("Check the minimum (not null) and maximum number of characters (40) for the 'First Name' Field ", () => {
  // Render in the router/browser routr and the edit profile components -
  const utils = render(
    <MessageContext.Provider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EditProfile 
                user = {{ email: '', firstName: '', lastname: ''}} // Equal to props to ensure TypeError is avoided -> no null properties
                />}/>
            </Routes>
        </BrowserRouter>
    </MessageContext.Provider>
  );
  container = utils.container;

  // Define submit input - Button used to submit form -
  const formSubmit = screen.getByDisplayValue("Update Now");
  // Define target inputs - Calls the resepctive form label and their input 
  const inputFnameMin = screen.getByLabelText("First Name");
  const inputFnameMax = screen.getByLabelText("First Name");

  // Simulate input - Fills in form details with minimium number of characters (0 or leaves it blank) -
  fireEvent.change(inputFnameMin, { target: { value: "" } });

  // Simulate click - Submit Form - 
  fireEvent.click(formSubmit);

  // Assert expected results - Expected error message when 'First Name' field has no input -
  expect(screen.getByText("First name is required.", { exact: false }));

  // Simulate input - Fills in form details with maximum number of characters (40 characters) -
  fireEvent.change(inputFnameMax, { target: { value: "Helloooooooooooooooooooooooooooooooooooo1" } });

  // Simulate click - Submit Form -
  fireEvent.click(formSubmit);

  // Assert expected results - Expected error message when 'First Name' field has too many characters inputted -
  expect(screen.getByText("First name length cannot be greater than 40.", { exact: false }));
});

function EditProfileTest() {}
export default EditProfileTest;