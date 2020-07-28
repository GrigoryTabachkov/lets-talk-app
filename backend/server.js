const WebSocket = require('ws');
const app = require('./app');
const Chart = require('./models/chart');

const ws = new WebSocket.Server({ port: 8090 });
const clients = [];

ws.on('connection', (client) => {
  clients.push(client);

  client.on('message', async (data) => {
    const dataParse = JSON.parse(data);
    await Chart.create({
      userName: dataParse.userName,
      userId1: dataParse.userId1,
      userId2: dataParse.userId2,
      text: dataParse.text,
    });
    const chartAll = await Chart.find();
    const charts = chartAll.slice(-8);
    const store = {
      charts,
    };
    clients.forEach((c) => {
      c.send(JSON.stringify(store));
    });
  });
});

const PORT = 5000;

app.listen(process.env.PORT || PORT);
