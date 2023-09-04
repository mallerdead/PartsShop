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
    .then((response) => response.json())
    .then((data) => (document.cookie = `${data.token}`))
    .catch((error) => {
      console.error(error);
    });
}

function SignIn(event) {
  event.preventDefault();
  const signInInputs = signInForm.querySelectorAll("input");
  let user = {
    email: `${signInInputs[0].value}`,
    password: `${signInInputs[1].value}`,
  };

  fetch("https://localhost:7164/users/user-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      document.cookie = `${data.token}`;
      RenderUser(data);
    })
    .catch((error) => console.error(error));
}

function RenderUser(user) {
  content.innerHTML = `
  <div class="user-page">
    <img src="../assets/UserAvatar.svg" alt="" class="avatar-user" />
    <div class="user-info">
      <div class="name-user">
        <div class="name">Name:</div>
        <div class="name-wrapper">${user.name}</div>
      </div>
      <div class="user-surname">
        <div class="surname">Surname:</div>
        <div class="surname-wrapper">${user.surname}</div>
      </div>
      <div class="user-mail">
        <div class="e-mail">e-mail:</div>
        <div class="e-mail-wrapper">${user.email}</div>
      </div>
      <div class="user-phone">
        <div class="phone">phone:</div>
        <div class="phone-wrapper">${user.phone}</div>
      </div>
    </div>
  </div>`;
  userBtn.innerHTML = `
  <div class="user">
    <div class="user-avatar">
      <img class="nav-icon" src="../assets/UserAvatar.svg" alt="">
    </div>
    <div class="user-name">${user.name} ${
    user.surname != null ? user.surname : ""
  }</div>
  </div>`;
}

signInForm.addEventListener("submit", SignIn);
signUpForm.addEventListener("submit", SignUp);
