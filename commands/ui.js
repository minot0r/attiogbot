const { Responses, Voice } = require('../attiog')

module.exports = {
    name: 'ui',
    description: 'ui ui, c\'est ça',
    usage: 'ui <Nombre> (max 499)',
    needArgs: 1,
    execute(message, args) {
        if(!isNaN(args[0]) && args[0] < 500)
            message.channel.send('ui '.repeat(args[0]))
        else
            message.channel.send(Voice.messaging.embed(Responses.commandError, true))
    }
}