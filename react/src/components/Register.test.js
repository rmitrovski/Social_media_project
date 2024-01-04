import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Imports Router from React-Router-Dom

// Global data for tests.
let container;

// Check registration form when submit button used and filled in correctly -
test("Submit Registration Form with Correct Inputs and Check Input Fields", () => {
  // Render in the router/browser routr and the register components -
  const utils = render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
  container = utils.container;

  // Define submit input -> Button used to submit form -
  const formSubmit = screen.getByDisplayValue("Sign Up");
  // Define target inputs -> Calls the resepctive form labels and their input -
  const inputFname = screen.getByLabelText("First Name");
  const inputLname = screen.getByLabelText("Surname");
  const inputEmail = screen.getByLabelText("Email");
  const inputPassword = screen.getByLabelText("Password");
  const inputPasswordConfirmed = screen.getByLabelText("Confirm Password");

  // Simulate input - Fills in form details correctly -
  fireEvent.change(inputFname, { target: { value: "Vic" } });
  fireEvent.change(inputLname, { target: { value: "Hea" } });
  fireEvent.change(inputEmail, { target: { value: "vp1@rmit.com" } });
  fireEvent.change(inputPassword, { target: { value: "P@ssword1234" } });
  fireEvent.change(inputPasswordConfirmed, { target: { value: "P@ssword1234" } });

  // Simulate click - Submit Form - 
  fireEvent.click(formSubmit);

  // Assert expected results - Expected values in their fields -
  expect(inputFname.value).toBe("Vic");
  expect(inputLname.value).toBe("Hea");
  expect(inputEmail.value).toBe("vp1@rmit.com");
  expect(inputPassword.value).toBe("P@ssword1234");
  expect(inputPasswordConfirmed.value).toBe("P@ssword1234");
});

// Check registration form with invalid input for Email Field and received error message -
test("Submit Registration Form with Invalid Input for Email Field and Check Respective Error Message", () => {
  // Render in the router/browser routr and the register components -
  const utils = render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
  container = utils.container;

  // Define submit input - Button used to submit form -
  const formSubmit = screen.getByDisplayValue("Sign Up");
  // Define target inputs - Calls the resepctive form label and their input -
  const inputEmail = screen.getByLabelText("Email");

  // Simulate input - Fills in email field incorrectly -
  fireEvent.change(inputEmail, { target: { value: "a" } });
    
  // Simulate click - Submit Form - 
  fireEvent.click(formSubmit);

  // Assert expected result - Expected error message if email input is not in correct format -
  expect(screen.getByText("Email is invalid", { exact: false }));
});

function RegisterTest() {}
export default RegisterTest;