// 'esversion: 6';
const calendar = (function () {
  const calendarObj = {
    // STANDART EVENT
    events: [],
    getStringifiedEvent(event) {
      return JSON.stringify(event, function (key, value) {
        if (typeof value === 'function') {
          return value.toString();
        }
        return value;
      });
    },
    getParsedEvent(event) {
      return JSON.parse(event, function (key, value) {
        if (key === 'callback') {
          return eval(value);
        } else if (key === 'date') {
          return new Date(value);
        }
        return value;
      });
    },
    createEvent(name, date, callback) {
      const alreadySettledEvent = this.events.find(event => event.id === name);
      if (alreadySettledEvent) {
        alreadySettledEvent.date = date;
        alreadySettledEvent.callback = callback;
        return;
      }
      const event = {
        id: name,
        name,
        date,
        callback
      };
      Object.defineProperty(event, '_timeout', {
        value: setTimeout(() => callback(), date.getTime() - Date.now()),
        writable: true,
        configurable: false,
        enumerable: false,
      });
      this.events.push(event);
    },
    getEvent(name) {
      const foundedEvent = this.events.find((event) => event.id === name);
      if (!foundedEvent) {
        return null;
      }
      return {
        event: this.getParsedEvent(this.getStringifiedEvent(foundedEvent)),
        changeExicutionTime: (date) => {
          clearTimeout(foundedEvent._timeout);
          const dateDiff = date.getTime() - Date.now();
          if (dateDiff > 0) {
            foundedEvent._timeout = setTimeout(() => foundedEvent.callback(), date.getTime() - Date.now());
            foundedEvent.date = date;
          }
          return this.getParsedEvent(this.getStringifiedEvent(foundedEvent));
        },
        editEventName: (name) => {
          foundedEvent.name = name;
          return this.getParsedEvent(this.getStringifiedEvent(foundedEvent));
        },
        deleteEvent: () => {
          clearTimeout(foundedEvent._timeout);
          this.events = this.events.filter((event) => event !== foundedEvent);
          return;
        }
      };
    },
    getAllEvents() {
      return this.getParsedEvent(this.getStringifiedEvent(this.events));
    },
    getEventsByYear(from, to) {
      const eventsByYear = this.events.filter((event) => event.date.getFullYear() >= from && event.date.getFullYear() <= to);
      console.log(eventsByYear);
      return {
        events: eventsByYear,
        getEventsByMonth(from, to) {
          const eventsByMonth = eventsByYear.filter((event) => event.date.getMonth() >= from && event.date.getMonth() <= to);
          eventsByMonth.forEach(event => {
            event.date = new Date(event.date);
          });
          return {
            events: eventsByMonth,
            getEventsByWeek(from, to) {
              function getWeekNumber(date) {
                const firstJan = new Date(date.getFullYear(), 0, 1);
                const amountOfDays = Math.floor((date - firstJan) / (1000 * 60 * 60 * 24));
                const currentWeek = Math.ceil(amountOfDays / 7);
                return currentWeek;
              }
              const eventsByWeek = from && to ? eventsByMonth.filter((event) => getWeekNumber(event.date) >= from && getWeekNumber(event.date) <= to) : eventsByMonth;
              eventsByWeek.forEach(event => {
                event.date = new Date(event.date);
              });
              return {
                events: eventsByWeek,
                getEventByWeekDay(from, to) {
                  const eventsByWeekDay = eventsByWeek.filter((event) => event.date.getDay() >= from && event.date.getDay() <= to);
                  eventsByWeekDay.forEach(event => {
                    event.date = new Date(event.date);
                  });
                  return {
                    events: eventsByWeekDay
                  };
                }
              };
            },
            getEventsByMonthDay(from, to) {
              const eventsByMonthDay = eventsByMonth.filter((event) => event.date.getDate() >= from && event.date.getDate() <= to);
              eventsByMonthDay.forEach(event => {
                event.date = new Date(event.date);
              });
              return { events: eventsByMonthDay };
            }
          };
        }
      };
    },

    // REPEATING EVENT
    repEvents: [],
    createRepeatingEvent(name, dayOfTheWeek, callback) {
      const alreadyCreatedEvent = this.repEvents.find((repEvent) => repEvent.id === name);
      if (alreadyCreatedEvent) {
        alreadyCreatedEvent.dayOfTheWeek = dayOfTheWeek;
        alreadyCreatedEvent.callback = callback;
        return;
      }
      const eventObj = {
        id: name,
        name,
        dayOfTheWeek,
        callback
      };
      this.repEvents.push(eventObj);
      const currentDate = new Date();
      if (currentDate.getDay() === dayOfTheWeek) callback();
      const nextDay = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
      const startOfTheNextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
      setTimeout(() => {
        if (currentDate.getDay() === dayOfTheWeek) callback();
        setInterval(() => {
          if (currentDate.getDay() === dayOfTheWeek) callback();
        }, 1000 * 60 * 60 * 24);
      }, startOfTheNextDay - currentDate);
    },
    getRepeatingEvent(name) {
      const foundedEvent = this.repEvents.find(repEvent => repEvent.id === name);
      console.log('olololol');
      if (foundedEvent) {
        return {
          event: this.getParsedEvent(this.getStringifiedEvent(foundedEvent)),
          changeRepEventName: (name) => {
            foundedEvent.name = name;
            return this.getParsedEvent(this.getStringifiedEvent(foundedEvent));
          },
          deleteRepEvent: () => {
            this.events.filter(event => event.id !== name);
          }
        };
      }
      return null;
    }
  };

  // LOCAL STORAGE SAVE
  window.onbeforeunload = () => {
    if (calendarObj.events.length) {
      localStorage.setItem('calendar-events', calendarObj.getStringifiedEvent(calendarObj.events));
    }
  };
  // TAKING EVENTS FROM LOCAL STORAGE
  let eventsFromLocal = localStorage.getItem('calendar-events') ? JSON.parse(localStorage.getItem('calendar-events')) : null;
  if (eventsFromLocal && Array.isArray(eventsFromLocal)) {

    eventsFromLocal.forEach(event => {
      event.callback = eval(event.callback);
      event.date = new Date(event.date);
    });
    calendarObj.events = eventsFromLocal;
    calendarObj.events.forEach(event => {
      const dateDiff = event.date.getTime() - Date.now();
      if (dateDiff > 0) {
        return event._timeout = setTimeout(() => event.callback(), dateDiff);
      }
    });

  }

  // ------
  const myCalendar = {
    events: {
      getEvent(name) {
        return calendarObj.getEvent(name);
      },
      getAllEvents() {
        return calendarObj.getAllEvents();
      },
      createEvent(name, date, callback) {
        return calendarObj.createEvent(name, date, callback);
      },
      getEventsByYear(from, to) {
        return calendarObj.getEventsByYear(from, to);
      }
    },
    repEvents: {
      createRepeatingEvent(name, dayOfTheWeek, callback) {
        return calendarObj.createRepeatingEvent(name, dayOfTheWeek, callback);
      },
      getRepeatingEvent(name) {
        return calendarObj.getRepeatingEvent(name);
      }
    }

  };

  Object.defineProperties(myCalendar, {
    events: {
      writable: false
    },
    repEvents: {
      writable: false
    }
  });
  Object.defineProperties(myCalendar.events, {
    getEvent: {
      writable: false
    },
    getAllEvents: {
      writable: false
    },
    createEvent: {
      writable: false
    },
    getEventsByYear: {
      writable: false
    }
  });
  Object.defineProperties(myCalendar.repEvents, {
    createRepeatingEvent: {
      writable: false
    },
    getRepeatingEvent: {
      writable: false
    }
  });
  return myCalendar;
})();