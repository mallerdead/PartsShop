const signInForm = document.querySelector(".sign-in-form");
const signUpForm = document.querySelector(".sign-up-form");
const content = document.querySelector(".content");
const userBtn = document.querySelector(".my-account");

function SignUp(event) {
  event.preventDefault();
  const signUpInputs = signUpForm.querySelectorAll("input");
  let user = {
    name: `${signUpInputs[0].value}`,
    surname: `${signUpInputs[1].value}`,
    email: `${signUpInputs[2].value}`,
    phone: `${signUpInputs[3].value}`,
    password: `${signUpInputs[4].value}`,
  };

  fetch("https://localhost:7164/users/user-registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      document.cookie = `token=${data.token}`;
      verifyToken().then((id) => getUser(id));
    })
    .catch((error) => console.error(error.message));
}

function SignIn(event) {
  event.preventDefault();
  const signInInputs = signInForm.querySelectorAll("input");
  let user = {
    email: `${signInInputs[0].value}`,
    password: `${signInInputs[1].value}`,
  };
  ``;

  fetch("https://localhost:7164/users/user-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.text();
      } else {
        Promise.reject();
      }
    })
    .then((data) => {
      document.cookie = `token=${data};`;
      verifyToken().then((id) => getUser(id));
    })
    .catch((error) => console.error(error));
}

signInForm.addEventListener("submit", SignIn);
signUpForm.addEventListener("submit", SignUp);
