/*global app*/
/*global Backbone*/
/*global console*/
/*global _*/
/*global $*/

'use strict';

// The EventsView view holds all of the individual event views.
app.EventsView = Backbone.View.extend({

    tagName: 'div',

    className: 'events-view',

    // Delegated events for creating new items, and clearing completed ones.
    events: {
    
    },

    initialize: function () {
        this.listenTo(this.collection, 'add', this.addOne);
        // this.listenTo(this.collection, 'reset', this.addAll);
        // this.listenTo(this.collection, 'change:completed', this.filterOne);
        // this.listenTo(this.collection, 'filter', this.filterAll);
        this.listenTo(this.collection, 'all', this.render);
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function () {
        // var completed = this.collection.completed().length;
        // var remaining = this.collection.remaining().length;
        console.log(this.collection.length);

        console.log('render EventsView');
        this.$el.html(this.template());
        var self = this;
        
        _.each(this.collection.models, function(ev){
            console.log(ev);
            var view = new app.EventView({ model: ev });
            var list = $("#event-list", this.el);
            list.append(view.render().el);
        }, this);

        return this;
    },

    // Add a single event to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function (data) {
        console.log(data);
        var view = new app.EventView({ model: data });
        var list = $("#event-list", this.el);
        list.append(view.render().el);
    }

});
