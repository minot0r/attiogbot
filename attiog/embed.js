const { RichEmbed } = require('discord.js')

const error = function(text) {
    new RichEmbed()
        .setTitle('Attiogbot')
        .setDescription(text)
        .setColor(0xF9423A)
        .setFooter('Attiogbot © INFO GPE 1')
}

const info = function(text) {
    new RichEmbed()
        .setTitle('Attiogbot')
        .setDescription(text)
        .setColor(0x0072CE)
        .setFooter('Attiogbot © INFO GPE 1')
}

module.exports = {
    error,
    info
}