const fs = require('fs');

// fs.writeFileSync('Notes.txt', 'created by node');

fs.appendFileSync('Notes.txt', '\nNext data added');