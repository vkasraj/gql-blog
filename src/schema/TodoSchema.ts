import { objectType } from "nexus";

export const Todo = objectType({
    name: "Todo",
    definition(t) {
        t.id("_id");
        t.string("title");
        t.string("description");
        t.boolean("completed");
        t.string("userID");
        t.field("createdAt", {
            type: "DateTime"
        });
        t.field("updatedAt", {
            type: "DateTime"
        });
        t.field("createdBy", {
            type: "User",
            resolve: ({ userID }, _, { userService }) => {
                return userService.createdBy(userID);
            }
        });
    }
});
