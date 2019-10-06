module.exports = {
    name: 'wui',
    description: 'wui wui, c\'est ça',
    needArgs: 1,
    execute(message, args) {
        if(!isNaN(args[0]) && args[0] < 500)
            message.channel.send('Wui' + 'i'.repeat(args[0]))
    }
}