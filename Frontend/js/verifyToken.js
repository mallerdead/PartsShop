function verifyToken() {
  let tokenString = document.cookie
    .split(";")
    .filter((cookie) => cookie.split("=")[0] === "token")[0]
    .split("=")[1];
  if (tokenString !== undefined && tokenString !== "") {
    return fetch("https://localhost:7164/users/verify-token", {
      method: "GET",
      headers: { Authorization: tokenString },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject();
      }
    });
  } else {
    return Promise.reject();
  }
}
