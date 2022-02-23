
const Calendar = {
  events: [],
  createEvent(name, date, callback) {
    const event = {
      name,
      date,
      callback,
      changeExicutionTime: function (date) {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => callback(), date.getTime() - Date.now());
      }
    }
    Object.defineProperty(event, '_timeout', {
      value: setTimeout(() => callback(), date.getTime() - Date.now()),
      writable: true,
      configurable: false,
      enumerable: false,
      get() {
        return undefined
      }
    });
    this.events.push(event);
  },
  getEvent(name) {
    return this.events.find((event) => event.name === name);
  },
  getAllEvents() {
    return this.events;
  }
}

// class Calendar {
//   constructor() {
//     this._events = []
//   }
//   getWeekFromDate(date) {
//     const firstJan = new Date(date.getFullYear(), 0, 1);
//     const numbOfDays = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
//     const numOfWeeks = Math.ceil(numbOfDays / 7);
//     return numOfWeeks;
//   }
//   addEvent(event) {
//     if (event instanceof Event) {
//       this._events.push(event);
//     } else {
//       throw 'Incorrect object tried to add to the calendar';
//     }
//   }
//   deleteEvent(eventToDelete) {
//     return this._events = this._events.filter((event) => JSON.stringify(event) !== JSON.stringify(eventToDelete));
//   }
//   getEventsByYear(from, to) {
//     return this._events.filter((event) => event.date.getFullYear() >= from && event.date.getFullYear() <= to);
//   }
//   getEventsByMonth(from, to) {
//     return this._events.filter((event) => event.date.getMonth() >= from && event.date.getMonth() <= to)
//   }
//   getEventsByWeek(from, to) {
//     return this._events.filter((event) => this.getWeekFromDate(event.date) >= from && this.getWeekFromDate(event.date) <= to)
//   }
//   get events() {
//     return this._events;
//   }
// }
// class Event {
//   constructor(name, date, callback) {
//     this.name = name,
//       this.date = date,
//       this.callback = callback,
//       this.state = this.getDateDiff(date) < 0 ? 'overdue' : 'active',
//       this.eventActivation = this.setEventActivation();
//     this.eventActivation(date, callback);
//   }
//   getDateDiff(date) {
//     return date.getTime() - Date.now();
//   }
//   setEventActivation() {
//     let timeout;
//     return function (date, callback) {
//       const dateDiff = this.getDateDiff(date);
//       if (dateDiff > 0) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//           callback();
//           return this.state = 'overdue';
//         }, dateDiff);
//       }
//     }
//   }
//   changeEventDate(date) {
//     if (!date instanceof Date) {
//       throw 'Incorrect date param';
//     }
//     this.date = date;
//     this.eventActivation(date, this.callback)
//   }
//   changeEventName(name) {
//     this.name = name;
//   }
//   deleteEvent() {
//     return this = null;
//   }
// }