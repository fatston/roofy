async function checkUserLogin() {
    const url = '/api/user/checkLogin';
    const response = await fetch(url);
    const profileData = await response.json();
    return profileData.success;
}