const userAccount = document.querySelector(".my-account");

function verifyToken() {
  let tokenString = document.cookie
    .split(";")
    .filter((cookie) => cookie.split("=")[0] === "token")[0];
  if (tokenString !== undefined) {
    fetch("https://localhost:7164/users/verify-token", {
      method: "GET",
      headers: { Authorization: tokenString.split("=")[1] },
    })
      .then((response) => response.json())
      .then((data) => {
        if (window.location.href.includes("userPage.html")) {
          renderUserPage(data);
        }
        renderUser(data);
      })
      .error((error) => console.error(error));
  } else {
    userAccount.innerHTML = "Login";
  }
}

function renderUser(user) {
  userAccount.innerHTML = `
    <div class="user-avatar">
      <img class="nav-icon" src="../assets/UserAvatar.svg" alt="">
    </div>
    <div class="user-name">${user.name} ${
    user.surname != null ? user.surname : ""
  }</div>`;
}

function renderUserPage(user) {
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
}

verifyToken();
