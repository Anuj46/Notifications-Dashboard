import React from "react";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react";
import "./card.css";

//   {
//     value: "125",
//     label: "Delivery Rate",
//     sublabel: "Compared To Last Month",
//     percentage: {
//       value: "8%",
//       increase: true,
//     },
//   },

const Card = ({ data }) => {
  return (
    <div className="tile">
      <span className="tile_count">{data.value}</span>
      <span className="tile_label">{data.label}</span>
      <div className="tile_footer">
        <div
          className="tile_rates"
          style={{
            color: data.percentage.increase ? "#7ecc25ff" : "#ff6868ff",
            background: data.percentage.increase ? "#edffd8ff" : "#fdddddff",
          }}
        >
          {data.percentage.increase ? (
            <ArrowUp size={10} />
          ) : (
            <ArrowDown size={10} />
          )}
          <span className="tile_rate">{data.percentage.value}</span>
        </div>
        <span className="tile_rate_label">{data.sublabel}</span>
      </div>
    </div>
  );
};

export default Card;
