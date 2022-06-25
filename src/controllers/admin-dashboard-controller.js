import { db } from "../models/db.js";
// eslint-disable-next-line import/named
import { UserLogin, UserSpecUpdate } from "../models/joi-schemas.js";

export function isAdmin(loggedInUser) {
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
      let numAdmins = 0;
      for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].admin) {
          // eslint-disable-next-line camelcase
          numAdmins += 1;
        }
      }
      const poisDB = await db.poiStore.getAllPois();
      const viewData = {
        users: userDB,
        user_poi: poisDB,
        sum_poi: poisDB.length,
        sum_user: userDB.length - numAdmins,
        average: (poisDB.length / userDB.length).toFixed(2),
        admins: numAdmins,
      };
      return h.view("admin-dashboard", viewData);
    },
  },
  deleteUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (!isAdmin(loggedInUser)) {
        return h.redirect("/dashboard");
      }
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
    validate: {
      payload: UserSpecUpdate,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("update-user", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
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
      await db.userStore.updateUser(request.payload.userId, newUser);
      return h.redirect("/admin/dashboard");
    },
  },
};
