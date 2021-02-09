const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

app.get('/', (req, res) => {
  res.render('index');

});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  if(cityName) {
    res.status(200);
    res.end(cityName);
  } else {
    res.status(400);
    res.end("Nothing Found");
  }
});

app.listen(PORT, () => {
  console.log(`HackYourTemperature app running at http://localhost:${PORT}`);
});
