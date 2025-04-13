require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let urlDB = {};
app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  try {
    new URL(url);    
    const shorturl = Math.floor(Math.random() * 1000);
    urlDB[shorturl] = url;
    res.json({ original_url: url, short_url: shorturl})

  } catch (err) {
    res.json({ error: "invalid url" })
  }
});

app.get('/api/shorturl/:url', (req, res) => { 
    res.redirect(urlDB[req.params.url]);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
