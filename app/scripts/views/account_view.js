/*global Backbone*/
/*global app*/
/*global console*/

'use strict';

app.AccountView = Backbone.View.extend({

    tagName: 'div',

    className: 'accont-view',

    // The DOM events specific to an item.
    events: {
        'keyup #inputPassword': 'validatePassword',
    },

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
    },

    render: function () {         
        console.log('render AccountView');
        this.$el.html(this.template());
        this.$inputPassword = this.$('#inputPassword');
        this.$repeatPassword = this.$('#repeatPassword');
        
        return this;
    },

    validatePassword: function(e) {
        var password = this.$inputPassword.val().trim();
        console.log(password);
        this.validateLength(password);
        this.validateSymbol(password);
        this.validateNumber(password);
        this.validateLower(password);
        this.validateUpper(password);
    },

    validateLength: function(password) {
        console.log(password.length);
        if (password.length >= 16) {
            this.$('#pwd-length').removeClass('bg-danger');
            this.$('#pwd-length').addClass('bg-success');
        } else {
           this.$('#pwd-length').addClass('bg-danger');
        }
    },

    validateSymbol: function(password) {
        if (password.match(/[\!\@\#\$\%\^\*]/g)) {
           this.$('#pwd-symbol').removeClass('bg-danger');
            this.$('#pwd-symbol').addClass('bg-success');
        } else {
           this.$('#pwd-symbol').addClass('bg-danger');
        }
    },

    validateNumber: function(password) {
        if (password.match(/[0-9]/g)) {
           this.$('#pwd-number').removeClass('bg-danger');
            this.$('#pwd-number').addClass('bg-success');
        } else {
           this.$('#pwd-number').addClass('bg-danger');
        }
    },

    validateLower: function(password) {
       if (password.match(/[a-z]/g)) {
           this.$('#pwd-lower').removeClass('bg-danger');
            this.$('#pwd-lower').addClass('bg-success');
        } else {
           this.$('#pwd-lower').addClass('bg-danger');
        }
    },

    validateUpper: function(password) {
       if (password.match(/[A-Z]/g)) {
           this.$('#pwd-upper').removeClass('bg-danger');
            this.$('#pwd-upper').addClass('bg-success');
        } else {
           this.$('#pwd-upper').addClass('bg-danger');
        }
    }
});
