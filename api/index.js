const router = require('./router');
const keys = require('./keys');

//EXPRESS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json())
const port = keys.port || 3000;

app.listen(port, () => console.log(`listening on http://localhost:${port}`));

app.get('/', (req, res)=>{
    res.send('Hi');
});

app.use('/values', router)









