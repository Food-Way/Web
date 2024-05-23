
function parseJWT() {
    try {
        let token = atob(sessionStorage.getItem("token"));
        sessionStorage.getItem("token") ? (
            token = JSON.parse(atob(token.split(".")[1]))
        ) : (
            token = null
        )
        return token
    } catch (error) {
        console.log(error);
    }
}

export default parseJWT;