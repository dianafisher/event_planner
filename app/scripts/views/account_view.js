/*global Backbone*/
/*global app*/
/*global console*/

'use strict';

app.AccountView = Backbone.View.extend({

    tagName: 'div',

    className: 'accont-view',

    ENTER_KEY: 13,
    ESCAPE_KEY: 27,

    // At initialization we bind to the relevant events on the `this.collection`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function () {
        console.log('account view initialize');
        // this.$account = this.$('#account');

        // this.allCheckbox = this.$('#toggle-all')[0];
        // this.$input = this.$('#new-todo');
        // this.$footer = this.$('#footer');
        // this.$main = this.$('#main');
        // this.$todoList = this.$('#todo-list');

        // this.listenTo(this.collection, 'add', this.addOne);
        // this.listenTo(this.collection, 'reset', this.addAll);
        // this.listenTo(this.collection, 'change:completed', this.filterOne);
        // this.listenTo(this.collection, 'filter', this.filterAll);
        // this.listenTo(this.collection, 'all', this.render);

        // this.collection.fetch();
    },

    render: function () { 
        // this.$el.html(this.template());       
        console.log('render AccountView');
        this.$el.html(this.template());
        return this;
    },
});
