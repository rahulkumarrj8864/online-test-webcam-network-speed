import React from "react";
import { Detector } from "react-detect-offline";

export default function ConnectionStatus(props) {
  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            props.children
          ) : (
            <div>
              <h1>Are u offline</h1>
            </div>
          )
        }
      />
    </>
  );
}
