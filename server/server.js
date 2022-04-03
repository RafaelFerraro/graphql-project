const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const PORT = 3500;
const app = express();

const authors = [
  {
    id: "1",
    info: {
      name: "Rafael",
      age: 30,
      gender: "male"
    }
  },
  {
    id: "2",
    info: {
      name: "Lívia",
      age: 38,
      gender: "female"
    }
  }
];

const typeDefs = `
  type Author {
    id: ID!
    info: Person
  }

  type Person {
    name: String!
    age: Int
    gender: String
  }

  type Query {
    getAuthors: [Author]
    findAuthor(id: ID!): Author
  }
`;

const resolvers = {
  Query: {
    getAuthors: () => authors,
    findAuthor: (obj, { id }) => authors.find(author => author.id === id)
  }
};

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
