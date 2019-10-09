const { RichEmbed } = require('discord.js')

const voice = {
    
    local: {
        info(message) {
            console.log(`\x1b[33m[Attiogbot]\x1b[37m ${message}`)
        },
        error(message) {
            console.log(`\x1b[31m[Erreur]\x1b[37m ${message}`)
        },
        log(message) {
            console.log(`\x1b[94m[AttiogDI]\x1b[37m ${message}`)
        }
    },

    messaging: {
        embed(text, isError = false) {
            return new RichEmbed()
                .setTitle('Attiogbot')
                .setDescription(text)
                .setColor(isError ? 0xF9423A : 0x0072CE)
                .setFooter('Attiogbot © 2020 INFO GPE 1')
        } 
    }

}

module.exports = voice