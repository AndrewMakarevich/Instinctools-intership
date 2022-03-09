(function RepEventsAddon(calendar) {

  calendar._events.forEach(eventItem => {
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

  calendar.createRepEvent = function (name, date, callback) {
    calendar._events.filter((repEvent) => repEvent.name !== name);
    const eventObj = {
      id: name,
      eventType: 'repeat',
      name,
      date,
      callback,
      _timeout: 0,
    }
    calendar._events.push(eventObj);
    initializeRepEventInterval(eventObj, date);
  };
  const changeExecutionTime = calendar.changeExicutionTime;
  calendar.changeExecutionTime = function (eventName, date) {
    const foundedEvent = calendar._events.find(eventItem => eventItem.id === eventName);
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