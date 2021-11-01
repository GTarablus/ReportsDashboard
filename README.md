# ReportsDashboard
HTTP to Async job service, server built with Express, Node.Js, client with React. 

The app can receive HTTP requests, publish them to a relevant queue where the get processed by a queue worker and get inserted into a DB (MongoDB).

In order to send relevant HTTP requests:
http://<domain-name>/api/<type>/<id>/status?status=<status>
  
* Type can be one of four: email, sms, meet and pay.
Any other type will not get recognized and will be dismissed before reaching a queue.
  
Example of an api request: http://
