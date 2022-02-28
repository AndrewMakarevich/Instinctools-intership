
// function testFunc(a, b) {
//   console.log(a);
//   console.log(b);
// }
// console.log(calendar.getAllEvents());
// calendar.createEvent('Test1', new Date(2022, 1, 24, 14, 29, 59), () => { testFunc('EventTest', 'exicuted') });

// calendar.getEvent('Test1').changeExicutionTime(new Date(2022, 1, 28, 12, 43, 59));
// console.log(calendar.getEvent('Test1').editEventName('Test'));
// console.log(calendar.getEvent('Test1').event);
// console.log(calendar.getEventsByYear(2022, 2023).getEventsByMonth(1, 1).getEventsByMonthDay(24, 27));

function repeatFunc(a, b) {
  console.log(a, b);
}
repEvents.createEvent('Rep', 1, () => repeatFunc("Test", "it"));
console.log(repEvents.getAllEvents());
// console.log(calendar.getEvent);

// console.log(calendar.repEvents.getAllRepeatingEvents());
// calendar.repEvents.getRepeatingEvent('Rep').changeRepEventName('Rep1');
// calendar.repEvents.getRepeatingEvent('Rep').changeRepEventInterval(2);
// console.log(calendar.repEvents.getRepeatingEvent('Rep'));
