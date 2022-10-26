import { KeyValueChartParams, KeyValueChartData, KeyValueSizeSettings } from "./sharedChartParams";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { BarChart as Inner, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from "recharts";

const BarChart = (props: Readonly<KeyValueChartParams<KeyValueChartData, KeyValueSizeSettings>>) => {
  const darkMode = useDarkMode();
  const stroke = darkMode ? "var(--dark-text)" : "var(--light-text)";

  return (
    <Inner width={props.width} height={props.height} data={props.data} syncId={props.syncId} margin={props.margin} onClick={props.onClick}>
      {props.grid ? <CartesianGrid strokeDasharray="3 3" stroke={stroke} /> : ""}
      <XAxis dataKey="key" stroke={stroke} />
      <YAxis stroke={stroke} />
      {props.tooltip ? <Tooltip wrapperClassName={`bg-${darkMode ? "dark" : "light"}`} cursor={{
        stroke: stroke
      }} /> : ""}
      {props.settings.map((set, index) => <Bar dataKey={`values.${set.key}`} type={set.type?.toString()} barSize={set.size && set.size > 0 ? set.size : 25} fill={darkMode ? set.fillDark : set.fill} fillOpacity={set.opacity} key={index} name={set.key} />)}
      {props.legend ? <Legend /> : ""}
    </Inner>
  );
};

export default BarChart;
