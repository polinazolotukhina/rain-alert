const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const keys = require('./keys');
require('./routes/ksenia')(app);
require('./routes/weather')(app);

require('./models/User')



app.get('/', (req, res) => res.send('Hello !'))


mongoose.connect(keys.mongoUri, { useNewUrlParser: true });


////MONGOOSE

















  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
