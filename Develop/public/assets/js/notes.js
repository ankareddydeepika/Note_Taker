
fs.readFile("./db/db.json", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  console.log(data);

});

readdata()
const notesArray = {
    title: "Test hj",
    text: "Test textjj"
}
const jsonString = JSON.stringify(notesArray)
fs.writeFile("./db/db.json", jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    

module.exports = notesArray;