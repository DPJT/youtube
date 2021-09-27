import Chart from "../../components/chart/Chart";
import Skills from "../../components/Skills/Skills";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

//dj mod
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
// // preferred way to import (from `v4`). Uses `animate__` prefix.
// import "animate.css/animate.min.css";

// // Alternate way to use classes without prefix like `animated fadeIn`
// import "animate.css/animate.compat.css";

// store.addNotification({
//   title: "Wonderful!",
//   message: "teodosii@react-notifications-component",
//   type: "success",
//   insert: "top",
//   container: "top-right",
//   // animationIn: ["animate__animated", "animate__fadeIn"],
//   // animationOut: ["animate__animated", "animate__fadeOut"],
//   dismiss: {
//     duration: 5000,
//     onScreen: true,
//   },
// });

export default function Home() {
  return (
    <div className="home">
      {/* <ReactNotification /> */}
      <Skills></Skills>
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
