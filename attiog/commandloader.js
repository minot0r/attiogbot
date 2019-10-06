const fs = require('fs')

const load = function(client) {
    let commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'))

    for(const file of commandFiles)
        client.commands.set(require(`../commands/${file}`).name, require(`../commands/${file}`))
}

module.exports = load