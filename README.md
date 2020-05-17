# Note Taker

Created an application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file.

## Criteria

Application allows users to create and save notes.

Application also allows user to view previously saved notes.

Application allows users to delete previously saved notes.


## To achive the above criteria

 1. Created the following HTML routes:

  GET `/notes` - returns the `notes.html` file.
  GET `*` - returns the `index.html` file.

2. Application have a `db.json` file on the backend that will be used to store and retrieve notes using `fs` module.

3. Created the following API routes:

GET `/api/notes` - Read the `db.json` file and return all saved notes as JSON.

POST `/api/notes` - Receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

DELETE `/api/notes/:id` - Receive a query parameter containing the id of a note to delete. 


![notetaker](./Assets/Note_Taker.gif)
 