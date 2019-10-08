const { Client, Collection } = require('discord.js') // Prends Client et Collection dans la librarire Discord.js 😄
const client = new Client() // Créée un nouveau Client
client.commands = new Collection() // Créée une nouvelle Collection de commandes
client.cooldowns = new Collection() // Créée une nouvelle Collection de cooldowns

const { Voice, Config, CommandLoader, Responses, Jaro } = require('./attiog') // Prends nos propres modules : Voice, Config, CommandLoader, Responses, Jaro, Embed
Voice.local.log("Chargement...")
CommandLoader(client) // Charge les commandes

client.once('ready', () => {
    Voice.local.log("Je suis prêt 😄") 
    client.user.setActivity('ui aide', { type: 'WATCHING'})
})

client.on('message', message => {
    if(!message.content.startsWith(Config.prefix) || message.author.bot) return

    if(client.cooldowns.has(message.author.id)) {
        let timeToWait = (client.cooldowns.get(message.author.id) - (+(new Date()))) / 1000

        return message.channel.send(Voice.messaging.embed(`Veuillez attendre encore ${timeToWait}s pour executer une autre commande`, true))
    }
    
    const args = message.content.slice(Config.prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(!client.commands.has(command)) return message.channel.send(Voice.messaging.embed(Responses.commandDoesNotExist(Jaro(command, client.commands.keyArray())), true))

    const commandObject = client.commands.get(command)

    if(commandObject.needArgs != args.length) return message.channel.send(Voice.messaging.embed(Responses.argsError(commandObject.needArgs) + `\nUtilization : ${Config.prefix}` + commandObject.usage, true))

    try {
        commandObject.execute(message, args)
        client.cooldowns.set(message.author.id, +(new Date()));
        setTimeout(() => client.cooldowns.delete(message.author.id), 3000);

    } catch(error) {
        Voice.local.error(error)
        message.channel.send(Voice.messaging.embed(Responses.error, true))
    }

})

client.login(Config.token)