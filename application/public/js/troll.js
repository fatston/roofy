function getParam(paramName){
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(paramName);
}
function writeName(name, usersName) {
    document.getElementById(usersName).innerHTML = getParam(name);
}

