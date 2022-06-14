import { db } from "../models/db.js";

function isAdmin(loggedInUser) {
  console.log(loggedInUser.role);
  if (loggedInUser.role === "admin") {
    return true;
  }
  return false;
}

export const adminController = {
  index: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!isAdmin(loggedInUser)) {
        return h.redirect("/dashboard");
      }
      return h.view("admin-view");
    },
  },
};
