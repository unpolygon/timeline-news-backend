const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username']
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    }
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
        const same_password = await bcrypt.compare(password, user.password);
        if(same_password){
            return user
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}


const User = mongoose.model('user', userSchema);

module.exports = User;
  