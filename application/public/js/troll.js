// used in profile page

async function getName(target) {
    const profile_data_url = '/api/user/';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        document.getElementById(target).textContent = profileData.name
    } else {
        document.getElementById(target).textContent = "error"
    }
}

async function getInputName(target) {
    const profile_data_url = '/api/user/';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        document.getElementById(target).value = profileData.name
    } else {
        document.getElementById(target).value = "error"
    }
}

async function getEmail(target) {
    const profile_data_url = '/api/user/';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        document.getElementById(target).textContent = profileData.email
    } else {
        document.getElementById(target).textContent = "error"
    }
}

async function getInputEmail(target) {
    const profile_data_url = '/api/user/';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        document.getElementById(target).value = profileData.email
    } else {
        document.getElementById(target).value = "error"
    }
}

async function getInputPassword(target) {
    const profile_data_url = '/api/user/';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        document.getElementById(target).value = profileData.password
    } else {
        document.getElementById(target).value = "error"
    }
}

async function getSellerName(target) {
    const profile_data_url = '/api/seller/';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        document.getElementById(target).textContent = profileData.name
    } else {
        document.getElementById(target).textContent = "error"
    }
}

