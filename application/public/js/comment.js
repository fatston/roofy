async function getAllComments(id) {
    const url = '/api/comment/' + id;
    const response = await fetch(url);
    const profileData = await response.json();
    if (profileData.status === true) {
        return profileData.data
    } else {
        return []
    }
}

function commentSubmitFunction(e) {
    var form = new FormData(document.getElementById("comment-form"));
    let listing_id = form.get("listing_id")
    const data = {"comments" : form.get("comments"), "listing_id" : listing_id}
    fetch("/api/comment", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        const allComments = getAllComments(listing_id)
        allComments.then((comments) => {
            document.getElementById('allComments').innerHTML = populateComments(comments)
        })
        e.preventDefault()
    })

    e.preventDefault()
    return false
}

function populateComments(comments) {
    let comment = '<h3>'+comments.length+' Comments</h3>';
    comments.forEach(element => {
        let image = element.display_picture
        if(image === null){
            image = "/images/LinkZelda.png";
        } else {
            image = "/images/" + image
        }
      comment += 
    '<div class="card">'+
    '<div class="card-body" >'+
    '<div class="d-flex flex-start align-items-center">' +
        '<img class="rounded-circle shadow-1-strong me-3"' +
            'src="'+image +'"'+
            'alt="avatar" width="60" height="60"/>' +
        '<div>' +
            '<h6 class="fw-bold text-primary mb-1">'+element.name+'</h6>' +
            '<p class="text-muted small mb-0">'+element.datetime+'</p>' +
        '</div>' +
    '</div>' +
    '<p class="mt-3 mb-4 pb-2">'+element.comments+'</p>' +
    '<div class="small d-flex justify-content-start">' +
      '<a href="#!" class="d-flex align-items-center me-3" onclick = "toggleReplyForm('+element.comment_id+', '+element.listing_id+');">' +
        '<i class="far fa-comment-dots me-2"></i>' +
        '<p class="mb-0" id="reply-text'+element.comment_id+'">Reply</p>' +
      '</a>' + 
    '</div>' +
    '<div id="reply-div'+element.comment_id+'"></div>';

    if(element.replies ){
      element.replies.forEach(reply => {
        let image = reply.display_picture
        if(image === null){
            image = "/images/LinkZelda.png";
        } else {
            image = "/images/" + image
        }
        comment += 
        '<div class="card" tyle="margin-left:50px">'+
        '<div class="card-body" >'+
        '<div class="d-flex flex-start align-items-center"> ' +
        '<img class="rounded-circle shadow-1-strong me-3"' +
          'src="'+image+'"' +
          'alt="avatar" width="60" height="60"/>' +
        '<div>' +
          '<h6 class="fw-bold text-primary mb-1">'+reply.name+'</h6>' +
          '<p class="text-muted small mb-0">'+reply.datetime+'</p>' +
        '</div>' +
      '</div>' +
      '<p class="mt-3 pb-2">'+reply.comments+'</p>' +
      '</div></div>';
      })
    }
    comment += "</div></div>";
    });
    
    return comment;
}

async function toggleReplyForm(reply_id, listing_id) {
    let check = await checkUserLogin();
    if (check == false) {        
        alert("you need to login to reply comment")
        return
    }
    let reply_div = document.getElementById('reply-div'+reply_id)
    let reply_text = document.getElementById('reply-text'+reply_id)
    if(reply_div.innerHTML == "") {
        reply_text.innerHTML = "Hide"
        reply_div.innerHTML = populateReplyForm(reply_id, listing_id)
        getProfilePicture("reply_profile")
    } else {
        reply_text.innerHTML = "Reply"
        reply_div.innerHTML = ""
    }
    
}

function replySubmitFunction(e) {
    var form = new FormData(document.getElementById("reply-form"));
    let listing_id = form.get("listing_id")
    let reply_id = form.get("reply_id")
    console.log(listing_id, reply_id)
    const data = {"comments" : form.get("comments"), "listing_id" : listing_id, "reply_id": reply_id}
    fetch("/api/comment", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        const allComments = getAllComments(listing_id)
        allComments.then((comments) => {
            document.getElementById('allComments').innerHTML = populateComments(comments)
        })
        e.preventDefault()
    })

    e.preventDefault()
    return false
}

function populateReplyForm(reply_id, listing_id) {
    let form = 
    '<div class="col-md-12 col-lg-12 col-xl-12">'+
        '<div class="card">'+
        '<div class="card-body">'+
            '<div class="card-footer py-3 border-0" style="background-color: #f8f9fa;">'+
            '<form action="/api/comment" method="POST" id="reply-form" onsubmit="return replySubmitFunction(event)">'+
                '<div class="d-flex flex-start w-100">'+
                    '<img class="rounded-circle shadow-1-strong me-3" id="reply_profile"'+
                    'src="/images/LinkZelda.png"'+
                    'alt="avatar" width="40" height="40"/>'+
                    
                    '<div class="form-outline w-100">'+
                        '<textarea class="form-control" id="comments" rows="4"'+
                        'style="background: #fff;"'+
                        'name="comments"></textarea>'+
                        '<label class="form-label" for="textAreaExample">Message</label>'+
                    '</div>'+
                '</div>'+ 
                '<input type="hidden" name="listing_id" id="listing_id" value="'+listing_id+'"/>'+
                '<input type="hidden" name="reply_id" id="reply_id" value="'+reply_id+'"/>'+
                '<div class="float-end mt-2 pt-1">'+
                    '<button type="submit" class="btn btn-primary btn-sm">Reply Comment</button>'+
                '</div>'+ 
            '</form>'+
              
            '</div>'+
        '</div>'+
        '</div>'+
    '</div>'
    return form
  }