Calendar.createEvent('Test', new Date(Date.now() + 5000), testFunc)
const eventObj = Calendar.getEvent('Test');
eventObj.changeExicutionTime(new Date(Date.now() + 2000));

function testFunc() {
  console.log('Event exicute');
}
console.log(eventObj.timeout);
console.log(Calendar.getEvent('Test'));
console.log(Calendar.getAllEvents());
