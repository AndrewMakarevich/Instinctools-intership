// 'esversion: 6';
const calendar = (function Calendar() {

  function eventsArray(eventsItems) {

    this.array = eventsItems;

    const filterArrayByDate = (getterFunction, from, to) => {

      Date.prototype.getterFunction = getterFunction;
      let filteredEvents;

      if (!from && !to) {
        filteredEvents = this.array;
      } else if (!to) {
        filteredEvents = this.array.filter((event) => isNaN(event.date) || event.date.getterFunction() >= from);
      } else {
        filteredEvents = this.array.filter((event) => isNaN(event.date) || (event.date.getterFunction() >= from && event.date.getterFunction() <= to));
      }

      return new eventsArray(filteredEvents);
    };

    this.getEventsByYear = function (from, to) {
      return filterArrayByDate(Date.prototype.getFullYear, from, to);
    };
    this.getEventsByMonth = function (from, to) {
      return filterArrayByDate(Date.prototype.getMonth, from, to);
    };
    this.getEventsByMonthDay = function (from, to) {
      return filterArrayByDate(Date.prototype.getDate, from, to);
    };
    this.getEventsByWeek = function (from, to) {
      function getWeekNumber(date) {

        const firstJan = new Date(date.getFullYear(), 0, 1);
        const amountOfDays = Math.floor((date - firstJan) / (1000 * 60 * 60 * 24));
        const currentWeek = Math.ceil(amountOfDays / 7);

        return currentWeek;
      }

      let eventsByWeek;

      if (!from & !to) {
        eventsByWeek = this.array;
      } else if (!to) {
        eventsByWeek = this.array.filter((event) => isNaN(event.date) || getWeekNumber(event.date) >= from);
      } else {
        eventsByWeek = this.array.filter((event) => isNaN(event.date) || (getWeekNumber(event.date) >= from && getWeekNumber(event.date) <= to));
      }

      return new eventsArray(eventsByWeek);
    };
    this.getEventsByWeekDay = function (from, to) {
      return filterArrayByDate(Date.prototype.getDay, from, to);
    };
  }

  let events = new eventsArray([]);

  function getStringifiedEvent(event) {
    return JSON.stringify(event, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    });
  }

  function getParsedEvent(event) {
    return JSON.parse(event, function (key, value) {
      if (key === 'callback') {
        return eval(value);
      } else if (key === 'date' && !isNaN(new Date(value))) {
        return new Date(value);
      }
      return value;
    });
  }

  // LOCAL STORAGE SAVE
  window.onbeforeunload = () => {
    if (events.array.length) {
      localStorage.setItem('calendar-events', getStringifiedEvent(events.array));
    }
  };

  // TAKING EVENTS FROM LOCAL STORAGE
  let eventsFromLocal = localStorage.getItem('calendar-events') ? getParsedEvent(localStorage.getItem('calendar-events')) : null;
  if (eventsFromLocal && Array.isArray(eventsFromLocal)) {
    events = new eventsArray(eventsFromLocal);
    events.array.forEach(event => {
      if (!event.eventType) {
        const dateDiff = event.date.getTime() - Date.now();
        if (dateDiff > 0) {
          event._timeout = setTimeout(() => event.callback(), dateDiff);
          return;
        }
      }
    });
  }

  return {
    _events: events.array,
    createEvent(name, date, callback) {
      if (date.getTime() - Date.now() > 2147483647) {
        return;
      }
      this.deleteEvent(name);
      events.array.push({
        name,
        date,
        callback,
        _timeout:
          date.getTime() - Date.now() > 0 ?
            setTimeout(() => callback(), date.getTime() - Date.now())
            :
            undefined
      });
    },
    getEvent(name) {
      const foundedEvent = events.array.find((event) => event.name === name);
      if (!foundedEvent) {
        return null;
      }
      return getParsedEvent(getStringifiedEvent(foundedEvent));
    },
    getAllEvents() {
      return getParsedEvent(getStringifiedEvent(events.array));
    },
    dateFiltering: {
      getEventsByYear: events.getEventsByYear.bind(events),
      getEventsByMonth: events.getEventsByMonth.bind(events),
      getEventsByMonthDay: events.getEventsByMonthDay.bind(events),
      getEventsByWeek: events.getEventsByWeek.bind(events),
      getEventsByWeekDay: events.getEventsByWeekDay.bind(events)
    },
    changeExecutionTime(eventName, date) {
      if (date.getTime() - Date.now() < 0) {
        return;
      }
      const foundedEvent = events.array.find(event => event.name === eventName);
      if (foundedEvent) {
        clearTimeout(foundedEvent._timeout);
        foundedEvent._timeout = setTimeout(() => foundedEvent.callback(), date.getTime() - Date.now());
        foundedEvent.date = date;
      }
    },
    editEventName(eventName, name) {

      const eventToRename = events.array.find(event => event.name === eventName);
      const foundedEvent = events.array.find(event => event.name === name);

      if (foundedEvent) {
        return;
      }

      if (eventToRename) {
        eventToRename.name = name;
        return getParsedEvent(getStringifiedEvent(eventToRename));
      }

    },
    deleteEvent(eventName) {
      // const foundedEvent = events.array.find(event => event.name === eventName);
      const foundedEvents = events.array.filter(event => event.name === eventName);
      if (foundedEvents.length) {
        foundedEvents.forEach(eventToDelete => {
          events.array = events.array.filter((eventItem) => eventItem !== eventToDelete);
          if (eventToDelete._timeout) clearTimeout(eventToDelete._timeout);
        });
      }
    }
  };
})();
