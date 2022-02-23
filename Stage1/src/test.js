
function testFunc(a, b) {
  console.log(a);
  console.log(b)
}
calendar.createEvent('Test', new Date(Date.now() + 5000), () => { testFunc('Event', 'exicuted') });
calendar.getEvent('Test').changeExicutionTime(new Date(Date.now() + 10000));
console.log(calendar.getAllEvents());
// calendar.getEvent('Test').deleteEvent();
console.log(calendar.getEvent('Test').editEventName('Test1'));
// let events = calendar.getAllEvents();
// events = 'NO ARRAY!';
console.log(calendar.getEventsByYear(2022).getEventsByMonth(1).getEventsByMonthDay(23));
