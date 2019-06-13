const fs = require('fs');
const chalk = require('chalk');

//Add notes.
const addNote = (title, body) => {
   const notes = loadNotes();

   // duplicate handling.
   const duplicateTitles = notes.find((note) => note.title === title);

   if(!duplicateTitles) {
        notes.push({
            title: title,
            body : body
        });     
        saveNotes(notes);
   } else {
       console.log('Title already taken.');
   }
}

//Remove
const removeNotes = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter((note) =>  note.title != title);

    if(updatedNotes.length === notes.length) {
        console.log(chalk.red.inverse("No note found!"));
    } else {
        saveNotes(updatedNotes);
        console.log(chalk.green.inverse("Note removed!"));
    }
}

//List the notes.
const listNotes = () => {
    const list = loadNotes();
    
    console.log(chalk.magenta("Your notes:"));

    list.forEach((note) => console.log(note.title));
}

//Read the notes.

const readNotes = (title) => {
    const notes = loadNotes();

   const note = notes.find((note) => note.title === title);
   
   if(note) {
       console.log(chalk.bold.green(note.title));
       console.log(note.body);
   } else {
       console.log(chalk.red.inverse("No note found with the given title."));
   }
}

// save notes.
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

// To avoid overwriting the existing data.
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON   = dataBuffer.toString();
        return JSON.parse(dataJSON); 
    } catch(e) {
        return [];
    }
}



module.exports = {
    addNote: addNote,
    removeNotes : removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
} 