const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const user = require('./api/user/user.router');
const recipe = require('./api/recipe/recipe.router');
const ingredient = require('./api/ingredient/ingredient.router');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB through mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// app.get('/', (req, res) => {
//   res.send('Server Says Hello!');
// });

app.get('/api/data', (req, res) => {
  res.json('{ "result": "true" }');
});

app.use('/api/user', user);
app.use('/api/recipe', recipe);
app.use('/api/ingredient', ingredient);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running on PORT: ${port}...`)
);
//
