/*global Firebase*/
/*global $*/
/*global console*/
/*eslint no-undef: 2*/

'use strict';

console.log('\'Allo \'Allo!');

var myFirebaseRef = new Firebase('https://burning-torch-7549.firebaseio.com/');

$('#testInput').keypress(function (e) {
  if (e.keyCode === 13) {
    myFirebaseRef.set({
      title: 'Hello World!',
      author: 'Firebase',
      location: {
        city: 'San Francisco',
        state: 'California',
        zip: 94103
      }
    });
  }
});

// Add a callback to be informed when messages arrive.
myFirebaseRef.on('child_added', function(snapshot) {
  // Extract the message data from the snapshot
    var message = snapshot.val();
    console.log(message);
});
