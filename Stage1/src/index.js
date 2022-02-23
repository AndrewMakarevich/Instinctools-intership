const calendar = (function () {
  const calendarObj = {
    events: [],
    createEvent(name, date, callback) {
      if (this.events.find(event => event.name === name)) {
        throw 'Event with such name is already exists'
      }
      const event = {
        name,
        date,
        callback
      }
      // const firstBreck = callback.toString().indexOf('{');
      // const secBreck = callback.toString().lastIndexOf('}');
      // console.log(callback.toString().slice(firstBreck + 1, secBreck))
      Object.defineProperty(event, '_timeout', {
        value: setTimeout(() => callback(), date.getTime() - Date.now()),
        writable: true,
        configurable: false,
        enumerable: false,
      });
      this.events.push(event);
      // console.log(this.events);

      // const stringifiedEvents = this.events.map(event => {
      //   return JSON.stringify(event, function (key, value) {
      //     if (typeof value === 'function') {
      //       return value.toString();
      //     }
      //     return value;
      //   });
      // });
      // localStorage.setItem('calendar-events', JSON.stringify(stringifiedEvents));
    },
    getEvent(name) {
      const foundedEvent = this.events.find((event) => event.name === name);
      if (!foundedEvent) {
        return null;
      }
      function createEventCopy(eventObj) {
        const event = JSON.parse(JSON.stringify(eventObj));
        event.date = new Date(event.date);
        return event;
      }

      return {
        event: createEventCopy(foundedEvent),
        changeExicutionTime: function (date) {
          clearTimeout(foundedEvent._timeout);
          foundedEvent._timeout = setTimeout(() => foundedEvent.callback(), date.getTime() - Date.now());
          return createEventCopy(foundedEvent);
        },
        editEventName(name) {
          foundedEvent.name = name;
          return createEventCopy(foundedEvent);
        },
        deleteEvent: () => {
          clearTimeout(foundedEvent._timeout);
          this.events = this.events.filter((event) => event !== foundedEvent);
          return;
        }
      }
    },
    getAllEvents() {
      return JSON.parse(JSON.stringify(this.events));
    },
    getEventsByYear(year) {
      const eventsByYear = JSON.parse(JSON.stringify(this.events.filter((event) => event.date.getFullYear() === year)));
      eventsByYear.forEach(event => {
        event.date = new Date(event.date);
      });
      return {
        events: eventsByYear,
        getEventsByMonth(month) {
          const eventsByMonth = eventsByYear.filter((event) => event.date.getMonth() === month);
          eventsByMonth.forEach(event => {
            event.date = new Date(event.date);
          });
          return {
            events: eventsByMonth,
            getEventsByWeek(week) {
              function getWeekNumber(date) {
                const firstJan = new Date(date.getFullYear(), 0, 1);
                const amountOfDays = Math.floor((date - firstJan) / (1000 * 60 * 60 * 24));
                const currentWeek = Math.ceil(amountOfDays / 7);
                return currentWeek;
              };
              const eventsByWeek = week ? eventsByMonth.filter((event) => getWeekNumber(event.date) === week) : eventsByMonth;
              eventsByWeek.forEach(event => {
                event.date = new Date(event.date);
              });
              return {
                events: eventsByWeek,
                getEventByWeekDay(day) {
                  const eventsByWeekDay = eventsByWeek.filter((event) => event.date.getDay() === day);
                  eventsByWeekDay.forEach(event => {
                    event.date = new Date(event.date);
                  });
                  return {
                    events: eventsByWeekDay
                  }
                }
              }
            },
            getEventsByMonthDay(day) {
              const eventsByMonthDay = eventsByMonth.filter((event) => event.date.getDate() === day);
              eventsByMonthDay.forEach(event => {
                event.date = new Date(event.date);
              });
              return { events: eventsByMonthDay }
            }
          }
        }
      }
    }
  }
  // let events = localStorage.getItem('calendar-events') ? JSON.parse(localStorage.getItem('calendar-events')) : undefined;
  // // const te = JSON.parse("[{a:123}]");


  // if (events && Array.isArray(events)) {
  //   events = events.map(event => {
  //     event = JSON.parse(event, function (key, value) {
  //       if (key === 'callback') {
  //         return new Function(value);
  //       }
  //       return value
  //     });
  //     event.date = new Date(event.date);
  //     return event;
  //   });
  //   console.log(events);
  //   calendarObj.events = events;
  // }
  const myCalendar = {
    getEvent(name) {
      return calendarObj.getEvent(name);
    },
    getAllEvents() {
      return calendarObj.getAllEvents();
    },
    createEvent(name, date, callback) {
      return calendarObj.createEvent(name, date, callback)
    },
    getEventsByYear(year) {
      return calendarObj.getEventsByYear(year);
    }
  }
  return myCalendar;
})();



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