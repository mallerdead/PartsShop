function renderUser(user) {
  const userAccount = document.querySelector(".my-account");
  userAccount.innerHTML = `
      <div class="user-avatar">
        <img class="nav-icon" src="../assets/UserAvatar.svg" alt="">
      </div>
      <div class="user-name">${user.name} ${
    user.surname != null ? user.surname : ""
  }</div>`;
}

function renderUserPage(user) {
  if (document.location.href.includes("userPage.html")) {
    const content = document.querySelector(".content");
    content.innerHTML = `
    <div class="my-account-page">
      <img src="../assets/UserAvatar.svg" alt="" class="avatar-user" />
      <div class="user-info">
        <div class="field user-name">
          <div class="name-field">Name:</div>
          <input class="name" value="${user.name}" disabled>
          <button class="edit-btn"></button>
        </div>
        <div class="field user-surname">
          <div class="name-field">Surname:</div>
          <input class="surname" value="${
            user.surname == null ? "Not indicated" : user.surname
          }" disabled>
          <button class="edit-btn"></button>
        </div>
        <div class="field user-mail">
          <div class="name-field">E-mail:</div>
          <input class="email" value="${user.email}" disabled>
          <button class="edit-btn"></button>
        </div>
        <div class="field user-phone">
          <div class="name-field">Phone:</div>
          <input class="phone" value="${
            user.phone == null ? "Not indicated" : user.phone
          }" disabled>
          <button class="edit-btn"></button>
        </div>
      </div>
    </div>`;
    addEditButtonsListeners();
  }
}

verifyToken()
  .then((result) =>
    fetch(`https://localhost:7164/users/user?id=${result}`)
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        renderUser(data);
        renderUserPage(data);
      })
  )
  .catch((error) => console.error(error));
