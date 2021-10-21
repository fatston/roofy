// used in profile page

//get profile picture is used in listing_details.ejs for posting a comment
async function getProfilePicture(target) {
    const profile_data_url = '/api/user/';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        let image = profileData.display_picture
        if(image === null){
            image = "/images/LinkZelda.png";
        } else {
            image = "/images/" + image
        }
        document.getElementById(target).src = image
    } else {
        document.getElementById(target).src = "/images/LinkZelda.png";
    }
}

async function getUserDetail() {
    const profile_data_url = '/api/user/';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        let image = profileData.display_picture
        if(image === null){
            image = "/images/LinkZelda.png";
        } else {
            image = "/images/" + image
        }
        return {'profile_picture' : image, 'name' : profileData.name}
    } else {
        return {'profile_picture': "/images/LinkZelda.png", 'name': "" }
    }
}

async function getSellerDetail() {
    const profile_data_url = '/api/seller';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        let image = profileData.display_picture
        if(image === null){
            image = "/images/LinkZelda.png";
        } else {
            image = "/images/" + image
        }
        return {'profile_picture' : image, 'name' : profileData.name, 'sellerid' : profileData.sellerid}
    } else {
        return {'profile_picture': "/images/LinkZelda.png", 'name': "", 'sellerid' : "" }
    }
}

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

