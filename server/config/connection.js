const { connect, connection } = require('mongoose');

connect('mongodb://localhost/ratethegords', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;