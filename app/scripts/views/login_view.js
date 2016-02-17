/*global Backbone*/
/*global app*/
/*global console*/

'use strict';

app.LoginView = Backbone.View.extend({

    tagName: 'div',

    className: 'login-view',

    initialize: function () {
        console.log('login view initialize');        
    },

    render: function () {
        console.log('render LoginView');
        this.$el.html(this.template());       
        
        return this;
    }
});