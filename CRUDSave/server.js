const express = require('express');
const app = express();
const routes = require('./src/Routes/Router');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json({limit : '50mb', extended: true}));
app.use('/', routes);

//404 errors handler 
app.use((req, res) => {
  res.status(404).send('Route Not Found');
});

app.listen(process.env.PORT, () => console.log(process.env.PORT));
