import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountController } from "./controllers/accounts-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountController.index },
  { method: "GET", path: "/login", config: accountController.loginView },
  { method: "GET", path: "/signup", config: accountController.signupView },
  { method: "POST", path: "/authenticate", config: accountController.login },
  { method: "POST", path: "/register", config: accountController.signup },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
];
