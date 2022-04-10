const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const PORT = 3500;
const app = express();

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: '/graphql'
  });
}
startServer();

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
