const { createServer } = require('http');
const express = require('express');
const app = express();
const httpServer = createServer(app);
const apiRoutes = require('./api/api.routes');
const loggerService = require('./services/logger.service');
const { createWorker } = require('./services/worker.service');
app.use(express.static('public'));
const port = process.env.PORT || 3030;

app.use('/api', apiRoutes);

httpServer.listen(port, () => {
  loggerService.info('Server listening on port 3030!');
  createWorker();
});
