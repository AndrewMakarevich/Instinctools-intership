const calendarCreator = EventsCalendarObject.CalendarCreator();
const eventCreator = EventsCalendarObject.EventCreator();

const calendar = calendarCreator.createCalendar();


function testFunc() {
  console.log('alalalal');
}
const event1 = eventCreator.createEvent('test1', new Date(Date.now() + 10000), testFunc);
const event2 = eventCreator.createEvent('test1', new Date(Date.now() - 10000), testFunc);
calendar.addEvent(event1);
calendar.addEvent(event2);
console.log(calendar.events)
