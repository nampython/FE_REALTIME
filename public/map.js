const socket = io();
const chatForm = document.querySelector('#chat-form')
const chatMess = document.querySelector('#chat-mes')
// chatForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const message = chatMess.value
//     socket.emit('chatMessage',
//         {message: message}
//     );
//     chatMess.value = ''
// })

const messages = document.querySelector('#messages')
socket.on('event', (message) => {
    // const chatItem = document.createElement('li')
    // chatItem.textContent = message;
    // messages.appendChild(chatItem);
    // window.scrollTo(0, document.body.scrollHeight);
    addMessage(message);
})

function addMessage(data) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    messageElement.innerText = `${data}`
    // get chatContainer element from our html page
    const chatContainer = document.getElementById('chatContainer')
    // adds the new div to the message container div
    chatContainer.append(messageElement)
}

var map = new Datamap(
    { 
      element: document.getElementById('container'),
      fills: {
          defaultFill: 'rgba(23,48,210,0.9)' // Any hex, color name or rgb/rgba value
      }
    }
);