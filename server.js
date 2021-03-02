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

var notes = []
 notes = fs.readFileSync('./db/db.json',  "utf8");
 notes = JSON.parse(notes);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'notes.html'))

   
})

for (let i = 0; i < notes.length; i++){
     if (notes[i].title.length < 0){
         console.log('hdjsakd');
     }
 } 

 

app.use('/public/assets', express.static(path.join(__dirname, '/public/assets')));
app.use('/db', express.static(path.join(__dirname, '/db')));
app.get('/api/:notes?', function(req, res) {
    
    let selected = req.params.notes;

    
      for (let j = 0; j < selected.length; i++){
        console.log(selected[j]);
        if(selected[j]){
            for (var i = 0; i < notes.length; i++) {
               if (selected[j] ===notes[i].id){
                return res.json(notes[i]);
                   
               }
           }
       
           res.send('No note found');   
           }else{
               return res.json(notes);
           }
    }
  
    
    
    
    

    

})

app.post('/delete/:notes?', function(req, res){
    let deleted = req.params.notes;
    notes = fs.readFileSync('./db/db.json',  "utf8");
 notes = JSON.parse(notes);

 for (let i = 0; i < notes.length; i++){
     if (notes[i].id === deleted){
        
         notes.pop(notes[i]);
         fs.writeFile('./db/db.json', JSON.stringify(notes), function(err, results){
         
        });
         return console.log(notes);
     }
 }

})
app.post('/api/new/', function(req, res) {
    notes = fs.readFileSync('./db/db.json',  "utf8");
 notes = JSON.parse(notes);
    
    var newNote = req.body;


   
    
     for (let i = 0; i < notes.length; i++){
         if (notes[i].id === newNote.id){
            notes.pop(notes[i]);
         }

     }
      notes.push(newNote);
    res.json(newNote);
     fs.writeFile('./db/db.json', JSON.stringify(notes), function(err, results){
         
     });
})
app.listen(PORT, function(){
    console.log('listening on port ' + PORT);
})