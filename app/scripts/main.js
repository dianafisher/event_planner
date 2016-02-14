/*global Firebase*/
/*global Backbone*/
/*global $*/
/*global _*/
/*global document*/
/*global console*/
/*global alert*/
/*eslint no-undef: 2*/
/*eslint no-new: 0*/
/*eslint no-alert: 2*/
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
        '*filter': 'setFilter'
    },

    initialize: function() {
        console.log('initialized');
        new app.StatsView({ collection: app.Todos });
    },

    index: function() {
        console.log('index');
    },

    setFilter: function (param) {
        // Set the current filter to be used
        console.log('param', param);
        app.TodoFilter = param || '';

        // Trigger a collection filter event, causing hiding/unhiding
        // of the Todo view items
        app.Todos.trigger('filter');
    }
});

console.log('\'Allo \'Allo!');

var myFirebaseRef = new Firebase('https://burning-torch-7549.firebaseio.com/');

$('#testInput').keypress(function (e) {
  if (e.keyCode === 13) {
    myFirebaseRef.set({
      title: 'Hello World!',
      author: 'Firebase',
      location: {
        city: 'San Francisco',
        state: 'California',
        zip: 94103
      }
    });
  }
});

// Add a callback to be informed when messages arrive.
myFirebaseRef.on('child_added', function(snapshot) {
  // Extract the message data from the snapshot
    var message = snapshot.val();
    console.log(message);
});


$(document).on('ready', function () {

    app.loadTemplates([
           'TodoView', 'StatsView'
        ],
        function () {
            app.router = new app.Router();
            Backbone.history.start();
        });
});
