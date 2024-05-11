const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(helmet());
app.use(cors());

// sync db
const db = require('./config/db.config');
db.sync({ force: false }).then(() => {
    console.log('Database connected');
});

app.use(express.static('dist'))
app.use('/api', require('./router'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

