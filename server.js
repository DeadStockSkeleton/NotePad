var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var path = require('path');
var PORT = 3000;
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/**json'}))
app.use(bodyParser.raw({type: 'application/vnd.custom-type'}))
app.use(bodyParser.text({type: 'text/html'}))


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'notes.html'))
})

var notes = fs.readFile('./db/db.json', function(req, res){
    return res;
});
app.use('/public/assets', express.static(path.join(__dirname, '/public/assets')));
app.use('/db', express.static(path.join(__dirname, '/db')));
app.get('/api/:notes?', function(req, res) {
    var selected = req.param.notes

    if(selected){
     for (var i = 0; i < notes.length; i++) {
        if (selected ===notes[i].title){
            res.json(notes[i]);
            return;
        }
    }

    res.send('No note found');   
    }else{
        res.json(notes);
    }

    

})
app.post('/api/new/', function(req, res) {
    
    var newNote = req.body;

    console.log(newNote);

    notes.push(newNote);
    res.json(newNote);
})
app.listen(PORT, function(){
    console.log('listening on port ' + PORT);
})