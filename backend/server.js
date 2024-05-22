const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');

const memoryRouter = require('./router/memoryRouter.js');
const bookRouter = require('./router/bookRouter.js');
const peopleRouter = require('./router/peopleRouter.js');
const numenRouter = require('./router/numenRouter.js');
const database = require('./utils/database.js')

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true,
}));
const port = 3000;
const server = app.listen(port, () => {
  database.connect();
  console.log(`App running on port ${port}...`);
});

app.use('/memory', memoryRouter);
app.use('/book', bookRouter);
app.use('/people', peopleRouter);
app.use('/numen', numenRouter);

process.on('exit', () => {database.disconnect()})

