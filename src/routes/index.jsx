import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Login from "../layouts/Login/Login.jsx";
//import Login from "../views/Login/Login";

var indexRoutes = [
    { path: "/login", name: "Login", component: Login },
    { path: "/", name: "Dashboard", component: Dashboard },

];

export default indexRoutes;
