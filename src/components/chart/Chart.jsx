import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <div className="chart">
      {/* <div className="test-flex-item"> */}
      <h3 className="chartTitle">{title}</h3>
      {/*       <ResponsiveContainer width="100%" aspect={4 / 1}> */}
      <ResponsiveContainer width="95%" aspect={3 / 1} className="test">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#8d8d8d;" />
          <Line type="monotone" dataKey={dataKey} stroke="#df0a3f" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
      {/* </div> */}
    </div>
  );
}
