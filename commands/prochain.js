const { Embed } = require('../attiog')

module.exports = {
    name: 'prochain',
    description: 'tu peux avoir le proochain cours!',
    usage: 'prochain <TD> <TP>',
    needArgs: 2,
    execute(message, args) {
        if(isNaN(args[0]) || isNaN(args[1]))
            return message.channel.send(Embed.error('Les arguments doivent être sous la forme TD TP\nPar exemple 1 1'))

        let groupe = this.computeGroup(args[0], args[1])

        if(groupe > 3170 || groupe < 3163)
            return message.channel.send(Embed.error('Ce groupe n\'eziste pas 😥'))

        let closest = { date: Infinity, event: null }
        let now = new Date()
        require('ical').fromURL(`https://edt.univ-nantes.fr/iut_nantes/g${groupe}.ics`, {}, function (err, data) {
            for (let k in data) {
                if (data.hasOwnProperty(k)) {
                    var ev = data[k];
                    if (data[k].type == 'VEVENT') {
                        let date = Date.parse(ev.start);
                        if(date >= now && (date < new Date(closest.date) || date < closest.date))
                            closest = {
                                date: date,
                                event: ev
                            }
        
                    }
                }
            }
            if(closest.event != null) message.channel.send(Embed.info('Prochain cours : \n' + closest.event.description))
        })
    },
    computeGroup(td, tp) {
        let base = 3162
        return base + td * 2 + tp * 1 - 2
    }
}