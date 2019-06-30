const mongoose = require('mongoose');
const User = mongoose.model('users');
const bodyParser = require("body-parser");




module.exports = app => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/subscribe', (req, res) => {
        console.log('user ', req.body)
         new User(req.body).save()

    })
}
