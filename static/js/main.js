import * as views from './views.js';
import{Model} from './model.js';
import {split_hash} from './util.js';

let users = Model.get_users();
let obs = Model.get_observations();

function redraw() { 

    let content = "<h2>API Test</h2><ul>";
    content += "<li><a href='/api/observations'>List of Observations</a></li>";
    content += "<li><a href='/api/users'>List of Users</a></li>"; 
    content += "<li><a href='/api/users/1'>Detail of one user</a></li>"; 
    content += "<li><a href='/api/observations/1'>Detail of one observation</a></li>"; 
    content += "</ul>";


    // update the page
    document.getElementById("target").innerHTML = content;

    Model.update_users();
    // Model.update_observations();

    let hash = split_hash(window.location.hash);
    // console.log(hash);
    
    if(window.location.hash === "#!/users"){
        views.listUsersView("target", users);
    } else if(window.location.hash === "#!/observations"){
        console.log('this is the observation view');
    }
};

// Listens to the Model script and checks if the Model Updated is called
window.addEventListener("modelUpdated", function(e) {

    // console.log('modelUpdated triggered');

    // views.listUsersView("users", users);
    // console.log(Model.get_observation());
    bindings();
});


// Fucntion that displays the details of a singular users
function user_click_handler(e){

    let users = Model.get_users();

    let id = this.dataset.id;
    let user = Model.get_user(id);

    // views.trial("user-detail", user);
    views.listUsersView("user-detail", user);
    console.log("showed the unit");
    // console.log(Model.get_user());

}

function add_observation(){
    console.log(this);
    return false;
}

// Binding that decides what to do:
//  when a users name is clicked for every single user
//  when a form is submitted
function bindings(){

    let users = document.getElementsByClassName("user");

    for(let i = 0; i<users.length; i++){
        users[i].onclick = user_click_handler;
    }

    let form = document.getElementById("add-obs");
    form.onsubmit = Model.add_observation;
    // form.onsubmit = function submitted(){
    //     Model.add_observation();
    //     views.userView();
    // }

    console.log(form);

    
}

// What happens when the window is loaded
window.onload = function() {
    redraw();
}

window.onhashchange = redraw;


