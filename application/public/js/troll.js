
// used in profile page
async function getName(userid, target) {
    const profile_data_url = '/api/user/' + userid;
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        document.getElementById(target).textContent = profileData.name
    } else {
        document.getElementById(target).textContent = "error"
    }
}

async function getEmail(userid, target) {
    const profile_data_url = '/api/user/' + userid;
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        document.getElementById(target).textContent = profileData.email
    } else {
        document.getElementById(target).textContent = "error"
    }
}

