// import React from 'react'

// import { ReactInternetSpeedMeter } from 'react-internet-meter'
// import 'react-internet-speed-meter/dist/index.css'

// const SpeedTest = () => {
//        <ReactInternetSpeedMeter
//             txtSubHeading="Internet is too slow"
//             outputType="alert"
//             customClassName={null}
//             txtMainHeading="Opps..."
//             pingInterval={4000} // milliseconds
//             thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte"
//             threshold={100}
//             imageUrl="https://res.cloudinary.com/dcwxsms2l/image/upload/v1610376487/pexels-ivan-samkov-6291574_bzqgps.jpg"
//             downloadSize="1781287"  //bytes
//             callbackFunctionOnNetworkDown={(speed)=>console.log(`Internet speed is down ${speed}`)}
//             callbackFunctionOnNetworkTest={(speed)=>setwifiSpeed(speed)}
//           />
// }
// export default SpeedTest

import React, { useState } from "react";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import "react-internet-meter/dist/index.css";

const SpeedTest = () => {
  const [wifiSpeed, setwifiSpeed] = useState("Checking ... ");
  return (
    <div>
      <ReactInternetSpeedMeter
        txtSubHeading={"Download Speed " + wifiSpeed + " MB/s"}
        outputType="alert"
        customClassName={null}
        txtMainHeading="Opps..."
        pingInterval="4000" // sec
        thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
        threshold={100}
        imageUrl="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg"
        downloadSize="1781287"
        callbackFunctionOnNetworkDown={(speed) =>
          console.log(`Internet speed    down ${speed}`)
        }
        callbackFunctionOnNetworkTest={(speed) => setwifiSpeed(speed)}
      />
      {/* <HomePage
   wifiSpeed={wifiSpeed}/>  */}
    </div>
  );
};
export default SpeedTest;
