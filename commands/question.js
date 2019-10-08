const { Voice } = require('../attiog')

module.exports = {
    name: 'question',
    description: 'pose moi une question j\'essayerais d\'y répondre',
    usage: 'question <Question>',
    needArgs: -1,
    execute(message, args) {
        let msg = message.channel.send(Voice.messaging.embed("Laisse moi reflechir 🤔"))
        setTimeout(() => msg.edit('', Voice.messaging.embed(this.pickAnswer())), 5000)
    },
    pickAnswer() {
        let answers = [
            'ui ui, ça me semble correct',
            'non, non ce n\'est pas ça, tu modélises mal',
            'je ne sais pas, essaie tu verras'
        ]
        return answers[Math.floor(Math.random() * Math.floor(answers.length))]
    }
}