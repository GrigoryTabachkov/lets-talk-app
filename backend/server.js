const WebSocket = require('ws');
const app = require('./app');
const Location = require('./models/location');
const User = require('./models/user');

const ws = new WebSocket.Server({ port: 8080 });
const clients = [];

ws.on('connection', (client) => {
  clients.push(client);
  // console.log('client', client);

  client.on('message', async (data) => {
    console.log(data);
    const dataReq = JSON.parse(data);
    console.log('mes', dataReq.data);
    if (dataReq.type == 'exit') {
      // clients.splice(clients.indexOf(client));
      await Location.deleteOne({ user: dataReq.data });
      const user = await User.findById(dataReq.data);
      // console.log(user);
      user.location = undefined;
      user.save();
      const locations = await Location.find();
      console.log('DisconUser', user);
      client.send('');
      clients.forEach((c) => {
        c.send(JSON.stringify(locations));
      });
    } else {
      const location = await Location.find();
      // console.log(location)

      clients.forEach((c) => {
        c.send(JSON.stringify(location));
      });
    }
  });
  //   client.on('disconnect',  (data) => {
  // clients.splice(clients.indexOf(client), 1)
  // // await Location.deleteOne({lat: data})
  //     })

  // console.log('Clients:', clients.length)
});
const PORT = 5000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`You are on ${PORT} port`);
});
