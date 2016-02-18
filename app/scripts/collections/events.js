/*global Backbone*/
/*global app*/
'use strict';

app.EventsCollection = Backbone.Firebase.Collection.extend({
    // Reference to this collection's model.
    model: app.Event,

    // Where to save all of the events
    url: 'https://burning-torch-7549.firebaseio.com/events',

    // Events are sorted by startDate (earliest first).
    comparator: function(model) {
      return -model.get('startDate');
    }
});

app.Events = new app.EventsCollection();
