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
    }

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

  const events = new eventsArray([]);

  function getStringifiedEvent(event) {
    return JSON.stringify(event, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    });
  };

  function getParsedEvent(event) {
    return JSON.parse(event, function (key, value) {
      if (key === 'callback') {
        return eval(value);
      } else if (key === 'date' && !isNaN(new Date(value))) {
        return new Date(value);
      }
      return value;
    });
  };
  // // LOCAL STORAGE SAVE
  // window.onbeforeunload = () => {
  //   if (calendarObj.events.array.length) {
  //     localStorage.setItem('calendar-events', calendarObj.getStringifiedEvent(calendarObj.events.array));
  //   }
  // };

  // // TAKING EVENTS FROM LOCAL STORAGE
  // let eventsFromLocal = localStorage.getItem('calendar-events') ? calendarObj.getParsedEvent(localStorage.getItem('calendar-events')) : null;
  // if (eventsFromLocal && Array.isArray(eventsFromLocal)) {
  //   calendarObj.events = new eventsArray(eventsFromLocal);
  //   calendarObj.events.array.forEach(event => {
  //     if (event.date && !isNaN(new Date(event.date)) && !event.eventType) {
  //       const dateDiff = event.date.getTime() - Date.now();
  //       if (dateDiff > 0) {
  //         return event._timeout = setTimeout(() => event.callback(), dateDiff);
  //       }
  //     }
  //   });
  // }

  return {
    _events: events.array,
    createEvent(name, date, callback) {
      if (date.getTime() - Date.now() > 2147483647) {
        return;
      }
      this.deleteEvent(name);
      events.array.push({
        id: name,
        name,
        date,
        callback,
        _timeout:
          date.getTime() - Date.now() < 0 ?
            setTimeout(() => callback(), date.getTime() - Date.now())
            :
            undefined
      });
    },
    getEvent(name) {
      const foundedEvent = events.array.find((event) => event.id === name);
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
      const foundedEvent = events.array.find(event => event.id === eventName);
      if (foundedEvent) {
        clearTimeout(foundedEvent._timeout);
        foundedEvent._timeout = setTimeout(() => foundedEvent.callback(), date.getTime() - Date.now());
        foundedEvent.date = date;
      }
    },
    editEventName(eventName, name) {
      const foundedEvent = events.array.find(event => event.id === eventName);
      if (foundedEvent) {
        foundedEvent.name = name;
        return getParsedEvent(getStringifiedEvent(foundedEvent));
      }
    },
    deleteEvent(eventName) {
      const foundedEvent = events.array.find(event => event.id === eventName);
      if (foundedEvent) {
        events.array = events.array.filter((eventItem) => eventItem !== foundedEvent);
        if (foundedEvent._timeout) clearTimeout(foundedEvent._timeout);
      }
    }
  }
})();
