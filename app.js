const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const cors = require('cors')
const keys = require('./keys');
require('./models/User');
require('./routes/subscribe')(app);
require('./routes/weather')(app);




app.use(cors())

app.get('/subscribe/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/', (req, res) => res.send('Hello !'))


mongoose.connect(keys.mongoUri, { useNewUrlParser: true });


////MONGOOSE

















  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
