/*global app*/
/*global Backbone*/

'use strict';

app.Event = Backbone.Model.extend({
    // Default attributes for the event
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
        title: '',
        completed: false
    }
});
