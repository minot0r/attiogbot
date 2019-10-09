let course = class Course {
    constructor(data) {
        this.schedules = {
            start: new Date(data.start),
            end: new Date(data.end)
        }
        this.type = data.summary.split('-')[0].trim()
        this.subject = data.summary.split('-')[1].trim().split(',')[0]
        this.studGroup = data.summary.split(',')[1].trim()
        this.professor = data.summary.split(',')[2].trim()
        this.location = data.location.replace(/^J-/, '')
    }
}

module.exports = course