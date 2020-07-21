const router = require('express').Router();
const session = require('express-session');
const User = require('../models/user');
const Location = require('../models/location');

router.use(session({
  // store: new FileStore(),
  secret: 'f',
  // resave: false,
  // cookie: {
  // expires: 7000
  // }
}));

router.get('/', (req, res) => {
  res.render('index');
});
router.post('/author', async (req, res)=>{
  console.log('Otvet', req.body)
let user = await User.author(req.body.formAuth.email, req.body.formAuth.password)
req.session.authUser = user;
console.log('REGSESSION', req.session.authUser)
  res.json({user})
})
router.post('/info', async (req, res) => {
  console.log('INFO', req.body);
  try{
const user = await User.reg( req.body.UserName, req.body.email, req.body.password, req.body.interests);
  // user.password = req.body.password;
  // user.email = req.body.email;
  // user.interests = req.body.interests;
  // user.save();
  req.session.authUser = user;
  console.log(req.session.authUser);

  res.json({ user });
  } catch (error) {
    res.send('user already exist')
    return
  }
  
});

router.post('/coordinat', async (req, res) => {
  console.log('coordinat', req.body.lat);
  const locations = await Location.findOne({user: req.session.authUser});
  if(locations){
    locations.lat = req.body.lat
    locations.lng = req.body.lng
    locations.save()
    const usersLocation = await Location.find();
  res.json({ usersLocation });
  } else if(req.body.lat){
    const location = await Location.create({
    lat: req.body.lat,
    lng: req.body.lng,
    user: req.session.authUser._id,
  });
  location.save();

  const user = await User.findById(req.session.authUser._id);
  user.location = location._id;
  user.save();
  req.session.authUser = user;
  // console.log(req.session.authUser);
  const usersLocation = await Location.find();
  res.json({ usersLocation });
  }

  
});
router.delete('/coordinat', async (req, res) => {
  await Location.deleteOne({ user: req.session.authUser._id });
  const user = await User.findById(req.session.authUser._id);
  // console.log(user);
  user.location = undefined;
  user.save();
  req.session.authUser = user;
  console.log('после', user);
  res.json({ user });
});
router.get('/coorddell', async (req, res) => {
  console.log('!!!!!', req.session.authUser._id);
  res.json({ id: req.session.authUser._id });
});


module.exports = router;
