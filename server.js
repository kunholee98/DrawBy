require("dotenv").config();
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core/dist/plugin/drainHttpServer";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { typeDefs, resolvers } from "./schema";

async; //여기서부터 다시하세용~~
const PORT = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start;

// require("dotenv").config();
// import express from "express";
// import { typeDefs, resolvers } from "./schema";
// import { ApolloServer } from "apollo-server-express";
// import { getUser } from "./users/users.utils";
// import logger from "morgan";

// const PORT = process.env.PORT;
// const apollo = new ApolloServer({
//   resolvers,
//   typeDefs,
//   // context: async ({ req }) => {
//   //   return {
//   //     loggedInUser: await getUser(req.headers.authorization),
//   //   };
//   // },
// });

// const app = express();
// app.use(logger("tiny"));
// apollo.applyMiddleware({ app });
// app.use("/static", express.static("uploads"));

// app.listen({ port: PORT }, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT} ✅`);
// });
