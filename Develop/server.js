var express = require("express");
var path = require("path");
const { v4: uuidv4 } = require('uuid');
//uuidv4();

var fs = require("fs");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function (error, data) {

    if (error) {
      return res.status(404).send();
    }

    return res.json(JSON.parse(data))

  });

});

app.post("/api/notes", function (req, res) {

  var newnotes = req.body;
  newnotes.id = uuidv4();

  fs.readFile("db/db.json", "utf8", function (error, data) {

    if (error) {
      return res.status(404).send();
    }

    var previousdata = JSON.parse(data);

    previousdata.push(newnotes);
    const convert = JSON.stringify(newnotes);
    const jsonString = JSON.stringify(previousdata)
    fs.writeFile("db/db.json", jsonString, err => {
      if (err) {
        return res.status(404).send();
      }
      else {
        return res.json(JSON.parse(convert))

      }
    })
  });
  
});

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
  //This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
  //you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.delete("/api/notes/:id", function(req, res){
  
  var deletenotes = req.params.id

  fs.readFile("db/db.json", "utf8", function(error, data){
    if(error){
      return res.status(204).send();
    }

    var dbdata = JSON.parse(data);

    var filterdata = dbdata.filter((note) => {return deletenotes !== note.id})
    const jsonString = JSON.stringify(filterdata)
    fs.writeFile("db/db.json", jsonString, err =>{
      if(err){
        return res.status(204).send();
      }
      else{
        return res.status(200).send();
      }
    })
    
  })
})


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});





app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});