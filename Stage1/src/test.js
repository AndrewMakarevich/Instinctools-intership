
// function testFunc(a, b) {
//   console.log(a);
//   console.log(b)
// }
// console.log(calendar.getAllEvents());
// calendar.createEvent('Test1', new Date(2022, 1, 24, 14, 29, 59), () => { testFunc('EventTest', 'exicuted') });

// calendar.getEvent('Test1').changeExicutionTime(new Date(2022, 1, 25, 11, 40, 59));
// console.log(calendar.getEvent('Test1'));
// console.log(calendar.getEventsByYear(2022, 2023).getEventsByMonth(1, 1).getEventsByMonthDay(25, 26));
function repeatFunc(a, b) {
  console.log(a, b);
}
calendar.repEvents.createRepeatingEvent('Rep', 0, () => repeatFunc('test', 'it'));
