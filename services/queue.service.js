const loggerService = require('./logger.service');
const gQueues = {
  email: [],
  sms: [],
  meet: [],
  pay: [],
};

function addToQueue(task) {
  if (!gQueues[task.type]) {
    loggerService.warn('unknown type recieved');
    return;
  }
  gQueues[task.type].unshift(task);
}

function getNextTask(type) {
  if (gQueues[type].length) {
    return gQueues[type].pop();
  }
  return null;
}

module.exports = {
  addToQueue,
  getNextTask,
};
