const validator = require('./node_modules/validator');
const yargs = require('yargs');
const chalk = require('./node_modules/chalk');
const { argv } = require('yargs');
const notes = require('./notes');



// const getNotes = require('./notes.js')
// console.log(getNotes())
// console.log(validator.isEmail('shubham@banerjee.com'));
// console.log(validator.isURL('s.com'));

// console.log(chalk.green.inverse.bold('Success!'));
// console.log(process.argv);
// console.log(yargs.argv);
// yargs.version('1.1.0');



//creating an add command
yargs.command({
    command: 'add',
    describe: 'adding notes',
    builder: {
        title: {
            describe: 'Add title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body of add',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function()  {
        notes.addNotes(argv.title, argv.body)
    }
})

//creating remove notes
yargs.command({
    command: 'remove',
    describe: 'removing the notes',

    builder: {
        title: {
            describe: 'removing the notes with the specified title',
            demandOption: true,
            type: 'string'
        }
    },

    handler() {
        console.log(chalk.green.inverse.bold('removing the notes...'));
        notes.removeNote(argv.title)
    }
})

//listing notes
yargs.command({
    command: 'list',
    describe: 'list of notes',
    handler() {
        console.log('list of notes...')
        notes.getNotes()
    }
})

//reading
yargs.command({
    command: 'read',
    describe: 'reading notes',
    builder: {
        title: {
            describe: 'reading by title',
            demandOption: true,
            type: 'string'
        }
    },
    handler()  {
        notes.readNotes(argv.title)
    }
})


yargs.parse()