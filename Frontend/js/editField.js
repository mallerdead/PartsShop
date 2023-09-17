let fieldsValues = { name: null, surname: null, email: null, phone: null };

function addExitButtonListener() {
  const exitBtn = document.querySelector(".exit-btn");
  exitBtn.addEventListener("click", userLogout);
}

function addEditButtonsListeners() {
  const editBtns = document.querySelectorAll(".edit-btn");

  function changeField(field) {
    field.disabled = !field.disabled;

    if (field.disabled) {
      if (field.value === "" && field.required) {
        field.value = fieldsValues[field.classList.toString()];
      } else if (
        (field.value === "" && !field.required) ||
        field.value != fieldsValues[field.classList.toString()]
      ) {
        let user = {
          name: document.querySelector(".name").value,
          surname: document.querySelector(".surname").value,
        };

        renderUser(user);
        fieldsValues[field.classList.toString()] =
          field.value === "" ? null : field.value;
        sendRequest({ [field.classList.toString()]: field.value });
      }
    } else {
      fieldsValues[field.classList.toString()] = field.value;
      field.focus();
    }
  }

  editBtns.forEach((editBtn) => {
    const field = editBtn.parentElement.children[1];
    editBtn.addEventListener("click", () => changeField(field));
    field.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        changeField(field);
      }
    });
  });
}

function sendRequest(fieldData) {
  verifyToken()
    .then((id) => (fieldData["id"] = id))
    .then(() => {
      fetch(`https://localhost:7164/users/change-user-data`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
      });
    })
    .catch(console.error);
}

function userLogout() {
  verifyToken()
    .then(() => )
    .catch((error) => console.error(error));
}
