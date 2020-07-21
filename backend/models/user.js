const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  interests: [String],
  location: {
    type: mongoose.Types.ObjectId,
    ref: 'locations',
  }
})
function hashPass(str){
  const salt = 'Waboo_lap_ta'
  return require('crypto').createHash('md5').update(str+salt).digest('hex')
}
userSchema.statics.reg = async function (userName, email, password, interests) {
  const existUser = await this.findOne({userName: userName})
  const existUserEmail = await this.findOne({email: email})
  if(existUser||existUserEmail) throw new Error('User exist already')
  const user = new this({userName: userName})
user.password = hashPass(password);
user.email = email;
user.interests = interests
await user.save()
return user;
}

userSchema.statics.author = async function(email, password){
const user = await this.findOne({email: email})
if(!user) throw Error('User lost') 
if(user.password != hashPass(password)) throw new Error('Wrong password')
return user
}

module.exports = mongoose.model('users', userSchema)
