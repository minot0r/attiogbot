const { Voice, Jaro } = require('../attiog')

module.exports = {
    name: 'prochain',
    description: 'tu peux avoir le prochain cours!',
    usage: 'prochain aide',
    needArgs: -1,
    execute(message, args) {
        if(args.length == 0) message.channel.send(Voice.messaging.embed("Utilization : " + this.usage))
        else if(args.length == 1 && args[0] == "aide")
            message.channel.send(Voice.messaging.embed("prochain cours <TD> <TP>\nprochain jour <TD> <TP>"))
        else if(args.length == 3) {
            if(isNaN(args[1]) || isNaN(args[2]))
                return message.channel.send(Voice.messaging.embed('Les arguments doivent être sous la forme <TD> <TP>\nPar exemple 1 1', true))
            
            let group = this.computeGroup(args[0], args[1])

            if(group > 3170 || group < 3163)
                return message.channel.send(Voice.messaging.embed('Ce groupe n\'eziste pas 😥', true))

            if(args[0] == "cours")
                message.channel.send(Voice.messaging.embed(this.getClosestCourse(this.getGroupData(group))))
            else if(args[0] == "jour")
                message.channel.send(Voice.messaging.embed(this.getNextDay(this.getGroupData(group))))
            else
                message.channel.send(Voice.messaging.embed(`Cet argument n'existe pas, vouliez vous dire ${Jaro(args[0], ['cours', 'jour'])}`, true))
        }

        
    },
    computeGroup(td, tp) {
        let base = 3162
        return base + td * 2 + tp * 1 - 2
    },
    getGroupData(group) {
        require('ical').fromURL(`https://edt.univ-nantes.fr/iut_nantes/g${group}.ics`, {}, (err, data) => { return Object.values(data) })
    },
    getNextDay(data) {
        let edt = ''
        data.filter((event) => event.type == 'VEVENT').forEach((event) => {
            let date = {
                start: new Date(Date.parse(event.start)),
                end: new Date(Date.parse(event.end)),
                next: new Date()
            }
            date.next.setDate(date.next.getDate() + 1)
            
            if(date.start.getDate() == date.next.getDate() && date.start.getMonth() == date.next.getMonth())
                edt += `Heure : ${date.start.getHours()}h${date.start.getMinutes().toString().replace(/^[0-9]?$/, '0' + date.start.getMinutes())} => ${date.end.getHours()}h${date.end.getMinutes().toString().replace(/^[0-9]?$/, '0' + date.end.getMinutes())} - ${event.summary.split(',')[0]}\n`
        })
        return edt
    },
    getClosestCourse(data) {
        let closest = { date: Infinity, event: null }
        data.filter((event) => event.type == 'VEVENT').forEach((event) => {
            let date = {
                start: new Date(Date.parse(event.start)),
                end: new Date(Date.parse(event.end)),
                next: new Date()
            }
            
            if(date.start >= date.next && (date.start < closest.date || date.start < closest.start)) {
                closest.event = event  
                closest.date = date.start
            }     
        })
        return "Prochain cours : " + closest.event.summary + "\n" + closest.date.getHours + ":" + closest.date.start.getMinutes().toString().replace(/^[0-9]?$/, '0' + closest.date.start.getMinutes())
    }
}