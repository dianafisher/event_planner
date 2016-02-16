/*global Backbone*/
/*global app*/
'use strict';

app.EventsCollection = Backbone.Firebase.Collection.extend({
    // Reference to this collection's model.
    model: app.Event,

    // Save all of the todo items under the `"todos"` namespace.
    url: 'https://burning-torch-7549.firebaseio.com/events'
});

app.Events = new app.EventsCollection();
