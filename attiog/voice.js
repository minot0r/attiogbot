const voice = class Voice {
    
    static log(message) {
        console.log(`\x1b[33m[Attiogbot]\x1b[37m ${message}`)
    }

    static error(message) {
        console.log(`\x1b[31m[Erreur]\x1b[37m ${message}`)
    }

}

module.exports = voice