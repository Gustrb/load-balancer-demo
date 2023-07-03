import express from 'express';

const app1 = express();
const app2 = express();

const handler = (serverName) => (req, res) => {
  console.log(`Request from ${serverName}`, req.method, req.url);
  res.send(`Hello from server ${serverName}`);
};

app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));

app1.listen(3000, err => {
  err
    ? console.log('Failed to listen on port 3000')
    : console.log('Application server listening on port 3000');
});

app2.listen(3001, err => {
  err
    ? console.log('Failed to listen on port 3001')
    : console.log('Application server listening on port 3001');
});

