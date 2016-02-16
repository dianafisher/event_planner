/*global Backbone*/
/*global app*/
/*global console*/

'use strict';

app.HomeView = Backbone.View.extend({

    tagName: 'div',

    className: 'home-view',


    initialize: function () {
        console.log('home view initialize');    
    },

    render: function () {             
        console.log('render HomeView');
        this.$el.html(this.template());
        return this;
    },
});
