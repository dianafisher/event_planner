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
        'keyup #repeatPassword': 'validateRepeatedPassword',
        'blur #inputName': 'validateName',
        'blur #inputEmail': 'validateEmail',
        'submit': 'createUser'
    },

    initialize: function () {
        console.log('account view initialize');
        this.nameHasErrors = false;
        this.emailHasErrors = false;
        this.passwordHasErrors = false;
        this.repeatPasswordHasErrors = false;
        // test password = Aa!2nnnnnnnnnnnnn

        // Get a database reference to our users.
        this.usersRef = app.firebaseRef.child('users');

        // // Attach an asynchronous callback to read the data at our posts reference
        // this.usersRef.on("value", function(snapshot) {
        //     console.log(snapshot.val());
        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        // });
    },

    render: function () {
        console.log('render AccountView');
        this.$el.html(this.template());

        this.$inputPassword = this.$('#inputPassword');
        this.$repeatPassword = this.$('#repeatPassword');
        
        return this;
    },

    validateName: function(e) {
        this.username = this.$('#inputName').val().trim();
        console.log(this.username);
        if (this.username.length == 0) {
            this.$('#name-group').addClass('has-error');
            this.$('#name-help').html('Please enter a name.');
            this.nameHasErrors = true;
        } else {
            this.$('#name-group').removeClass('has-error');
            this.$('#name-help').html('');
            this.nameHasErrors = false;
        }
    },

    validateEmail: function(e) {
        this.email = this.$('#inputEmail').val().trim();
        console.log(this.email);    
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        

        if (this.email.length == 0) {
            this.$('#email-group').addClass('has-error');
            this.$('#email-help').html('Please enter an email address.');
            this.emailHasErrors = true;
        } else if (!re.test(this.email)) {
            this.$('#email-group').addClass('has-error');
            this.$('#email-help').html('Please enter a valid email address.');
            this.emailHasErrors = true;
        } else {
            this.$('#email-group').removeClass('has-error');
            this.$('#email-help').html('');
            this.emailHasErrors = false;
        }
    },

    validatePassword: function(e) {
        this.password = this.$inputPassword.val().trim();
        var errors = [];

        // Check password length
        if (this.password.length < 16 || this.password.length > 100) {
            errors.push('#pwd-length');
            this.$('#pwd-length').addClass('bg-danger');
        } else {
            this.$('#pwd-length').removeClass('bg-danger');
            this.$('#pwd-length').addClass('bg-success');
        }
        // Check for required symbol
        if (!this.password.match(/[\!\@\#\$\%\^\*]/g)) {
            errors.push('#pwd-symbol');
            this.$('#pwd-symbol').addClass('bg-danger');
        } else {
            this.$('#pwd-symbol').removeClass('bg-danger');
            this.$('#pwd-symbol').addClass('bg-success');
        }
        // Check for required number
        if (!this.password.match(/[0-9]/g)) {
            errors.push('#pwd-number');
            this.$('#pwd-number').addClass('bg-danger');
        } else {
            this.$('#pwd-number').removeClass('bg-danger');
            this.$('#pwd-number').addClass('bg-success');
        }
        // Check for lowercase letter
        if (!this.password.match(/[a-z]/g)) {
            errors.push('#pwd-lower');
            this.$('#pwd-lower').addClass('bg-danger');
        } else {
            this.$('#pwd-lower').removeClass('bg-danger');
            this.$('#pwd-lower').addClass('bg-success');
        }
        // Check for uppercase letter
        if (!this.password.match(/[A-Z]/g)) {
            errors.push('#pwd-upper');
            this.$('#pwd-upper').addClass('bg-danger');
        } else {
            this.$('#pwd-upper').removeClass('bg-danger');
            this.$('#pwd-upper').addClass('bg-success');
        }

        if (errors.length > 0) {
            this.$('#password-group').addClass('has-error');
            this.passwordHasErrors = true;
        } else {
            this.$('#password-group').removeClass('has-error');
            this.passwordHasErrors = false;
        }

        var repeatedPassword = this.$repeatPassword.val().trim();

        if (repeatedPassword !=this.password) {
            this.$('#repeat-password-group').addClass('has-error');
            this.$('#repeat-password-help').html("Passwords do not match.");
        } else {
            this.$('#repeat-password-group').removeClass('has-error');
            this.$('#repeat-password-help').html("");
        }
    },

    validateRepeatedPassword: function(e) {
        var password = this.$inputPassword.val().trim();
        var repeatedPassword = this.$repeatPassword.val().trim();

        if (repeatedPassword != password) {
            this.$('#repeat-password-group').addClass('has-error');
            this.$('#repeat-password-help').html("Passwords do not match.");
            this.repeatPasswordHasErrors = true;
        } else {
            this.$('#repeat-password-group').removeClass('has-error');
            this.$('#repeat-password-help').html("");
            this.repeatPasswordHasErrors = false;
        }
    },
   
    createUser: function(e) {
        console.log('createUser!');
        // validate all required fields (again)
        this.validateName(e);
        this.validateEmail(e);
        this.validatePassword(e);
        this.validateRepeatedPassword(e);

        // Get the birthday, if entered.
        var birthday = this.$('#birthday').val();
        console.log(birthday);

        var employer = this.$('#inputEmployer').val().trim();
        var jobTitle = this.$('#inputJobTitle').val().trim();
        var name = this.username;
        var email = this.email;

        if (!this.repeatPasswordHasErrors && !this.passwordHasErrors && !this.emailHasErrors && !this.nameHasErrors) {
            console.log('all fields valid.');

            // Create the user in Firebase using just the email and password.
            app.firebaseRef.createUser({
                email: this.email,
                password: this.password
            }, function(error, userData){
                if (error) {
                    console.log('Error creating user:', error);
                } else {
                    console.log('Successfully created user account with uid:', userData.uid);
                    // Now that we have the uid for the user, populate the users table with it.
                    var usersRef = app.firebaseRef.child('users');
                    var userAccountRef = usersRef.child(userData.uid);
                    userAccountRef.set({
                        name: name,
                        email: email,
                        birthday: birthday,
                        employer: employer,
                        jobTitle: jobTitle
                        }, function(error2) {
                            if (error2) {
                                console.log('Could not save data ' + error2);
                            } else {
                                console.log('Successfully saved.');
                            }
                        }
                    );
                }
            });            

        } else {
            console.log('errors!');
        }
    }
});
