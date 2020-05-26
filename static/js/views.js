function apply_template(targetid, templateid, data) {

    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
                        document.getElementById(templateid).textContent
                        )
    target.innerHTML = template(data);
}

function listUsersView(targetid, users){
    apply_template(targetid, "users-list-template", {'users': users})
}

function unitView(targetid, user){
    apply_template(targetid, "user-detail-template", user);
}