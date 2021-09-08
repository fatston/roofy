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

