/*global Backbone*/
/*global app*/
/*global console*/

'use strict';

app.CreateEventView = Backbone.View.extend({

    tagName: 'div',

    className: 'create-event-view',

    events: {
        'submit': 'createEvent'
    },

    initialize: function () {
        console.log('login view initialize');        
    },

    render: function () {
        console.log('render CreateEventView');
        this.$el.html(this.template());       
        
        return this;
    },

    createEvent: function(e) {
        console.log('create event');
    },

    redirect: function() {
        app.router.navigate('#', {trigger: true});
    }
});