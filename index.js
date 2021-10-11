const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs');
const execute = require('./execute');

const app = express();
const port = 3000;
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/execute', async (req, res) => {
    var data = await execute.execute(req.body.code);
    res.send(`data: ${data}`);
});

app.post('/add', async (req, res) => {
    var code = req.body.code;
    var text = fs.readFileSync( './custom/custom.js', 'utf8' );
    code = code + '//@@NewFunction@@ \n';
    text = text.replace('//@@NewFunction@@', code);
    fs.writeFileSync('./custom/custom.js',text, 'utf8')
    res.send(`Added`);
});

app.listen(port, () => console.log(`listening on port ${port}!`));