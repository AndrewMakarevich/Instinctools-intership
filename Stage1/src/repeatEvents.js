(function RepEventsAddon(calendar) {
  calendar._events.array.forEach(eventItem => {
    if (eventItem.eventType === 'repeat') {
      initializeRepEventInterval(eventItem, eventItem.date);
    }
  });

  // recursive function to create execution delay for the repeat events
  function createRepEventTimeout(event, timeout, type) {
    event._timeout = setTimeout(() => {
      if (!calendar.getEvent(event.name)) {
        return;
      }

      event.callback();
      // if event still exists, execute callback
      if (type && type === 'daily') {
        return createRepEventTimeout(event, 1000 * 60 * 60 * 24); //if type of repeat event is daily, set timeout to the next day
      }

      return createRepEventTimeout(event, 1000 * 60 * 60 * 24 * 7); //instead, set timeout to the nex week day, wich is equal to the settled week day
    }, timeout);
  }

  // initializtion of the repeat event
  function initializeRepEventInterval(eventObj, date) {

    const currentDate = new Date();
    const nextDay = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    const startOfTheNextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());
    const millisecondsToTheNextDay = startOfTheNextDay - currentDate;

    // creating timeouts for the daily repeat events
    if (date === 'daily') {
      eventObj.callback();
      createRepEventTimeout(eventObj, 1000 * 60 * 60 * 24 - millisecondsToTheNextDay, 'daily');

      return;
    }

    // creating timeouts for the repeat events, wich execute week day is today
    const executeDayOfTheWeek = date.getDay();
    const currentDayOfTheWeek = new Date().getDay();

    if (currentDate.getDay() === executeDayOfTheWeek) {
      eventObj.callback();
      createRepEventTimeout(eventObj, 1000 * 60 * 60 * 24 * 7 - millisecondsToTheNextDay);

      return;
    }

    // creating timeouts for the repeat events, wich execute week day will be
    createRepEventTimeout(eventObj, 1000 * 60 * 60 * 24 * (Math.abs(executeDayOfTheWeek - currentDayOfTheWeek)) - millisecondsToTheNextDay);
  }

  // creation of the repeat event
  calendar.createRepEvent = function (name, date, callback) {

    calendar.deleteEvent(name);

    const eventObj = {
      eventType: 'repeat',
      name,
      date,
      callback,
      _timeout: 0,
    };

    calendar._events.array.push(eventObj);
    initializeRepEventInterval(eventObj, date);
  };

  // changeExicutionTime function extencion for the repeat events
  const changeExecutionTime = calendar.changeExecutionTime;

  calendar.changeExecutionTime = function (eventName, date) {

    const foundedEvent = calendar._events.array.find(event => event.name === eventName);

    if (!foundedEvent) {
      return;
    }

    if (foundedEvent.eventType === 'repeat') {
      clearTimeout(foundedEvent._timeout);
      foundedEvent.date = date;
      initializeRepEventInterval(foundedEvent, date);
    } else {
      changeExecutionTime(eventName, date);
    }

  };

})(calendar);