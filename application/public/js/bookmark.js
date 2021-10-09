
async function createBookmark(id) {
    let check = await checkUserLogin();
    if (check == false) {        
        alert("you need to login to create bookmarks")
    }
        

    else {
        const url = '/api/bookmark/create/' + id;
        const response = await fetch(url);
        const profileData = await response.json();
        if (profileData.success === true) {
            document.getElementById('bookmark_' + id).classList.remove('btn-outline-danger');
            document.getElementById('bookmark_' + id).classList.add('btn-danger');
            document.getElementById('bookmark_' + id).removeAttribute("onClick");
            document.getElementById('bookmark_' + id).setAttribute( "onClick", "javascript: deleteBookmark("+id+");" );
            alert("bookmark added!");
        } else {
            alert("error");
        }
    }
}

async function deleteBookmark(id) {
    let check = await checkUserLogin();
    if (check == false)
    alert("you need to login to delete bookmarks")
    else {
        const url = '/api/bookmark/delete/' + id;
        const response = await fetch(url);
        const profileData = await response.json();
        if (profileData.success === true) {
            document.getElementById('bookmark_' + id).classList.remove('btn-danger');
            document.getElementById('bookmark_' + id).classList.add('btn-outline-danger');
            document.getElementById('bookmark_' + id).removeAttribute("onClick");
            document.getElementById('bookmark_' + id).setAttribute( "onClick", "javascript: createBookmark("+id+");" );
            alert("bookmark deleted!");
        } else {
            alert("error");
        }
    }
}