// // index.js
// const { GraphQLServer } = require('graphql-yoga');
// const sequelize = require('./config/database');
// const path = require('path');
// const fs = require('fs');

// // Initialize Sequelize models
// require('./models/user');

// // Read typeDefs from schema files
// const typeDefs = fs.readFileSync(path.join(__dirname, 'schemas', 'productSchema.graphql'), 'utf8');

// // Load resolvers
// const resolvers = require('./resolvers/productResolver');

// // Create GraphQL server
// const server = new GraphQLServer({ typeDefs, resolvers });

// // Start server
// sequelize.authenticate().then(() => {
//   server.start(() => console.log('Server is running on http://localhost:4000'));
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// });




const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./config/database');
const path = require('path');
const fs = require('fs');

// Initialize Sequelize models
require('./models/user');

// Read typeDefs from schema files
const typeDefs = fs.readFileSync(path.join(__dirname, 'schemas', 'productSchema.graphql'), 'utf8');

// Load resolvers
const resolvers = require('./resolvers/productResolver');

// Create ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers });

// Create Express app
const app = express();

// Start server
sequelize.authenticate().then(() => {
  server.start().then(() => {
    // Apply ApolloServer middleware to Express app
    server.applyMiddleware({ app });

    // Start listening
    app.listen({ port: 4000 }, () =>
      console.log(`Server is running at http://localhost:4000${server.graphqlPath}`)
    );
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
