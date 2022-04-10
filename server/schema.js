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

  type DeleteMessage {
    id: String
    message: String
  }

  type Mutation {
    createAuthor(name: String!, age: Int!, gender: String!): Author
    updateAuthor(id: String!, name: String, age: Int, gender: String): Author
    deleteAuthor(id: String!): DeleteMessage
  }
`;

module.exports = typeDefs;
