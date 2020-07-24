const WebSocket = require('ws');
const app = require('./app');
const Location = require('./models/location');
const User = require('./models/user');
const Chart = require('./models/chart');

const ws = new WebSocket.Server({ port: 8090 });
const clients = [];

ws.on('connection', (client) => {
  clients.push(client);
  // console.log('client', client);

  client.on('message', async (data) => {
    console.log('WebSocket', data);
    const dataParse = JSON.parse(data);
    // const dataReq = JSON.parse(data);
    // console.log('mes', dataReq.data);
    // if (dataReq.type == 'exit') {
    //   // clients.splice(clients.indexOf(client));
    //   await Location.deleteOne({ user: dataReq.data });
    //   const user = await User.findById(dataReq.data);
    //   // console.log(user);
    //   user.location = undefined;
    //   user.save();
    //   const locations = await Location.find();
    //   console.log('DisconUser', user);
    //   client.send('');
    //   clients.forEach((c) => {
    //     c.send(JSON.stringify(locations));
    //   });
    // } else {
    // const location = await Location.find();
    // console.log(location)
    await Chart.create({
      userName: dataParse.userName,
      userId1: dataParse.userId1,
      userId2: dataParse.userId2,
      text: dataParse.text,
    });
    const chartAll = await Chart.find();
    const charts = chartAll.slice(-8);
    // const locations = await Location.find()
    // const users = await User.find()
    const store = {
      // locations: locations,
      charts,
      // users: users,
    };
    clients.forEach((c) => {
      c.send(JSON.stringify(store));
    });
    // }
  });
  //   client.on('disconnect',  (data) => {
  // clients.splice(clients.indexOf(client), 1)
  // // await Location.deleteOne({lat: data})
  //     })

  // console.log('Clients:', clients.length)
});
// const ws2 = new WebSocket.Server({ port: 9000 });
// ws2.on('connectionWs2', (client) => {
//   clients.push(client);
//   // console.log('client', client);
//
//   client.on('message', async (data) => {
//     console.log('WebSocketW2', data);
//     // dataParse = JSON.parse(data);
//     // const dataReq = JSON.parse(data);
//     // console.log('mes', dataReq.data);
//     // if (dataReq.type == 'exit') {
//     //   // clients.splice(clients.indexOf(client));
//     //   await Location.deleteOne({ user: dataReq.data });
//     //   const user = await User.findById(dataReq.data);
//     //   // console.log(user);
//     //   user.location = undefined;
//     //   user.save();
//     //   const locations = await Location.find();
//     //   console.log('DisconUser', user);
//     //   client.send('');
//     //   clients.forEach((c) => {
//     //     c.send(JSON.stringify(locations));
//     //   });
//     // } else {
//     // const location = await Location.find();
//     // console.log(location)
//     //   await Chart.create({
//     //     userName: dataParse.userName,
//     //     userId1: dataParse.userId1,
//     //     userId2: dataParse.userId2,
//     //     text: dataParse.text,
//     //   })
//     // const chartAll = await Chart.find()
//     const locations = await Location.find();
//     const users = await User.find();
//     const store = {
//       locations,
//       // charts: chartAll,
//       users,
//     };
//     clients.forEach((c) => {
//       c.send('');
//     });
//     // }
//   });
  //   client.on('disconnect',  (data) => {
  // clients.splice(clients.indexOf(client), 1)
  // // await Location.deleteOne({lat: data})
  //     })

  // console.log('Clients:', clients.length)
// });

const PORT = 5000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`You are on ${PORT} port`);
});
