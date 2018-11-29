import Dashboard from "../views/Dashboard/Dashboard.jsx";
// import Notifications from "views/Notifications/Notifications.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import TableList from "views/TableList/TableList.jsx";
import Login from "../views/Login/Login.jsx";
import TelaPedidos from "../views/Pedidos/Pedidos.jsx";
import TelaDoacoes from "../views/Doacoes/Doacoes.jsx";
import TelaMedicamentos from "../views/Medicamentos/Medicamentos.jsx";
import TelaUsuarios from "../views/Usuarios/Usuarios.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import Upgrade from "views/Upgrade/Upgrade.jsx";
// import UserPage from "views/UserPage/UserPage.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "business_globe",
    component: Dashboard
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    icon: "files_paper",
    component: TelaPedidos
  },
  {
    path: "/doacoes",
    name: "Doações",
    icon: "emoticons_satisfied",
    component: TelaDoacoes
  },
  {
    path: "/medicamentos",
    name: "Medicamentos",
    icon: "design_app",
    component: TelaMedicamentos
  },
  {
    path: "/usuarios",
    name: "Usuários",
    icon: "users_single-02",
    component: TelaUsuarios
  },

  {
    path: "/login",
    name: "Login",
    icon: "files_paper",
    component: Login,
    invisible: true
  },
  {
    path: "/doacao/",
    name: "Exibir Doação",
    icon: "files_paper",
    component: TelaMedicamentos,
    invisible: true
  },
  {
    path: "/editar-medicamento",
    name: "Editar Medicamento",
    icon: "files_paper",
    component: TelaMedicamentos,
    invisible: true
  },
  // { path: "/icons", name: "Icons", icon: "design_image", component: Icons },
  // { path: "/maps", name: "Maps", icon: "location_map-big", component: Maps },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "ui-1_bell-53",
  //   component: Notifications
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: UserPage
  // },
  // {
  //   path: "/extended-tables",
  //   name: "Table List",
  //   icon: "files_paper",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: Typography
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: Upgrade
  // },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
