const { Voice, Jaro, EDT } = require('../attiog')

module.exports = {
    name: 'prochain',
    description: 'tu peux avoir le prochain cours!',
    usage: 'prochain aide',
    needArgs: -1,
    execute(message, args) {
        if(args.length == 0) message.channel.send(Voice.messaging.embed("Utilization : " + this.usage))
        else if(args.length == 1 && args[0] == "aide")
            message.channel.send(Voice.messaging.embed("prochain cours <TD> <TP>\nprochain jour <TD> <TP>\nprochain <Date> <TD> <TP>"))
        else if(args.length == 3) {
            if(isNaN(args[1]) || isNaN(args[2]))
                return message.channel.send(Voice.messaging.embed('Les arguments doivent être sous la forme <TD> <TP>\nPar exemple 1 1', true))
            
            let group = this.computeGroup(args[1], args[2])

            if(group > 3170 || group < 3163)
                return message.channel.send(Voice.messaging.embed('Ce groupe n\'eziste pas 😥', true))

            if(args[0] == "cours")
                this.getClosestCourse(group).then(data => message.channel.send(Voice.messaging.embed(data))) 
            else if(args[0] == "jour")
                this.getNextDay(group).then(data => message.channel.send(Voice.messaging.embed(data))) 
            else if(new Date(args[0]) != "Invalid Date")
                this.getNextDay(group, args[0]).then(data => message.channel.send(Voice.messaging.embed(data))) 
            else
                message.channel.send(Voice.messaging.embed(`Cet argument n'existe pas, vouliez vous dire ${Jaro(args[0], ['cours', 'jour'])}`, true))
        }

        
    },
    computeGroup(td, tp) {
        let base = 3162
        return base + td * 2 + tp * 1 - 2
    },
    getNextDay(group, date = new Date()) {
        new Promise((resolve, reject) => 
            new EDT(group, new Date(date)).build().then(edt => {
                let formattedText = ''
                for(let course of edt.getCourses()) {
                    let timeset = course.schedules
                    formattedText += `> **__${course.type}__ - ${course.subject}**\n
**Salle** : ${course.location}\n
**Prof** : ${course.professor}\n
**Groupe** : ${course.studGroup}\n
**Temps** : ${timeset.start.getHours()}h${timeset.start.getMinutes().toString().replace(/^[0-9]?$/, '0' + timeset.start.getMinutes())} ➮ ${timeset.end.getHours()}h${timeset.end.getMinutes().toString().replace(/^[0-9]?$/, '0' + timeset.end.getMinutes())}\n\n`
                }
                resolve(formattedText)
            })
        )
    },
    getClosestCourse(group) {
        new Promise((resolve, reject) => 
            new EDT(group, new Date(date)).build().then(edt => {
                let course = edt.getClosestCourse()
                let timeset = course.schedules
                resolve(`> **__${course.type}__ - ${course.subject}**\n
**Salle** : ${course.location}\n
**Prof** : ${course.professor}\n
**Groupe** : ${course.studGroup}\n
**Temps** : ${timeset.start.getHours()}h${timeset.start.getMinutes().toString().replace(/^[0-9]?$/, '0' + timeset.start.getMinutes())} ➮ ${timeset.end.getHours()}h${timeset.end.getMinutes().toString().replace(/^[0-9]?$/, '0' + timeset.end.getMinutes())}\n\n`)
            })
        )
    }
}