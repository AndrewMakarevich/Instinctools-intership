(function RepEventsAddon() {
  const calendarPrototype = Object.getPrototypeOf(calendar);

  calendarPrototype.events.forEach(eventItem => {
    if (eventItem.eventType === 'repeat') {
      initializeRepEventInterval(eventItem, eventItem.date);
    }
  });

  function initializeRepEventInterval(eventObj, date) {
    const currentDate = new Date();
    const nextDay = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    const startOfTheNextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
    const millisecondsToTheNextDay = startOfTheNextDay - currentDate;

    function createRepEventTimeout(event, timeout, type) {
      event._timeout = setTimeout(() => {
        event.callback();
        if (type && type === 'daily') {
          return createRepEventTimeout(event, 1000 * 60 * 60 * 24);
        }
        return createRepEventTimeout(event, 1000 * 60 * 60 * 24 * 7);
      }, timeout);
    }

    if (date === 'daily') {
      eventObj.callback();
      createRepEventTimeout(eventObj, 1000 * 60 * 60 * 24 - millisecondsToTheNextDay, 'daily');
      return;
    }

    const dayOfTheWeek = date.getDay();
    const currentDayOfTheWeek = new Date().getDay();

    if (currentDate.getDay() === dayOfTheWeek) {
      eventObj.callback();
      createRepEventTimeout(eventObj, 1000 * 60 * 60 * 24 * 7 - millisecondsToTheNextDay);
      return;
    }
    createRepEventTimeout(eventObj, 1000 * 60 * 60 * 24 * (Math.abs(dayOfTheWeek - currentDayOfTheWeek)) - millisecondsToTheNextDay);
  }

  calendarPrototype.createRepEvent = function (name, date, callback) {
    const alreadyCreatedEvent = calendarPrototype.events.find((repEvent) => repEvent.id === name);
    let eventObj;
    if (alreadyCreatedEvent && alreadyCreatedEvent.eventType === 'repeat') {
      eventObj = alreadyCreatedEvent;
      eventObj.callback = callback;
    } else {
      eventObj = {
        id: name,
        eventType: 'repeat',
        name,
        date,
        callback,
        _timeout: 0,
      };
      calendarPrototype.events.push(eventObj);
      initializeRepEventInterval(eventObj, date);
    }
  };
  const changeExicutionTime = calendarPrototype.changeExicutionTime;
  calendarPrototype.changeExicutionTime = function (eventName, date) {
    const foundedEvent = calendarPrototype.events.find(eventItem => eventItem.id === eventName);
    if (!foundedEvent) {
      return;
    }
    if (foundedEvent.eventType === 'repeat') {
      clearTimeout(foundedEvent._timeout);
      foundedEvent.date = date;
      initializeRepEventInterval(foundedEvent, date);
    } else {
      changeExicutionTime(eventName, date);
    }
  };
})();