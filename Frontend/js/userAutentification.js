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
        <div class="user-header">
       <span> Your account</span>
        <button class="exit-btn"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 15L15 9M21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3C14.387 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12V12ZM15 15L9 9L15 15Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></button></div>
        <div class="field user-name">
          <div class="name-field">Name:</div>
          <input class="name" value="${user.name}" required disabled >
          <button class="edit-btn"></button>
        </div>
        <div class="field user-surname">
          <div class="name-field">Surname:</div>
          <input class="surname" value="${
            user.surname == null ? "" : user.surname
          }" placeholder="Not indicated" disabled>
          <button class="edit-btn"></button>
        </div>
        <div class="field user-mail">
          <div class="name-field">E-mail:</div>
          <input class="email" value="${user.email}" disabled required>
          <button class="edit-btn"></button>
        </div>
        <div class="field user-phone">
          <div class="name-field">Phone:</div>
          <input class="phone" value="${
            user.phone == null ? "" : user.phone
          }" placeholder="Not indicated" disabled>
          <button class="edit-btn"></button>
        </div>
      </div>
    </div>`;

    addExitButtonListener();
    addEditButtonsListeners();
  }
}

function getUser(id) {
  return fetch(`https://localhost:7164/users/user?id=${id}`)
    .then((response) => {
      if (response.status === 200) return response.json();
    })
    .then((data) => {
      renderUser(data);
      renderUserPage(data);
      renderNotifications(data.notifications);
      renderCart(data.cart);
    });
}

function userLogout() {
  verifyToken()
    .then((id) =>
      fetch(`https://localhost:7164/users/delete-token-by-id?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    )
    .then((response) => {
      if (response.status === 200) {
        location.reload();
      }
    })
    .catch((error) => console.error(error));
}

verifyToken()
  .then((id) => {
    getUser(id);
  })
  .catch((error) => console.error(error));
