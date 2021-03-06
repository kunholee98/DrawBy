import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver(async (_, { skip, take }, { loggedInUser }) => {
      const unreadFeeds = await client.feed.findMany({
        where: {
          userId: loggedInUser.id,
          read: false,
        },
        select: {
          picture: {
            include: {
              user: true,
              likePic: true,
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take,
      });
      const readFeeds = await client.feed.findMany({
        where: {
          userId: loggedInUser.id,
          read: true,
        },
        select: {
          picture: {
            include: {
              user: true,
              likePic: true,
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take,
      });
      const unreads = unreadFeeds.map((f) => f.picture);
      const reads = readFeeds.map((f) => f.picture);
      const feeds = unreads.concat(reads);
      if (!feeds) {
        return null;
      }
      return feeds;
    }),
  },
};
