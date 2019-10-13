const readline = require('readline')
const { Client, Collection } = require('discord.js') // Prends Client et Collection dans la librarire Discord.js 😄
const client = new Client() // Créée un nouveau Client
client.commands = new Collection() // Créée une nouvelle Collection de commandes
client.cooldowns = new Collection() // Créée une nouvelle Collection de cooldowns
client.IO = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const { Voice, Config, CommandLoader, Responses, Jaro } = require('./attiog') // Prends nos propres modules : Voice, Config, CommandLoader, Responses, Jaro, Embed
Voice.local.info("Chargement...")
CommandLoader(client) // Charge les commandes

client.IO.setPrompt('\x1b[94m[>] ')
client.IO.pause()
client.IO.on('line', (line) => {
    Voice.local.log(line)
    client.IO.prompt()
})
client.IO.on('SIGINT', () => {
    Voice.local.log('Bye bye !')
    client.IO.close()
})

client.once('ready', () => {
    Voice.local.info("Je suis prêt 😄") 
    client.user.setActivity('ui aide', { type: 'WATCHING' })

    setTimeout(_ => {
        printTodaysEDT()
        setTimeout(() => printTodaysEDT(), 24 * 3600 * 1000)
    }, new Date(new Date().setHours(24)).setMinutes(00) - new Date())
    

    client.IO.prompt()
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

    if(commandObject.needArgs != args.length && commandObject.needArgs >= 0) return message.channel.send(Voice.messaging.embed(Responses.argsError(commandObject.needArgs) + `\nUtilization : ${Config.prefix}` + commandObject.usage, true))

    Voice.local.info(`Commande ${command} de l'utilisateur ${message.author.username}`)
    try {
        commandObject.execute(message, args)
        client.cooldowns.set(message.author.id, +(new Date()) + 3000);
        setTimeout(() => client.cooldowns.delete(message.author.id), 3000);

    } catch(error) {
        Voice.local.error(error)
        message.channel.send(Voice.messaging.embed(Responses.error, true))
    }

})

client.login(Config.token)

let printTodaysEDT = () => {
    client.guilds.forEach(guild => guild.channels.forEach(channel => {
        if(channel.name == "edt") require("./commands/prochain").getNextDay(3163).then(data => channel.send(Voice.messaging.embed(data)))
    }))
}