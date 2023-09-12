function verifyToken() {
  let tokenString = document.cookie
    .split(";")
    .filter((cookie) => cookie.split("=")[0] === "token")[0];
  if (tokenString !== undefined) {
    return fetch("https://localhost:7164/users/verify-token", {
      method: "GET",
      headers: { Authorization: tokenString.split("=")[1] },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
}
