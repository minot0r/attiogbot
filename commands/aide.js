const { Voice } = require('../attiog')

module.exports = {
    name: 'aide',
    description: 'affiche ce menu',
    usage: 'aide',
    needArgs: 0,
    execute(message, args) {
        let commands = ''
        for(command of message.client.commands.array())
            commands += ' ' + command.name + ' : ' + command.description + '\n\t' + command.usage + '\n'

        message.channel.send(Voice.messaging.embed('Il eziste plusieurs commandes : \n' + commands))
    }
}