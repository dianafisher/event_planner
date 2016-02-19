/*global Backbone*/
/*global app*/
/*global console*/

'use strict';

app.LoginView = Backbone.View.extend({

    tagName: 'div',

    className: 'login-view',

    events: {
        'submit': 'loginUser'
    },

    initialize: function () {
        console.log('login view initialize');
    },

    render: function () {
        console.log('render LoginView');
        this.$el.html(this.template());
        
        return this;
    },

    loginUser: function(e) {
        var email = this.$('#inputEmail').val().trim();
        var password = this.$('#inputPassword').val().trim();
        var self = this;

        app.firebaseRef.authWithPassword({
            email: email,
            password: password
        }, function(error, authData) {
            if (error) {
                console.log('login failed!', error);                
                self.$('#login-help').html('Failed to log in.  Please try again.');
            } else {
                console.log('Authenticated successfully with payload:', authData);
                self.$('#login-help').html('Success!  Redirecting...');
                self.redirect();
            } 
        }, {
            remember: 'sessionOnly'
        });
    },

    redirect: function() {
        app.router.navigate('#events', {trigger: true});
    }
});