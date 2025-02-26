require('dotenv').config();
const express = require('express')
const path = require('path');
const mongoDB = require('./db');
const app = express()
const port = process.env.PORT || 3000;
mongoDB();



app.use((req, res, next) => {
  // react app port number 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,auth-token, Accept');
  next();
});

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.use(express.json());
app.use('/api', require('./routes/createUser'));
app.use('/api', require('./routes/getData'));
app.use('/api', require('./routes/orderData'));
app.use('/api', require('./routes/fetchUserOrders'));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})
