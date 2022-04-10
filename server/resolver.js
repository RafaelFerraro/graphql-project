const authors = require('./author');

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
    },

    deleteAuthor: (obj, { id }) => {
      const author = authors.find(author => author.id == id);

      if (author) {
        const authorIndex = authors.indexOf(author);

        authors.splice(authorIndex, 1);

        return {id, message: "Author deleted"};
      } else {
        throw new Error("Author with id '" + id + "' not found");
      }
    }
  }
};

module.exports = resolvers;
