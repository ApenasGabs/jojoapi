const mongoose = require('./db')
    //schema de post
const userSchema = new mongoose.Schema({
    nick: String,
    password: String,
    id: String,
    class: String


}, { collection: 'users' });
module.exports = userSchema