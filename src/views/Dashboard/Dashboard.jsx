import React from "react";
import { Redirect } from "react-router-dom";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardTitle,
//   Row,
//   Col,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   // Table
// } from "reactstrap";
// react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// function that returns a color based on an interval of numbers

import { PanelHeader } from "../../components";
// import { PanelHeader, Stats, CardCategory } from "components";

// import {
//   // dashboardPanelChart,
//   dashboardShippedProductsChart,
//   dashboardAllProductsChart,
//   dashboard24HoursPerformanceChart
// } from "variables/charts.jsx";

// import { tasks } from "variables/general.jsx";

class Dashboard extends React.Component {
  render() {

    if (!localStorage.getItem('token')) {
      return <Redirect to={'/login'} />;
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
        </div>
      </div>
    );
  }
}

export default Dashboard;
