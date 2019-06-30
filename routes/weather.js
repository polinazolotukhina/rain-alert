const keys = require('../keys');
const fetch = require('node-fetch');
const nodemailer = require("nodemailer");
const CronJob = require('cron').CronJob;
const mongoose = require('mongoose');
const User = mongoose.model('users');


module.exports = app => {

    //EXAMPLE :     localhost:5000/weather?city=portland
    app.get('/weather', (req, res) => {

        User.find({}, function (err, docs) {

            let emails = []
            emails = docs.map(email => email.email)


            var rightNow = new Date();
            var today = rightNow.toISOString().slice(0,10);
            const city = req.query.city;
            const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keys.apiKey}`
              fetch(url)
                  .then(res => res.json())
                  .then(data => {
                    res.send({ data: data  });

                    const rainyArr = data.list.filter(day => day.weather[0].main==='Rain')
                    const rainyDays = rainyArr.map(day =>   day.dt_txt.slice(0,10))
                    const unique = [...new Set(rainyDays)];
                    const firstDayOfRain = unique[0];

                    const transporter = nodemailer.createTransport({
                         service: 'gmail',
                         auth: keys.auth
                    });
                    const message1 = `It's going to rain today! Also it will be raining on:  ${unique.map( day => ' ' + day )}. Do not forget your umbrella!☔`
                    const message2 = `It's going to rain today! Do not forget your umbrella!☔`
                    const message = rainyDays.length > 1 ? message1 : message2


                    const mailOptions = {
                      from: 'polina@iwoork.com', // sender address
                      to: emails, // list of receivers
                      subject: 'Rain alert☂', // Subject line
                      html:  message
                    };
                        new CronJob('* * * * * 1', function() {
                            // if(firstDayOfRain==today) {
                                if(true) {
                              transporter.sendMail(mailOptions, function (err, info) {
                                 if(err)
                                   console.log(err)
                                 else
                                   console.log(info);
                              });
                            }
                        }, null, true, 'America/Los_Angeles');

                  })
                  .catch(err => {
                     res.redirect('/error');
                  });

        });



        })
}
