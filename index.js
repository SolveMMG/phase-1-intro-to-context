
// Create an employee record
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create employee records
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  // Create a time-in event and push it .
  function createTimeInEvent(employee, dateTime) {
    const [date, time] = dateTime.split(' ');
    const timeIn = {
      type: 'TimeIn',
      hour: parseInt(time),
      date: date,
    };
    employee.timeInEvents.push(timeIn);
    return employee;
  }
  
  // Create a time-out event and push it .
  function createTimeOutEvent(employee, dateTime) {
    const [date, time] = dateTime.split(' ');
    const timeOut = {
      type: 'TimeOut',
      hour: parseInt(time),
      date: date,
    };
    employee.timeOutEvents.push(timeOut);
    return employee;
  }
  
  // Calculate hours worked on a particular date
  function hoursWorkedOnDate(employee, date) {
    const timeArrive = employee.timeInEvents.find(event => event.date === date);
    const timeLeave = employee.timeOutEvents.find(event => event.date === date);
    const hours= (timeLeave.hour - timeArrive.hour) / 100;
    return hours;
  }
  
  // Calculate wages earned on a particular date.
  function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    const wages = hours * employee.payPerHour;
    return wages;
  }
  
  // Calculate total pay for one employee.
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    const totalWages = dates.reduce((acc, date) => acc + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // Calculate total pay owned to all employees.
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
    return totalPayroll;
  }
  