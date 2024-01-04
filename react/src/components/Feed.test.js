import { render, screen, fireEvent } from "@testing-library/react";
import Feed from "./Feed";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Imports Router from React-Router-Dom

// Global data for tests.
let container;

// Check 'Embed URL' in the ReactQuill toolbar for when a URL is inputted -
test("Check the 'Embed URL' tool/function in the toolbar of ReactQuill of when a URL is inputted", () => {
  // Render in the router/browser routr and the feed components -
  const utils = render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed 
        user = {{ email: '', firstName: '', lastname: ''}} // Equal to props to ensure TypeError is avoided -> no null properties
        />}/>
      </Routes>
  </BrowserRouter>
  );
  container = utils.container;
  // Define react quill toolbar - Define textbox for the Embed URL tool -
  const reactQuillToolBar = screen.getByRole('textbox', {
    name: "", })

  // Simulate input - Input a URL into the tool's textbox -
  fireEvent.change(reactQuillToolBar, { target: { value: "https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-2-1200.jpg" } });
  
});