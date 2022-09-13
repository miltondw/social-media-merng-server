require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const mongoose = require("mongoose");
const {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
// TODO:Subscription new Post
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  cache: "bounded",
  introspection: true,
});
const URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_LOCAL;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connect");
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => console.log(`server running at ${res.url}`));
