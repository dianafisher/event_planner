/*global app*/
/*global Backbone*/

'use strict';

app.Event = Backbone.Model.extend({
    // Default attributes for the event
    // and ensure that each event created all keys.
    defaults: {
        name: 'Untitled Event',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        location: '',
        type: '',
        host: '',
        guests: '',
        message: ''
    }
});
