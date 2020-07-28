const W1 = new WebSocket('ws://localhost:8080');
W1.onopen = function () {
  console.log('connect');
};
W1.onmessage = function (data) {
  console.log('MeSaGe', data.data);
  document.getElementById('divAria').innerHTML = '';
  const parag = document.createElement('p');
  parag.innerText = data.data;
  document.getElementById('divAria').appendChild(parag);
};

const form = document.getElementById('form');
const formClose = document.getElementById('formClose');
console.log(formClose);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('click', e.target.mymess.value);

  W1.send(e.target.mymess.value);
});
formClose.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/coorddell');
  const res = await response.json();
  console.log('res', res.id);
  console.log('click', e.target.mymessClose.value);

  W1.send(JSON.stringify({ type: 'exit', data: res.id }));
});
W1.onclose = function () {
  console.log('close');
};
