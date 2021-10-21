async function checkUserLogin() {
    const url = '/api/user/checkLogin';
    const response = await fetch(url);
    const profileData = await response.json();
    return profileData.success;
}

async function checkSellerLogin() {
    const url = '/api/seller/checkLogin';
    const response = await fetch(url);
    const profileData = await response.json();
    return profileData.success;
}