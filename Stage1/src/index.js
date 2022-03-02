// 'esversion: 6';
const calendar = new (function Calendar() {
  function eventsArray(eventsItems) {
    this.array = eventsItems;
    eventsArray.prototype.getEventsByYear = function (from, to) {
      let eventsByYear;
      if (!from && !to) {
        eventsByYear = eventsItems;
      }
      else if (!to) {
        eventsByYear = eventsItems.filter((event) => !event.date || event.date.getFullYear() >= from);
      } else {
        eventsByYear = eventsItems.filter((event) => !event.date || (event.date.getFullYear() >= from && event.date.getFullYear() <= to));
      }
      return new eventsArray(eventsByYear);
    };
    eventsArray.prototype.getEventsByMonth = function (from, to) {
      let eventsByMonth;
      if (!from && !to) {
        eventsByMonth = eventsItems;
      }
      else if (!to) {
        eventsByMonth = eventsItems.filter((event) => !event.date || event.date.getMonth() >= from);
      } else {
        eventsByMonth = eventsItems.filter((event) => !event.date || (event.date.getMonth() >= from && event.date.getMonth() <= to));
      }
      return new eventsArray(eventsByMonth);
    };
    eventsArray.prototype.getEventsByMonthDay = function (from, to) {
      let eventsByMonthDay;
      if (!from && !to) {
        eventsByMonthDay = eventsItems;
      } else if (!to) {
        eventsByMonthDay = eventsItems.filter((event) => !event.date || event.date.getDate() >= from);
      } else {
        eventsByMonthDay = eventsItems.filter((event) => !event.date || (event.date.getDate() >= from && event.date.getDate() <= to));
      }
      return new eventsArray(eventsByMonthDay);
    };
    eventsArray.prototype.getEventsByWeek = function (from, to) {
      function getWeekNumber(date) {
        const firstJan = new Date(date.getFullYear(), 0, 1);
        const amountOfDays = Math.floor((date - firstJan) / (1000 * 60 * 60 * 24));
        const currentWeek = Math.ceil(amountOfDays / 7);
        return currentWeek;
      }
      let eventsByWeek;
      if (!from & !to) {
        eventsByWeek = eventsItems;
      } else if (!to) {
        eventsByWeek = eventsItems.filter((event) => !event.date || getWeekNumber(event.date) >= from);
      } else {
        eventsByWeek = eventsItems.filter((event) => !event.date || (getWeekNumber(event.date) >= from && getWeekNumber(event.date) <= to));
      }
      return new eventsArray(eventsByWeek);
    };
    eventsArray.prototype.getEventsByWeekDay = function (from, to) {
      let eventsByWeekDay;
      if (!from && !to) {
        eventsByWeekDay = eventsItems;
      } else if (!to) {
        eventsByWeekDay = eventsItems.filter((event) => event.date.getDay() >= from);
      } else {
        eventsByWeekDay = eventsItems.filter((event) => event.date.getDay() >= from && event.date.getDay() <= to);
      }
      return new eventsArray(eventsByWeekDay);
    };
  }
  const calendarObj = {
    // STANDART EVENT
    events: new eventsArray([]),
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
      const alreadySettledEvent = this.events.array.find(event => event.id === name);
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
      this.events.array.push(event);
    },
    getEvent(name) {
      const foundedEvent = this.events.array.find((event) => event.id === name);
      if (!foundedEvent) {
        return null;
      }
      return this.getParsedEvent(this.getStringifiedEvent(foundedEvent));
    },
    getAllEvents() {
      return this.getParsedEvent(this.getStringifiedEvent(this.events.array));
    },
    changeExicutionTime(eventName, date) {
      const foundedEvent = this.events.array.find(event => event.id === eventName);
      if (foundedEvent) {
        clearTimeout(foundedEvent._timeout);
        foundedEvent._timeout = setTimeout(() => foundedEvent.callback(), date.getTime() - Date.now());
        foundedEvent.date = date;
      }
    },
    editEventName(eventName, name) {
      const foundedEvent = this.events.array.find(event => event.id === eventName);
      if (foundedEvent) {
        foundedEvent.name = name;
        return this.getParsedEvent(this.getStringifiedEvent(foundedEvent));
      }
    },
    deleteEvent(eventName) {
      const foundedEvent = this.events.array.find(event => event.id === eventName);
      if (foundedEvent) {
        this.events.array = this.events.array.filter((eventItem) => eventItem !== foundedEvent);
        if (this._timeout) clearTimeout(this._timeout);
        if (this._interval) clearInterval(this._interval);
      }
    }
  };
  // LOCAL STORAGE SAVE
  window.onbeforeunload = () => {
    if (calendarObj.events.array.length) {
      localStorage.setItem('calendar-events', calendarObj.getStringifiedEvent(calendarObj.events.array));
    }
  };

  // TAKING EVENTS FROM LOCAL STORAGE
  let eventsFromLocal = localStorage.getItem('calendar-events') ? calendarObj.getParsedEvent(localStorage.getItem('calendar-events')) : null;
  if (eventsFromLocal && Array.isArray(eventsFromLocal)) {
    calendarObj.events = new eventsArray(eventsFromLocal);
    calendarObj.events.array.forEach(event => {
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
  this.editEventName = function (eventName, name) {
    return calendarObj.editEventName(eventName, name);
  };
  this.deleteEvent = function (eventName) {
    return calendarObj.deleteEvent(eventName);
  };
  Calendar.prototype.events = calendarObj.events.array;
  Calendar.prototype.dateFiltering = Object.getPrototypeOf(calendarObj.events);
  Calendar.prototype.changeExicutionTime = calendarObj.changeExicutionTime.bind(calendarObj);
})();
