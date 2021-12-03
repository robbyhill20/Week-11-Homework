const fs = require('fs');
const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// `GET *` should return the `index.html` file.
app.get('*', (req, res) => res.redirect('/index.html'));

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/index.html'))
);

// GET /notes` should return the `notes.html` file.
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'db/db.json'))
);

app.post('/api/notes',(req,res) => 
fs.readFile(path.join(__dirname,'db/db.json'), 'utf8', function(err, data){
    if (err){
        console.log(err);
    }
    const input =JSON.parse(data);
    const inputReq= req.body
    const entry = {
        title: inputReq.title,
        text: inputReq.text,
        
    };
    input.push(entry)
    fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(input, null, 2), function(err) {
        if (err) throw err;
        res.json('successful')
    })
    
})
)

app.listen(PORT, function() {
    console.log(`Server is listening on PORT: http://localhost:${PORT}`);
 });

