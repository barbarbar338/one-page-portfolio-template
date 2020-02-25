const express = require("express");
const handlebars  = require('express-handlebars');
const url = require('url');
const app = express();
const config = require("./config.json");

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
  res.render("index", {
    config: config,
    song: config.song_embeds[Math.floor(Math.random() * config.song_embeds.length)],
  })
})

app.get('/error', (req, res) => {
  res.render('error', {
    config: config,
    statuscode: req.query.statuscode,
    message: req.query.message,
  });
});

app.use((req, res) => {
  res.redirect(url.format({
    pathname: '/error',
    query: {
      statuscode: 404,
      message: 'Page Not Found!'
    }
  }))
})

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});