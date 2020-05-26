export {Model};

/* 
 * Model class to support the Citizen Science application
 * this class provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates two different events:
 *   "modelChanged" event when new data has been retrieved from the API
 *   "observationAdded" event when a request to add a new observation returns
*/

const Model = {

    observations_url: '/api/observations', 
    users_url:  '/api/users',   
    
    // this will hold the data stored in the model
    data: {
        observations: [],
        users: []
    },

    // update_users - retrieve the latest list of users 
    //    from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_users: function() {

        fetch(this.users_url)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            (data) => {

                let newdata = []
                for(let i = 0; i < data.length; i++){
                    if(data[i].code != ""){
                        newdata.push(data[i]);
                    }
                }
                this.data.users = newdata;

                let event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
            }
        );
    },

    // update_observations - retrieve the latest list of observations
    //   from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_observations: function() {

        fetch(this.observations_url)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            (data) => {
                this.data.observations = data;

                let event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event);
            }
        );
    },

    // get_observations - return an array of observation objects
    get_observations: function() {
        return this.data.observations;
    },

    // get_observation - return a single observation given its id
    get_observation: function(observationid) {

        let list = this.get_observation();
        for (let i = 0; i < list; i++){
            if(list[i].userid == observationid.userid){
                return list[i];
            }
        }
    },
 
    set_observations: function(observations) {
        this.data.observations = observations;
    },

    // add_observation - add a new observation by submitting a request
    //   to the server API
    //   formdata is a FormData object containing all fields in the observation object
    // when the request is resolved, creates an "observationAdded" event
    //  with the response from the server as the detail
    add_observation: function(formdata) {

    },

    // get_user_observations - return just the observations for
    //   one user as an array
    get_user_observations: function(userid) {
        let list = this.get_observations();
        let arr = [];
        // return list.push(get_observation(userid));
        for(let i = 0; i<list; i++){
            if(list[i].userid === userid){
                arr.push(list[i]);
            }
        }
        return arr;
    },

    // get_recent_observations - return the N most recent
    //  observations, ordered by timestamp, most recent first
    get_recent_observations: function(N) {
        let list = get_observation();
        let arr = [];
        for(let i = 0; i<N; i++){
            arr.push(list[i]);  
        }
        return arr;
    },

    /* 
    * Users
    */
    // get_users - return the array of users
    get_users: function() {
        return this.data.users;
    },

    // set_users - set the array of users
    set_users: function(users) {
        this.data.users = users;
    },

    // get_user - return the details of a single user given 
    //    the user id
    get_user: function(userid) {
        let list = this.get_users();
        for(let i = 0; i < list; i++){
            if(list[i].userid === userid)
                return list[i];
        }
    }

};
