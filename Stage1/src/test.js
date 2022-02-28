
function testFunc(a, b) {
  console.log(a);
  console.log(b);
}
console.log(calendar.events.getAllEvents());
calendar.events.createEvent('Test1', new Date(2022, 1, 24, 14, 29, 59), () => { testFunc('EventTest', 'exicuted') });

calendar.events.getEvent('Test1').changeExicutionTime(new Date(2022, 1, 25, 11, 40, 59));
console.log(calendar.events.getEvent('Test1').editEventName('Test'));
console.log(calendar.events.getEvent('Test1').event);

calendar.repEvents.createRepeatingEvent = 'lol';
calendar.events = 'fortest';
console.log(calendar);
// console.log(calendar.events.getEventsByYear(2022, 2023).getEventsByMonth(1, 1).getEventsByMonthDay(25, 26));
// function repeatFunc(a, b) {
//   console.log(a, b);
// }
// calendar.repEvents.createRepeatingEvent('Rep', 0, () => repeatFunc('test', 'it'));
// console.log(calendar.repEvents.getRepeatingEvent('Rep'));
