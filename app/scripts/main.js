/*global Firebase*/
/*global Backbone*/
/*global $*/
/*global _*/
/*global document*/
/*global console*/
/*global alert*/
/*global prompt*/
/*global Promise*/
/*eslint no-undef: 2*/
/*eslint no-new: 0*/
/*eslint no-alert: 0*/

'use strict';

var app = {
    views: {},
    models: {},

    loadTemplates: function(views, callback) {
        var deferreds = [];
        $.each(views, function(index, view) {
            if (app[view]) {
                deferreds.push($.get('templates/' + view + '.html', function(data) {
                    app[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                console.error(view + ' not found');
            }
        });

        $.when.apply(null, deferreds).done(callback);

    }
};

app.Router = Backbone.Router.extend({

    routes: {
        '': 'index',
        'signup': 'createAccount'
    },

    initialize: function() {
        console.log('initialized');
        // var accountView = new app.AccountView();
        // $('#eventapp').append(accountView.render().el);
        // new app.StatsView({ collection: app.Todos });

        // var eventView = new app.EventView();
        // $('#eventapp').append(eventView.render().el);

        // var eventView2 = new app.EventView();
        // $('#eventapp').append(eventView2.render().el);
        // var eventsView = new app.EventsView({ collection: app.Events });
        // $('#eventapp').append(eventsView.render().el);

        // Grab the div for the app
        this.$app = $('#appView');

    },

    index: function() {
        console.log('index');
        var self = this;

        var homeView = new app.HomeView();
        this.showView(homeView);

    //     app.Events.fetch({
    //         success: function(data) {
    //             console.log(data);
    //             var eventsView = new app.EventsView({ collection: app.Events });
    //             $('#events').append(eventsView.render().el);
    //         },
    //         error: function(model, xhr, options) {
    //             console.log(xhr.status);
    //             console.log(xhr.responseText);
    //         }
    //     });
    },

    showView: function(view) {
        if (this.currentView) {
            this.currentView.remove();
        }
        this.$app.html(view.render().el);
        this.currentView = view;
    },

    createAccount: function() {
        console.log('create account..');
        var accountView = new app.AccountView();
        this.showView(accountView);
    }
});



console.log('\'Allo \'Allo!');

var USERS_LOCATION = 'https://SampleChat.firebaseIO-demo.com/users';

function userExistsCallback(userId, exists) {
  if (exists) {
    alert('user ' + userId + ' exists!');
  } else {
    alert('user ' + userId + ' does not exist!');
  }
}

// Tests to see if /users/<userId> has any data.
function checkIfUserExists(userId) {
  var usersRef = new Firebase(USERS_LOCATION);
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}

function go() {
    var userId = prompt('Username?', 'Guest');
    checkIfUserExists(userId);
}


var myFirebaseRef = new Firebase('https://burning-torch-7549.firebaseio.com/users');

// Add a callback to be informed when messages arrive.
myFirebaseRef.on('child_added', function(snapshot) {
  // Extract the message data from the snapshot
    var message = snapshot.val();
    console.log(message);
});


$(document).on('ready', function () {
    
    // // Authenticate Firebase
    // var ref = new Firebase("https://burning-torch-7549.firebaseio.com");
    // ref.authWithCustomToken("AUTH_TOKEN", function(error, authData) {
    //   if (error) {
    //     console.log("Authentication Failed!", error);
    //   } else {
    //     console.log("Authenticated successfully with payload:", authData);
    //   }
    // });

    app.loadTemplates([
           'HomeView', 'EventsView', 'AccountView', 'EventView'
        ],
        function () {
            app.router = new app.Router();
            Backbone.history.start();
        });
});
