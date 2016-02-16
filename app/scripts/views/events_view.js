/*global app*/
/*global Backbone*/
/*global console*/
/*global _*/

'use strict';

// The EventsView view holds all of the individual event views.
app.EventsView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#events',

    ENTER_KEY: 13,
    ESCAPE_KEY: 27,

    // Delegated events for creating new items, and clearing completed ones.
    events: {
    
    },

    // At initialization we bind to the relevant events on the `this.collection`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function () {
        // this.allCheckbox = this.$('#toggle-all')[0];
        // this.$input = this.$('#new-todo');
        // this.$footer = this.$('#footer');
        // this.$main = this.$('#main');
        this.$eventList = this.$('#event-list');

        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'change:completed', this.filterOne);
        this.listenTo(this.collection, 'filter', this.filterAll);
        this.listenTo(this.collection, 'all', this.render);

        // this.collection.fetch();
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
           self.addOne(ev);
        });
        return this;

        // this.allCheckbox.checked = !remaining;
    },

    // Add a single event to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function (data) {
        console.log(data);
        var view = new app.EventView({ model: data });
        var list = $("#event-list", this.el);
        list.append(view.render().el);
        // this.$eventList.append(view.render().el);
    },

    // Add all items in the **this.collection** collection at once.
    addAll: function () {
        this.$eventList.empty();
        this.collection.each(this.addOne, this);
    },

    filterOne: function (event) {
        // todo.trigger('visible');
    },

    filterAll: function () {
        this.collection.each(this.filterOne, this);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function () {
        return {
            title: this.$input.val().trim(),
            order: 0,
            completed: false
        };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function (e) {
        if (e.which !== this.ENTER_KEY || !this.$input.val().trim()) {
            return;
        }

        this.collection.create(this.newAttributes());
        this.$input.val('');
    },

    // Clear all completed todo items, destroying their models.
    clearCompleted: function () {
        _.invoke(this.collection.completed(), 'destroy');
        return false;
    },

    toggleAllComplete: function () {
        var completed = this.allCheckbox.checked;

        this.collection.each(function (event) {
            // do stuff...
        });
    }
});
