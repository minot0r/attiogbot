const { Embed } = require('../attiog')

module.exports = {
    name: 'aide',
    description: 'affiche ce menu',
    needArgs: 0,
    execute(message, args) {
        let commands = ''
        for(command of message.client.commands.array())
            commands += ' ' + command.name + ' : ' + command.description + '\n'

        message.channel.send(Embed.description('Il eziste plusieurs commandes : \n' + commands))
    }
}