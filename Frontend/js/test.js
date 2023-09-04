function getToken() {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === "jwt-token") {
            return cookie[1]
        }
    }
}

console.log(getToken())