//Make connection

var socket = io.connect('http://localhost:3000');

var userInfo = {};

$( document ).ready((event) => {
  // Handler for .ready() called.
  let username = chance.name();
  userInfo.name = username;
  console.log('userInfo',userInfo);

  socket.on('connection', (data) => {
      // console.log('Your ChatId:',data);
      userInfo.chatId = data;
      // console.log('Userinfo', userInfo);
      handler.innerHTML = '<em style="padding:20px">Username: '+ username + '</em>';
      $( "#message" ).focus();
  });
});

// Emit events

// Typing event listen
$('#message').keypress((event) => {
    if(event.key === 'Enter'){
      $('#send').click();
    }else{
      socket.emit('typing',userInfo.name);
    }
});

// btn click events
$('#send').click(() => {
    socket.emit('chat',{
        message: $("#message").val(),
        username: userInfo.name
    });
    $("#chat-window").stop().animate({ scrollTop: $("#chat-window")[0].scrollHeight}, 1000);
    $( "#message" ).focus();
    $("#message").val('');
});

$('#send').keypress((event) => {
  console.log(event);
  if(event.keycode == 13){
    $('#send').click();
  }
});

// Listen for events
socket.on('chat', (data) => {
    $('#broadcast').html('');
    $('#output').append('<p><strong>' + data.username +'</strong>: ' + data.message + '</p>');

});

socket.on('typing', (data) => {
    $('#broadcast').html('<p><em>' + data + ' is typing ...</em></p>')
})
