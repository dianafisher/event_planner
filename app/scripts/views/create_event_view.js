/*global Backbone*/
/*global app*/
/*global console*/

'use strict';

app.CreateEventView = Backbone.View.extend({

    tagName: 'div',

    className: 'create-event-view',

    events: {
        'focus #inputLocation': 'geolocate',
        'blur #inputName': 'validateName',
        'blur #startDate': 'validateStartDate',
        'blur #startTime': 'validateStartTime',
        'blur #endDate': 'validateEndDate',
        'blur #endTime': 'validateEndTime',
        'blur #inputLocation': 'validateLocation',
        'blur #inputType': 'validateType',
        'blur #inputHost': 'validateHost',        
        'click #add_guest': 'addGuest',

        'submit': 'createEvent'
    },

    initialize: function () {
        console.log('login view initialize');
        this.nameHasErrors = false;
        this.guestList = [];
    },

    render: function () {
        console.log('render CreateEventView');
        this.$el.html(this.template());
        
        return this;
    },

    redirect: function() {
        app.router.navigate('#', {trigger: true});
    },

    validateName: function(e) {
        this.eventName = this.$('#inputName').val().trim();
        console.log(this.eventName);
        if (this.eventName.length == 0) {
            this.$('#name-group').addClass('has-error');
            this.$('#name-help').html('Please enter a name for the event.');
            this.nameHasErrors = true;
        } else {
            this.$('#name-group').removeClass('has-error');
            this.$('#name-help').html('');
            this.nameHasErrors = false;
        }
    },

    validateStartDate: function(e) {
        this.startDate = this.$('#startDate').val();
        console.log(this.startDate);
        if (this.startDate.length == 0) {
            this.$('#start-date-group').addClass('has-error');
            this.$('#start-date-help').html('Please enter a start date for the event.');
            this.startDateErrors = true;
        } else {
            this.$('#start-date-group').removeClass('has-error');
            this.$('#start-date-help').html('');
            this.startDateErrors = false;
        }
    },

    validateStartTime: function(e) {
        this.startTime = this.$('#startTime').val();
        console.log(this.startTime);
        
        if (this.startTime.length == 0) {
            this.$('#start-date-group').addClass('has-error');
            this.$('#start-date-help').html('Please enter a start time for the event.');
            this.startTimeErrors = true;
        } else {
            this.$('#start-date-group').removeClass('has-error');
            this.$('#start-date-help').html('');
            this.startTimeErrors = false;
        }
    },    

    validateEndDate: function(e) {
        this.endDate = this.$('#endDate').val();
        console.log(this.endDate);
        if (this.endDate.length == 0) {
            this.$('#end-date-group').addClass('has-error');
            this.$('#end-date-help').html('Please enter a end date for the event.');
            this.endDateErrors = true;
        } 
        else {
            // Check that end date is not before start date.
            var start = new Date(this.startDate);
            var end = new Date(this.endDate);
            // console.log('start', start);
            // console.log('start', start.getTime());
            // console.log('end', end);
            // console.log('end', end.getTime());

            if (end.getTime() < start.getTime()) {
                this.$('#end-date-group').addClass('has-error');
                this.$('#end-date-help').html('End date must be after start date.');
                this.endDateErrors = true;
            } else {
                this.$('#end-date-group').removeClass('has-error');
                this.$('#end-date-help').html('');
                this.endtDateErrors = false;
            }
        }
    },

    validateEndTime: function(e) {
        this.endTime = this.$('#endTime').val();
        console.log(this.endTime);

        if (this.endTime.length == 0) {
            this.$('#end-date-group').addClass('has-error');
            this.$('#end-date-help').html('Please enter a end time for the event.');
            this.endTimeErrors = true;
        } else {
            // if the event starts and ends on the same day, check that the end time is after the start time
            var startDate = new Date(this.startDate);
            var endDate = new Date(this.endDate);

            var time_start = this.startTime.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
            var hours = parseInt(time_start[1], 10);
            var minutes = parseInt(time_start[2], 10);
            startDate.setHours(hours);
            startDate.setMinutes(minutes);
    
            var time_end = this.endTime.match(/(\d+)(?::(\d\d))?\s*(p?)/i);

            var h = parseInt(time_end[1], 10);
            var m = parseInt(time_end[2], 10);

            endDate.setHours(h);
            endDate.setMinutes(m);

            console.log('start date', startDate);
            console.log('end date', endDate);

            if (endDate.getTime() <= startDate.getTime()) {
                this.$('#end-date-group').addClass('has-error');
                this.$('#end-date-help').html('End time must be after start time.');
                this.endTimeErrors = true;
            } 
            else {
                this.$('#end-date-group').removeClass('has-error');
                this.$('#end-date-help').html('');
                this.endTimeErrors = false;
            }
        }
    },

    validateLocation: function(e) {
        this.eventLocation = this.$('#inputLocation').val();
        console.log(this.eventLocation);
        if (this.eventLocation.length == 0) {
            this.$('#location-group').addClass('has-error');
            this.$('#location-help').html('Please enter a location for the event.');
            this.locationsErrors = true;
        } else {
            this.$('#location-group').removeClass('has-error');
            this.$('#location-help').html('');
            this.locationsErrors = false;
        }
    },

    validateType: function(e) {
        this.eventType = this.$('#inputType').val();
        console.log('type', this.eventType);
        if (this.eventLocation.length == 0) {
            this.$('#type-group').addClass('has-error');
            this.$('#type-help').html('Please enter an event type.');
            this.TypeErrors = true;
        } else {
            this.$('#type-group').removeClass('has-error');
            this.$('#type-help').html('');
            this.TypeErrors = false;
        }
    },

    validateHost: function(e) {
        this.eventHost = this.$('#inputHost').val();
        console.log(this.eventHost);
        if (this.eventLocation.length == 0) {
            this.$('#host-group').addClass('has-error');
            this.$('#host-help').html('Please enter a host for the event.');
            this.HostErrors = true;
        } else {
            this.$('#host-group').removeClass('has-error');
            this.$('#host-help').html('');
            this.HostErrors = false;
        }
    },

    validateGuests: function(e) {
        if (this.guestList.length === 0) {
            this.$('#guests-help').html('Please enter an email address for each guest.');
            this.guestsHasErrors = true;
        }
        else {
            this.$('#guests-group').removeClass('has-error');
            this.$('#guests-help').html('');
            this.guestsHasErrors = false;
        }
    },

    addGuest: function(e) {
       var guest = this.$('#inputGuests').val();
       console.log('adding', guest);

       var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        

        if (guest.length == 0) {
            this.$('#guests-group').addClass('has-error');
            this.$('#guests-help').html('Please enter an email address for each guest.');
            this.guestsHasErrors = true;
        } else if (!re.test(guest)) {
            this.$('#guests-group').addClass('has-error');
            this.$('#guests-help').html('Please enter a valid email address.');
            this.guestsHasErrors = true;
        } else {
            this.$('#guests-group').removeClass('has-error');
            this.$('#guests-help').html('');
            this.guestsHasErrors = false;
            // Add the email address to the guest list.
            this.guestList.push(guest);
            this.$('#guest_list').append('<li id="guest_item">' + guest + '</li>');
        }
    },

     createEvent: function(e) {
        console.log('create event');
        this.validateName();
        this.validateStartDate();
        this.validateStartTime();
        this.validateEndDate();
        this.validateEndTime();
        this.validateLocation();
        this.validateType();
        this.validateHost();
        this.validateGuests();

        var message = this.$('#inputMessage').val().trim();

        var attributes = {
            name: this.eventName,
            startDate: this.startDate,
            startTime: this.startTime,
            endDate: this.endDate,
            endTime: this.endTime,
            location: this.eventLocation,
            type: this.eventType,
            host: this.eventHost,
            guests: this.guestList,
            message: message
        };
        app.Events.create(attributes);
    }


});

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};


function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('inputLocation')),
    {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

// [START region_fillform]
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
// [END region_geolocation]
