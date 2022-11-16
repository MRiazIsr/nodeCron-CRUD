const express = require('express');
const app = express();
const routes = require('./src/Routes/Router');

app.use(express.json({limit : '50mb', extended: true}));
app.use('/', routes);

//404 errors handler 
app.use((req, res) => {
  res.status(404).send('Route Not Found');
});

app.listen(3001, () => console.log("3001"));
