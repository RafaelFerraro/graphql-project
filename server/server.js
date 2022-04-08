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

  type Mutation {
    createAuthor(name: String!, age: Int!, gender: String!): Author
    updateAuthor(id: String!, name: String, age: Int, gender: String): Author
  }
`;

const resolvers = {
  Query: {
    getAuthors: () => authors,
    findAuthor: (obj, { id }) => authors.find(author => author.id === id)
  },

  Mutation: {
    createAuthor: (obj, args) => {
      const id = authors.length + 1;
      const { name, age, gender } = args;
      const newAuthor = {
        id: id,
        info: {
          name,
          age,
          gender
        }
      }

      authors.push(newAuthor);

      return newAuthor;
    },

    updateAuthor: (obj, { id, name, age, gender }) => {
      const author = authors.find(author => author.id == id);

      if (author) {
        const authorIndex = authors.indexOf(author);

        if (name) author.info.name = name;
        if (age) author.info.age = age;
        if (gender) author.info.gender = gender;

        authors[authorIndex] = author

        return author;
      } else {
        throw new Error("Author with id '" + id + "' not found");
      }
    }
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
