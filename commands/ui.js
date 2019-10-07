const { Responses, Embed } = require('../attiog')

module.exports = {
    name: 'ui',
    description: 'ui ui, c\'est ça',
    needArgs: 1,
    execute(message, args) {
        if(!isNaN(args[0]) && args[0] < 500)
            message.channel.send('ui '.repeat(args[0]))
        else
            message.reply(Embed.error(Responses.commandError))
    }
}