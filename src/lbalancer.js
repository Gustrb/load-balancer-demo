import express from 'express';
import request from 'request';

const servers = ['http://localhost:3000', 'http://localhost:3001'];

let current = 0;

const handler = (req, res) => {
  const server = servers[current];
  req.pipe(request({ url: server + req.url })).pipe(res);

  // e.g: (current + 1) % servers.length, but a lot faster
  current = (current + 1) & (servers.length - 1);
};

const server = express();

server.get('/favicon.ico', (req, res) => res.send('/favicon.ico'));

server.use((req, res) => handler(req, res));

server.listen(8080, err => {
  err
    ? console.log('Failed to start load balancer on port 8080')
    : console.log('Started load balancer on port  8080');
});

