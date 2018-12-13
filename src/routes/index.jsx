import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
//import Login from "../layouts/Login/Login.jsx";
import Login from "../views/Login/Login";

var indexRoutes = [
    { path: "/login", name: "Login", component: Login },
    { path: "/", name: "Daschboard", component: Dashboard },

];

export default indexRoutes;
