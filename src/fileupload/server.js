const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const { apolloUploadExpress } = require('apollo-upload-server');

const { schema } = require('./schema');
const { lowdb } = require('./db');

const app = express();

app.use(cors());
app.use(
  '/graphql',
  bodyParser.json(),
  apolloUploadExpress(),
  graphqlExpress({
    schema,
    context: {
      lowdb
    }
  })
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphiql to run queries!');
});