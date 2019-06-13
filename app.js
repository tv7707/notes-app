const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//Customize yargs

yargs.command({
    command : 'add',
    describe: 'Add a new note',
    builder: {
        title : {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body : {
            describe: 'Body of the title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    }
});

yargs.command({
    command : 'remove',
    describe: 'Remove the note',
    builder: {
        title: {
            describe : "Remove the title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        notes.removeNotes(argv.title);
    }
});

yargs.command({
    command : 'list',
    describe: 'List all the notes',
    handler: () => {
      notes.listNotes();  
    }
})

yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
       notes.readNotes(argv.title);
    }
})
//console.log(yargs.argv);
yargs.parse();