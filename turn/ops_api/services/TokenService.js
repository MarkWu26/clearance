const getLocalRFToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
};

const getLocalAccToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
}

const updateNewAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken(token);
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
    localStorage.removeItem("user");
}

module.exports = {
    getLocalRFToken,
    getLocalAccToken,
    updateNewAccessToken,
    getUser,
    setUser,
    removeUser,
};