export const accountController = {
  login: {
    handler: async function (request, h) {
      return h.view("login-view");
    },
  },
  signup: {
    handler: async function (request, h) {
      return h.view("signup-view");
    },
  },
};
