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
router.post('/author', async (req, res) => {
  console.log('Otvet', req.body);
  const user = await User.author(req.body.formAuth.email, req.body.formAuth.password);
  req.session.authUser = user;
  console.log('REGSESSION', req.session.authUser);
  res.json({ user });
});
router.post('/registration', async (req, res) => {
  console.log('INFO', req.body.userData.userName);
  try {
    const user = await User.reg(req.body.userData.userName, req.body.userData.email, req.body.userData.password, req.body.userData.interests);

    res.json({ user });
  } catch (error) {
    return res.send('user already exist');
  }
});

router.post('/coordinat', async (req, res) => {
  console.log('coordinat', req.body.lat);

  if (req.body.lat) {
    const locations = await Location.findOne({ user: req.session.authUser._id });
    console.log('locations', locations);
    console.log('authUser', req.session.authUser._id);

    if (locations) {
      locations.lat = req.body.lat;
      locations.lng = req.body.lng;
      locations.save();
      const usersLocation = await Location.find();
      const usersAll = await User.find();
      const users = usersAll.filter((el) => el._id != req.session.authUser._id);

      return res.json({ usersLocation, users });
    }

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
    const arr = [];
    const usersAll = await User.find();
    const users = usersAll.filter((el) => el._id !== req.session.authUser._id);
    // console.log('ARRBACK', users)

    return res.json({ usersLocation, users });
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
