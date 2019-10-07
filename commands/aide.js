module.exports = {
    name: 'aide',
    description: 'affiche ce menu',
    needArgs: 0,
    execute(message, args) {
        let commands = ''
        for(command of message.commands.keyArray())
            commands += command + '\n'

        message.reply('Il ezist plusieurs commandes : \n' + commands)
    }
}