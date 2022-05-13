const { createServer } = require('@graphql-yoga/node');
var records = [];

const typeDefs = `
  type Query {
    fetchRecords: [String]
  }
  type Mutation {
    createRecord(record: String!): [String]
    updateRecord(index: Int!, newRecord: String!): String!
  }
`;

const resolvers = {
  Query: {
    fetchRecords: () => records
  },

  Mutation: {
    createRecord: (obj, { record }) => {
      records.push(record);

       return records;
    },

    updateRecord: (obj, { index, newRecord }) => {
      if(records[+index] == undefined) {
        throw new Error(`Record ${index} does not exist.`);
      } else {
        records[+index] = newRecord;
        return newRecord;
      }
    }
  }
}

//const server = GraphQLServer({typeDefs, resolvers});
// Provide your schema
const server = createServer({
  schema: { typeDefs, resolvers }
})

// Start the server and explore http://localhost:4000/graphql
server.start(() => {
  console.log("Server is running on port 4000");
});
