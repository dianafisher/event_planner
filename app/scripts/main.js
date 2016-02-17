/*global Firebase*/
/*global GeoFire*/
/*global Backbone*/
/*global $*/
/*global _*/
/*global document*/
/*global console*/
/*global alert*/
/*global prompt*/
/*global Promise*/
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
        'signup': 'createAccount',
        'login': 'login',
        'events': 'showEvents',
        'events/new': 'createEvent'
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
    },

    login: function() {
        var loginView = new app.LoginView();
        this.showView(loginView);
    },

    createEvent: function() {
        var createEventView = new app.CreateEventView();
        this.showView(createEventView);
    },

    showEvents: function() {
        console.log('showEvents');
        var self = this;
        app.Events.fetch({
            success: function(data) {
                console.log(data);
                var eventsView = new app.EventsView({ collection: app.Events });
                self.showView(eventsView);
            },
            error: function(model, xhr, options) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        });
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


app.firebaseRef = new Firebase('https://burning-torch-7549.firebaseio.com');


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
           'HomeView', 'EventsView', 'AccountView', 'EventView', 'LoginView', 'CreateEventView'
        ],
        function () {
            app.router = new app.Router();
            Backbone.history.start();
        });
});
