import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountController } from "./controllers/accounts-controller.js";
import { poiController } from "./controllers/poi-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountController.index },
  { method: "GET", path: "/login", config: accountController.loginView },
  { method: "GET", path: "/signup", config: accountController.signupView },
  { method: "GET", path: "/logout", config: accountController.logout },
  { method: "POST", path: "/authenticate", config: accountController.login },
  { method: "POST", path: "/register", config: accountController.signup },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addpoi", config: poiController.newPoi },
  { method: "POST", path: "/dashboard/filterpoi", config: dashboardController.filterPoi },
  { method: "GET", path: "/dashboard/deletePoi/{id}", config: poiController.deletePoi },
  { method: "GET", path: "/modifypoi/{id}", config: poiController.index },
  { method: "POST", path: "/modifypoi/submit/{id}", config: poiController.updatePoi },
];
