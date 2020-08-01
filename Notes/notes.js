const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = loadNotes()

    //checking for duplicate titles
    // const duplicateTitle = notes.filter((note) => {
    //     return title === note.title
    // })
    // const duplicateTitle = notes.filter((note) => title === note.title)
    const duplicateTitle = notes.find(note => note.title === title)
    console.log('dupppp: ',  duplicateTitle);

    debugger

    if (!duplicateTitle) {
        notes.push({
            title: title,
            body: body
        })

        console.log(chalk.green.inverse.bold('new notes added!'))
        saveNotes(notes)
    } else {
        console.log(chalk.red.inverse.bold('Title already taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json' ,dataJson)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    }
}

const getNotes = () => {
    loadNotes().forEach(note => console.log(chalk.yellow(note.title)))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNote = notes.filter((note) => note.title !== title)

    if(notes.length > filteredNote.length) {
        console.log(chalk.green.inverse('Note has been removed...'))
        saveNotes(filteredNote)
    } else {
        console.log(chalk.red.inverse('No note with that title was found!'))
    }
}

const readNotes = (title) => {
    const note = loadNotes().find(n => n.title === title)

    if (!note) {
        console.log(chalk.red('Couldnot find'))
    } else {
        console.log(chalk.yellow.bold('title: ',note.title, ', body: ',note.body))
    }
}


module.exports = {
    addNotes: addNotes,
    getNotes: getNotes,
    removeNote: removeNote,
    readNotes: readNotes
}

