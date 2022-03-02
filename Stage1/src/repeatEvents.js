(function RepEventsAddon() {
  const calendarPrototype = Object.getPrototypeOf(calendar);

  calendarPrototype.events.forEach(eventItem => {
    if (eventItem.dayOfTheWeek >= 0 && eventItem.dayOfTheWeek <= 6) {
      initializeRepEventInterval(eventItem, eventItem.dayOfTheWeek);
    }
  });

  function initializeRepEventInterval(eventObj, dayOfTheWeek) {

    const currentDate = new Date();
    const nextDay = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    const startOfTheNextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
    if (dayOfTheWeek === 'daily') {
      eventObj.callback();
      eventObj._timeout = setTimeout(() => {
        eventObj.callback();
        eventObj._interval = setInterval(() => {
          eventObj.callback();
        }, 1000 * 60 * 60 * 24);
      }, startOfTheNextDay - currentDate);
      eventObj.dayOfTheWeek = dayOfTheWeek;
      return;
    }
    if (currentDate.getDay() === dayOfTheWeek) {
      eventObj.callback();
    }

    eventObj.dayOfTheWeek = dayOfTheWeek;
    eventObj._timeout = setTimeout(() => {
      if (currentDate.getDay() === dayOfTheWeek) eventObj.callback();
      eventObj._interval = setInterval(() => {
        if (currentDate.getDay() === dayOfTheWeek) eventObj.callback();
      }, 1000 * 60 * 60 * 24);
    }, startOfTheNextDay - currentDate);
  }

  calendarPrototype.createRepEvent = function (name, dayOfTheWeek, callback) {
    const alreadyCreatedEvent = calendarPrototype.events.find((repEvent) => repEvent.id === name);
    let eventObj;
    if (alreadyCreatedEvent && alreadyCreatedEvent.dayOfTheWeek !== undefined) {
      eventObj = alreadyCreatedEvent;
      eventObj.callback = callback;
    } else {
      eventObj = {
        id: name,
        name,
        dayOfTheWeek,
        callback,
        _timeout: 0,
        _interval: 0
      };
      calendarPrototype.events.push(eventObj);
    }

    initializeRepEventInterval(eventObj, dayOfTheWeek);
  };

  calendarPrototype.setNewRepEventInterval = function (eventName, dayOfTheWeek) {
    const foundedEvent = calendarPrototype.events.find(eventItem => eventItem.id === eventName);
    if (foundedEvent) {
      if (dayOfTheWeek === foundedEvent.dayOfTheWeek) {
        return;
      }
      if (+dayOfTheWeek >= 0 && +dayOfTheWeek <= 6) {
        clearTimeout(foundedEvent._timeout);
        clearInterval(foundedEvent._interval);
        foundedEvent.dayOfTheWeek = dayOfTheWeek;
        initializeRepEventInterval(foundedEvent, dayOfTheWeek);
      }
    }
  };

  const changeExicutionTime = calendarPrototype.changeExicutionTime;
  calendarPrototype.changeExicutionTime = function (eventName, date) {
    const foundedEvent = calendarPrototype.events.find(eventItem => eventItem.id === eventName);
    if (foundedEvent && foundedEvent.dayOfTheWeek && foundedEvent._interval !== undefined) {
      if (date === 'daily' || (date >= 0 && date <= 6)) {
        clearTimeout(foundedEvent._timeout);
        clearInterval(foundedEvent._interval);
        initializeRepEventInterval(foundedEvent, date);
      }
    } else {
      changeExicutionTime(eventName, date);
    }
  };
})();