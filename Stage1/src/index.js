// 'esversion: 6';
const calendar = new (function Calendar() {

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
      return this.getParsedEvent(this.getStringifiedEvent(foundedEvent));
    },
    getAllEvents() {
      return this.getParsedEvent(this.getStringifiedEvent(this.events));
    },
    getEventsByYear(from, to) {
      const eventsByYear = this.events.filter((event) => event.date.getFullYear() >= from && event.date.getFullYear() <= to);
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
    changeExicutionTime(eventName, date) {
      const foundedEvent = this.events.find(event => event.id === eventName);
      if (foundedEvent) {
        clearTimeout(foundedEvent._timeout);
        const dateDiff = date.getTime() - Date.now();
        if (dateDiff > 0) {
          foundedEvent._timeout = setTimeout(() => foundedEvent.callback(), date.getTime() - Date.now());
          foundedEvent.date = date;
        }
      }
    },
    editEventName(eventName, name) {
      const foundedEvent = this.events.find(event => event.id === eventName);
      if (foundedEvent) {
        foundedEvent.name = name;
        return this.getParsedEvent(this.getStringifiedEvent(foundedEvent));
      }
    },
    deleteEvent(eventName) {
      const foundedEvent = this.events.find(event => event.id === eventName);
      if (foundedEvent) {
        this.events = this.events.filter((eventItem) => eventItem !== foundedEvent);
        if (this._timeout) clearTimeout(this._timeout);
        if (this._interval) clearInterval(this._interval);
      }
    }
  };
  // LOCAL STORAGE SAVE
  window.onbeforeunload = () => {
    if (calendarObj.events.length) {
      localStorage.setItem('calendar-events', calendarObj.getStringifiedEvent(calendarObj.events));
    }
  };

  // TAKING EVENTS FROM LOCAL STORAGE
  let eventsFromLocal = localStorage.getItem('calendar-events') ? calendarObj.getParsedEvent(localStorage.getItem('calendar-events')) : null;
  if (eventsFromLocal && Array.isArray(eventsFromLocal)) {
    calendarObj.events = eventsFromLocal;
    calendarObj.events.forEach(event => {
      if (event.date) {
        const dateDiff = event.date.getTime() - Date.now();
        if (dateDiff > 0) {
          return event._timeout = setTimeout(() => event.callback(), dateDiff);
        }
      }
    });
  }
  this.createEvent = function (name, date, callback) {
    return calendarObj.createEvent(name, date, callback);
  };
  this.getEvent = function (name) {
    return calendarObj.getEvent(name);
  };
  this.getAllEvents = function () {
    return calendarObj.getAllEvents();
  };
  this.getEventsByYear = function (from, to) {
    return calendarObj.getEventsByYear(from, to);
  };
  this.changeExicutionTime = function (eventName, date) {
    return calendarObj.changeExicutionTime(eventName, date);
  }
  this.editEventName = function (eventName, name) {
    return calendarObj.editEventName(eventName, name);
  };
  this.deleteEvent = function (eventName) {
    return calendarObj.deleteEvent(eventName);
  };
  Calendar.prototype.events = calendarObj.events;
  Calendar.prototype.getStringifiedEvent = calendarObj.getStringifiedEvent;
  Calendar.prototype.getParsedEvent = calendarObj.getParsedEvent;
  Calendar.prototype.getEvent = calendarObj.getEvent;
  Calendar.prototype.getAllEvents = calendarObj.getAllEvents;
  Calendar.prototype.getEventsByYear = calendarObj.getEventsByYear;
  Calendar.prototype.deleteEvent = calendarObj.deleteEvent;
})();
