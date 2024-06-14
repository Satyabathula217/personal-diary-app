const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let entries = [];

app.get('/', (req, res) => {
  res.render('index', { entries: entries });
});

app.post('/add', (req, res) => {
  const newEntry = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString(),
    content: req.body.entryContent
  };
  entries.push(newEntry);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const entryIdToDelete = req.body.entryId;
  entries = entries.filter(entry => entry.id !== entryIdToDelete);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
