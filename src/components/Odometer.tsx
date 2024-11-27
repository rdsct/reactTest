import React from "react";

interface OdometerProps {
  odometerRef: React.RefObject<HTMLDivElement>;
}

const Odometer: React.FC<OdometerProps> = ({ odometerRef }) => {
  return (
    <div className="p-8 rounded-lg text-center">
      <div
        ref={odometerRef}
        className="odometer text-6xl font-bold text-white text-center"
      ></div>
    </div>
  );
};

export default Odometer;
