import * as views from './views.js';
import{Model} from './model.js';

function redraw() { 

    let content = "<h2>API Test</h2><ul>";
    content += "<li><a href='/api/observations'>List of Observations</a></li>";
    content += "<li><a href='/api/users'>List of Users</a></li>"; 
    content += "<li><a href='/api/users/1'>Detail of one user</a></li>"; 
    content += "<li><a href='/api/observations/1'>Detail of one observation</a></li>"; 
    content += "</ul>";


    // update the page
    document.getElementById("target").innerHTML = content;
}

window.addEventListener("modelUpdated", function(e) {

    console.log('hello....')
    let users = Model.data.users;

    views.listUsersView("target", users);

    bindings();
})

function user_click_handler(e){

    let user = Model.get_user(this.dataset.id);

    views.userView()

}

function bindings(){

    let elements = document.getElementsByClassName("user")
    // console.log(elements);
    for(let i = 0; i<elements.length; i++){
        elements[i].click = user_click_handler;
    }
}

window.onload = function() {
    redraw();

    this.console.log("Nope");
    Model.update_users();
    // Model.update_observations();
};


