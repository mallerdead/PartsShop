let fieldsValues = { name: "", surname: "", email: "", phone: "" };

function addEditButtonsListeners() {
  const editBtns = document.querySelectorAll(".edit-btn");

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      const field = editBtn.parentElement.children[1];
      field.disabled = !field.disabled;

      field.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      });

      if (field.disabled) {
        if (field.value != fieldsValues[field.classList.toString()]) {
          fieldsValues[field.classList.toString()] = field.value;
          sendRequest({ [field.classList.toString()]: field.value });
        }
      } else {
        fieldsValues[field.classList.toString()] = field.value;
        field.focus();
      }
    });
  });
}

function sendRequest(fieldData) {
  verifyToken()
    .then((id) => (fieldData["id"] = id))
    .then((result) => {
      fetch(`https://localhost:7164/users/change-user-data`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
      }).then(console.log);
    })
    .catch(console.error);
}
