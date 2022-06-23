import { db } from "../models/db.js";
import { DescriptionValidation } from "../models/joi-schemas.js";

export function isAdmin(loggedInUser) {
  console.log(loggedInUser.admin);
  if (loggedInUser.admin) {
    return true;
  }
  return false;
}

export const adminController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!isAdmin(loggedInUser)) {
        return h.redirect("/dashboard");
      }
      const userDB = await db.userStore.getAllUsers();
      const poisDB = await db.poiStore.getAllPois();
      const viewData = {
        users: userDB,
        user_poi: poisDB,
      };
      return h.view("admin-view", viewData);
    },
  },
  deleteUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!isAdmin(loggedInUser)) {
        return h.redirect("/dashboard");
      }
      console.log("here");
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin/dashboard");
    },
  },

  modifyUserView: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!isAdmin(loggedInUser)) {
        return h.redirect("/dashboard");
      }
      const user = await db.userStore.getUserById(request.params.id);
      const viewData = {
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        password: user.password,
        admin: user.admin,
        userId: request.params.id,
      };
      return h.view("update-user", viewData);
    },
  },

  modifyUserSubmit: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!isAdmin(loggedInUser)) {
        return h.redirect("/dashboard");
      }
      const newUser = {
        name: request.payload.name,
        nickname: request.payload.nickname,
        email: request.payload.email,
        password: request.payload.password,
        admin: request.payload.admin,
      };
      await db.userStore.updateUser(request.payload.poiId, newUser);
      return h.redirect("/admin/dashboard");
    },
  },
};
