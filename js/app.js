const CONSTANTS = {
    APP_URL: 'http://127.0.0.2:5500/',
    API_URL: 'http://localhost:5000/api/',
    LOCAL_STORAGE_KEY: 'NODE_JWT_APP'
};

function isAuthorized() {
    const user = JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY));
    if (!user) {
        location.href = `${CONSTANTS.APP_URL}login.html`;
    } else {
        $('#lblUserName').text(user.user.name);
        $.ajax({
            url: `${CONSTANTS.API_URL}accounts/authorized`,
            type: 'POST',
            contentType: 'application/json',
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
            success: () => {
                $('body').removeClass('d-none');
            },
            error: (error) => {
                if (error.status === 401) {
                    location.href = `${CONSTANTS.APP_URL}login.html`;
                } else {
                    alert('Something went wrong')
                }
            }
        })
    }
}

function logout() {
    localStorage.clear();
    location.href = `${CONSTANTS.APP_URL}login.html`;
}

function getToken() {
    const user = JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY));
    return user ? user.token : '';
}