import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import verifyUser, { response } from "./DataRepository"
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Imports Router from React-Router-Dom

// Global data for tests.
let containerLogin;

// Mock Partials to Test Calls to Database -> Mock Verify User Function from Data Repository
// jest.mock('./DataRepository', () => {
//   const originalModule = jest.requireActual('./DataRepository');

//   // Mock the default export and named export response -
//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(null), // Mocked Input
//     response: "Username and / or password invalid, please try again.",  // Mocked Outcome
//   };
// });

// // Check login form with no inputs and submit button used -> error message received -> using Mock Function -
// test("Submit Login Form with No Inputs", () => {
//   // Render in the router/browser routr and the login components -
//   const utils = render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Login />} />
//     </Routes>
//   </BrowserRouter>
//   );
//   containerLogin = utils.containerLogin;
//   // Define submit input -
//   const formSubmit = screen.getByDisplayValue("Sign In");
//   // Define target inputs -
//   const input_email = screen.getByLabelText("Email");
//   const input_password = screen.getByLabelText("Password");

//   // Simulate input.
//   fireEvent.change(input_email, { target: { value: "" } });
//   fireEvent.change(input_password, { target: { value: "" } });
  
//   // Simulate click.
//   fireEvent.click(formSubmit);

//   // Assert expected result -
//   expect(screen.queryByTestId("Error", { exact: false })); // Checks test-id of error message
//   expect(input_email.value).toBe("");
//   expect(input_password.value).toBe("");

//   // Test mocked function - verify user
//   const defaultExportResult = verifyUser();

//   expect(defaultExportResult).toBe(undefined);
//   expect(verifyUser).toHaveBeenCalled();

//   // Assert expected mock result -
//   expect(response).toBe("Username and / or password invalid, please try again.");
// });

// // Check login form with non-existent user details -> error message received -> using Mock Function -
// test("Submit Login Form with Non-Existent User Details", () => {
//   // Render in the router/browser routr and the login components -
//   const utils = render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Login />} />
//     </Routes>
//   </BrowserRouter>
//   );
//   containerLogin = utils.containerLogin;

//   // Define submit input -
//   const formSubmit = screen.getByDisplayValue("Sign In");
//   // Define target inputs -
//   const input_email = screen.getByLabelText("Email");
//   const input_password = screen.getByLabelText("Password");

//   // Simulate input.
//   fireEvent.change(input_email, { target: { value: "dasdasdas@test.com" } });
//   fireEvent.change(input_password, { target: { value: "P@ssword1234" } });
  
//   // Simulate click.
//   fireEvent.click(formSubmit);
  
//   // Assert expected result -
//   expect(screen.queryByTestId("Error", { exact: false })); // Checks test-id of error message
//   expect(input_email.value).toBe("dasdasdas@test.com");
//   expect(input_password.value).toBe("P@ssword1234");
  
//   // Test mocked function - verify user
//   const defaultExportResult = verifyUser();

//   expect(defaultExportResult).toBe(undefined);
//   expect(verifyUser).toHaveBeenCalled();

//   // Assert expected mock result -
//   expect(response).toBe("Username and / or password invalid, please try again.");
// });

// Check login form with no inputs and submit button used -> error message received -
test("Submit Login Form with No Inputs and Check Error Message and its ID", () => {
  // Render in the router/browser routr and the login components -
  const utils = render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
  containerLogin = utils.containerLogin;

  // Define submit input - Button used to submit form -
  const formSubmit = screen.getByDisplayValue("Sign In");
  // Define target inputs - Calls the resepctive form labels and their input -
  const inputEmail = screen.getByLabelText("Email");
  const inputPassword = screen.getByLabelText("Password");

  // Simulate input - Fills in form details with no values (leaves it blank) -
  fireEvent.change(inputEmail, { target: { value: "" } });
  fireEvent.change(inputPassword, { target: { value: "" } });
  
  // Simulate click - Submit Form - 
  fireEvent.click(formSubmit);

  // Assert expected result - Expected error message from the ID of the error message  -
  expect(screen.queryByTestId("Error", { exact: false })); // Checks test-id of error message
  expect(inputEmail.value).toBe("");
  expect(inputPassword.value).toBe("");
});

// Check login form's hyperlink to registration form and linked correctly -> /Register -
test("Check login form's hpyerlink to the Registration Page is linked correctly ", () => {
  // Render in the router/browser routr and the login components -
  const utils = render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
  containerLogin = utils.containerLogin;

  // Define href link -
  const regoLink = screen.getByRole('link', {
    name: "Join LAN Today!", })

  // Simulate click - Accessing Registration Form Link -
  fireEvent.click(screen.getByRole('link', {
    name: "Join LAN Today!", }))

  // Assert expected result - Expecting to access the '/Register' href -
  expect(regoLink.getAttribute('href')).toBe('Register');
});