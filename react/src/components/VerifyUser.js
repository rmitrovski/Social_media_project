const USERS_KEY = "accounts";
const USER_KEY = "account";


// Initialise local storage "users" with data, if the data is already set this function returns immediately.

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(email, password) {
  const users = getUsers();
  for(const user of users) {
    if(email === user.email && password === user.password)
    {
      const account = new Array([user.fname, user.lname, user.email, user.password, user.date]);
      setUser(account);
      return true;
    }
  }

  return false;
}

function setUser(user) {
  localStorage.setItem(USER_KEY, user);
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,
  getUser,
  removeUser
}