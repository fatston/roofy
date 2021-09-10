async function getSellerData() {
    const profile_data_url = '/api/seller/';
    const response = await fetch(profile_data_url);
    const profileData = await response.json();
    if (profileData.success === true) {
        document.getElementById('username').value = profileData.username
        document.getElementById('password').value = profileData.password
        document.getElementById('name').value = profileData.name
        document.getElementById('company').value = profileData.company
        document.getElementById('email').value = profileData.email
        document.getElementById('contact').value = profileData.contact
    } else {
        document.getElementById(target).textContent = "error"
    }
}