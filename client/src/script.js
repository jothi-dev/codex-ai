import bot from '/assets/bot.svg';
import user from '/assets/user.svg';

console.log(bot);
console.log(user);

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element){
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....'){
      element.textContent = '';
    }
  }, 300);
}

function typeText(element, text){
  let index = 0;
  let interval = setInterval(() => {
    if(index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId){
  return (`
    <div class="wrapper ${isAi ? 'ai' : ''}">
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user'}" />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>`
  );
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  console.log('-- data', formData)

  chatContainer.innerHTML += chatStripe(false, formData.get('prompt'));
  form.reset();

  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  fetch('http://localhost:5000/chat', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({prompt: formData.get('prompt')})
  }).then(resp => {
    return resp.json();
  }).then(res => {
    clearInterval(loadInterval);
    loadInterval = null;

    messageDiv.textContent = '';
    typeText(messageDiv, res.bot);
  }).catch(error => {
    clearInterval(loadInterval);
    loadInterval = null;

    messageDiv.textContent = 'Something went wrong';
    console.log('error: ', error);
  })
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13){
    handleSubmit(e);
  }
});
