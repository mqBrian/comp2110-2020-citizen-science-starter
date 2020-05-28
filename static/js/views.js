export {listUsersView, userView, listObservationsView};

// This is the template that I use in any views that I am creating 
//  targetid_ id of the element to insert 
//  templateid - id of the element containting the template
//  data - the data that I am going to pass into the template 
function apply_template(targetid, templateid, data) {

    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
                        document.getElementById(templateid).textContent
                        )
    target.innerHTML = template(data);
}

//Function that is used to view a singular person
// and inserts it into the singular user detail template
function userView(targetid, user){
    apply_template(targetid, "user-detail-template", user);
}

//Function that is used to view multiple users 
//  and insterts it into the users list template
function listUsersView(targetid, users){
    apply_template(targetid, "users-list-template", {'users': users});
}

// Function that is used to view multiple Observations
//  and inserts it into the observations list template
function listObservationsView(targetid, obs){
    apply_template(targetid, "users-list-template", {'observations': obs});
}

