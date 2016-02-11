// Create a reference to the Firebase database.
var myDataRef = new Firebase('https://t3riglaq9qx.firebaseio-demo.com/');

$('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          // myDataRef.set('User ' + name + ' says ' + text);
          //myDataRef.set({name: name, text: text});
          // Use push to support a list of messages.
          myDataRef.push({name: name, text: text});
          $('#messageInput').val('');
        }
      });

// Add a callback to be informed when messages arrive.
myDataRef.on('child_added', function(snapshot) {
  // Extract the message data from the snapshot
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
    console.log('message received!');
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
}