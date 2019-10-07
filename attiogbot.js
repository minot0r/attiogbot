const { Client, Collection } = require('discord.js') // Prends Client et Collection dans la librarire Discord.js 😄
const client = new Client() // Créée un nouveau Client
client.commands = new Collection() // Créée une nouvelle Collection de commandes

const { Voice, Config, CommandLoader, Responses, Jaro } = require('./attiog') // Prends nos propres modules : Voice, Config, CommandLoader, Responses, Jaro
Voice.log("Chargement...")
CommandLoader(client) // Charge les commandes

client.once('ready', () => Voice.log("Je suis prêt 😄"))

client.on('message', message => {
    if(!message.content.startsWith(Config.prefix) || message.author.bot) return

    const args = message.content.slice(Config.prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(!client.commands.has(command)) return message.reply(Responses.commandDoesNotExist(Jaro(command, client.commands.keyArray())))
    if(client.commands.get(command).needArgs != args.length) return message.reply(Responses.argsError(client.commands.get(command).needArgs))

    try {
        client.commands.get(command).execute(message, args)
    } catch(error) {
        Voice.error(error)
        message.reply(Responses.error)
    }

})

client.login(Config.token)