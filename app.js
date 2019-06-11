const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch');
const nodemailer = require("nodemailer");
const keys = require('./keys');




app.get('/', (req, res) => res.send('Hello !'))

//EXAMPLE :     localhost:3000/weather?city=portland

app.get('/weather', (req, res) => {
    const city = req.query.city;
    const apiKey = '0b8dfeae418b1ea19aadab0e047c1613';

    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keys.apiKey}`
      fetch(url)
          .then(res => res.json())
          .then(data => {
             res.send({ data: data  });

            const rainyArr = data.list.filter(day => day.weather[0].main==='Rain')
            const rainyDays = rainyArr.map(day => " "+ day.dt_txt.slice(0,10))
            const unique = [...new Set(rainyDays)];

             var transporter = nodemailer.createTransport({
                 service: 'gmail',
                 auth: keys.auth
                });

                const mailOptions = {
                  from: 'polina@iwoork.com', // sender address
                  to: 'polina@iwoork.com', // list of receivers
                  subject: 'Rain alert☂', // Subject line
                  html: `It's going to rain on: ${unique}. Do not forget your umbrella!☔`

                };

                if(unique.length > 0) {
                    transporter.sendMail(mailOptions, function (err, info) {
                       if(err)
                         console.log(err)
                       else
                         console.log(info);
                    });
                }

          })
          .catch(err => {
             res.redirect('/error');
          });
    })






  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
