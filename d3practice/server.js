var express = require('express');
var http = require('http');
var fs = require('fs');
const app = express();
app.use("/static", express.static('./static/'));

var page = fs.readFileSync('index.html', 'utf8', function(err, data){
    console.log(data);
});

app.get('/', (req, res) => {
    res.send(page)
});

app.listen(8080, () => console.log('Listening on port 8080...'))