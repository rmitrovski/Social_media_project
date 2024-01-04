import { render, screen, fireEvent } from "@testing-library/react";
import Post from "./Post";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Imports Router from React-Router-Dom

// Global data for tests.
let container;

// DISTINCTION UNIT TESTING - Check the reaction counter has been render and then selected by a user on the Post Page -
test("Check the like reaction has render in with a value of 0 AND counter has been selected/enacted by a user on the Post Page", () => {
  // Render in the router/browser router and the post components -
  const utils = render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Post 
        user = {{ email: '', firstName: '', lastname: '', }} // Equal to props to ensure TypeError is avoided -> no null properties
        />}/>
      </Routes>
  </BrowserRouter>
  );
  container = utils.container;

  // Define submit input -> OnClick Function for the Like Counter -
  const postCounterFn = screen.getByTestId("Post Counter Like");

  // Simulate click - Activate the Like Button Component - 
  const userLikeReaction = fireEvent.click(postCounterFn);

  // Assert expected results - Like counter selected and then fired -
  expect(userLikeReaction).toBe(true);

  // Assert expected results - Like Counter expected to render in with a value of 0 before calling to database  -
  expect(screen.getByText("Likes: 0"));
});