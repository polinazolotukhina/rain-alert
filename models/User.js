const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema ({
    name: String,
    city: String,
    email: String
});
mongoose.model('users', userSchema);
