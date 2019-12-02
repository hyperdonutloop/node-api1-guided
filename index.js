const express = require('express');

const db = require('./data/hubs-model.js'); // 1.import database file

const server = express();

server.use(express.json()); // needed to parse JSON from the body

server.get('/', (req, res) => {
  res.send( {api: 'up and running'})
})

// list of hubs GET /hubs
server.get('/hubs', (req, res) => {
  //get list of hubs from database
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
  })
  .catch(error => {
    console.log('error on GET /hubs', error);
    res.status(500).json({errorMessage: 'error getting list of hubs from database'})
  })
})

// add a hub
server.post('/hubs', (req, res) => {
  // get data the client sent
  const hubData = req.body; //express does not know how to parse JSON

  // call the db and add the hub
  db.add(hubData)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
    console.log('error on GET /hubs', error);
    res.status(500).json({errorMessage: 'error getting list of hubs from database'})
  })
})
// remove a hub

// update a hub, passing id and changes

const port = 4000;
server.listen(port, () => 
  console.log(`\n API running on port ${port} **\n`)
);
