import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
      });
      if (!comment) {
        return { ok: false, error: "Comment not found." };
      }
      if (comment.userId != loggedInUser.id) {
        return { ok: false, error: "No authority to delete." };
      }
      const deleteComment = await client.comment.delete({
        where: { id },
      });
      if (!deleteComment) {
        return { ok: false, error: "Fail to delete." };
      }
      return { ok: true };
    }),
    deleteNestedComment: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const comment = await client.nestedComment.findUnique({
          where: { id },
        });
        if (!comment) {
          return { ok: false, error: "Nested Comment not found." };
        }
        if (comment.userId != loggedInUser.id) {
          return { ok: false, error: "No authority to delete." };
        }
        const deleteComment = await client.nestedComment.delete({
          where: { id },
        });
        if (!deleteComment) {
          return { ok: false, error: "Fail to delete." };
        }
        return { ok: true };
      }
    ),
  },
};
