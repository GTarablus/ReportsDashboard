const loggerService = require('./logger.service');
const dbService = require('./db.service');
const { addToQueue } = require('./queue.service');

function setTask(req, res) {
  const { id, type } = req.params;
  const { status } = req.query;
  if (!status) {
    res.status(400).send(`No info given for ${type}- ${id}`);
    loggerService.warn('A request with no status has been received');
  } else {
    const time = new Date();
    const message = `${type} ID- ${id}: ${status} at ${time}`;
    const taskInfo = {
      type,
      _id: id,
      status,
      time,
      message,
    };
    addToQueue(taskInfo);
    res.status(200).send(
      //   `task type: ${taskInfo.type} ${taskInfo._id}, status: ${taskInfo.status} received at: ${taskInfo.time}`
      taskInfo.message
    );
  }
}

async function getCount(req, res) {
  const { type } = req.params;
  const count = await dbService.getNumOfDocs(type);
  res.send(`${count}`);
}

async function save(task) {
  const { type, _id } = task;
  try {
    const collection = await dbService.getCollection(type);
    await collection.insertOne(task);
    loggerService.info(`Request ID: ${_id} was received succesfully`);
  } catch (err) {
    loggerService.error('cannot add Request', err);
    throw err;
  }
}

function performTask(task) {
  save(task);
  console.log('Request received: \n', task);
}

module.exports = {
  setTask,
  performTask,
  getCount,
};
