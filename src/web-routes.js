import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountController } from "./controllers/accounts-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: dashboardController.index },
  { method: "GET", path: "/login", config: accountController.login },
  { method: "GET", path: "/signup", config: accountController.signup },
];
