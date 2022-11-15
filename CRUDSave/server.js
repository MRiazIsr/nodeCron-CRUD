const express = require('express');
const app = express();
const routes = require('./src/Routes/Router');

app.use(express.json());
app.use('/', routes);

//404 errors handler 
app.use((req, res) => {
  res.status(404).send('Route Not Found');
});

app.listen(5000, () => console.log("5000"));
