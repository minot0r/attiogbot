const ical = require('ical')
const Course = require('./course')

let EDT = class EDT {
    constructor(group, date) {
        this.group = group
        this.date = date
    }

    build() {
        return new Promise((resolve, reject) => {
            ical.fromURL(`https://edt.univ-nantes.fr/iut_nantes/g${this.group}.ics`, {}, (err, data) => {
                if(err) return reject(err)
                this.courses = Object.values(data).filter((event) => event.type == 'VEVENT' && 
                    new Date(event.start).getDate() == new Date(this.date).getDate() && 
                    new Date(event.start).getMonth() == new Date(this.date).getMonth()).map(course => new Course(course))
                resolve(this)
            })
        })
    }

    getCourses() {
        return this.courses
    }

    getClosestCourse() {
        return this.courses.reduce((lastCourse, course) => {
            if(course.schedules.start >= new Date() 
                && (course.schedules.start <= lastCourse.schedules.start || lastCourse.schedules.start < new Date()))
                return course
            else return lastCourse
        }, this.courses[0])
    }
}

module.exports = EDT