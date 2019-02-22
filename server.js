const express = require('express');
const app = express();
const port = process.env.PORT || 8888;

app.get('/express_backend', (req, res) => {
  res.send({ express: 'Express backend connected to React' });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
