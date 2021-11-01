const loggerService = require('./logger.service');
const { getNextTask } = require('./queue.service');
const { performTask } = require('./task.service');

function createWorker() {
  const types = ['email', 'sms', 'meet', 'pay'];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    async function worker() {
      setInterval(async () => {
        const task = await getNextTask(type);
        // console.log(`${type}`, task);
        if (task) {
          performTask(task);
        } else {
          console.log(`Snoozing... no ${type} tasks to perform`);
        }
      }, 5000);
    }
    worker();
  }
}
module.exports = {
  createWorker,
};
