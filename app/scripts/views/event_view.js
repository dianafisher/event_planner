/*global Backbone*/
/*global app*/
/*global console*/

'use strict';

app.EventView = Backbone.View.extend({

    initialize: function () {
        console.log('event view initialize');
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
        console.log(this.model.attributes);
        console.log(this.model.attributes.name);
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});