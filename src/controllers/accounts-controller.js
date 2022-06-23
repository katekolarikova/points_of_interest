import { db } from "../models/db.js";
import { UserLogin, UserSpec } from "../models/joi-schemas.js";

export const accountController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main");
    },
  },
  loginView: {
    auth: false,
    handler: async function (request, h) {
      return h.view("login-view");
    },
  },
  signupView: {
    auth: false,
    handler: async function (request, h) {
      return h.view("signup-view");
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserLogin,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email } = request.payload;
      const { password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/login");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      console.log(request);
      const user = request.payload;
      user.admin = false;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },

  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
};
