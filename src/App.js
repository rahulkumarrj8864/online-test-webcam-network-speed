import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

import ConnectionStatus from "./Connection/ConnectionStatus";
import Loaction from "./Connection/Loaction";
import { Button } from "bootstrap";
import SpeedTest from "./Connection/SpeedTest";

export default function App({ wifiSpeed }) {
  const [currentCount, setCount] = useState(1);
  let timer = () => setCount(currentCount + 1);
  const location = Loaction();
  const webRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const showImage = () => {
    // console.log(webRef.current.getScreenshot())
    console.log(webRef.current);
  };
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  //   useEffect(
  //     () => {
  //         if (currentCount <= 0) {
  //             return;
  //         }
  //         const id = setInterval(timer, 1000);
  //         return () => clearInterval(id);
  //     },
  //     [currentCount]
  // );
  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    setInterval(timer, 1000);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  console.log(
    location.loaded ? JSON.stringify(location) : "Location Data Not Aviable"
  );

  const [imgSrc, setImgSrc] = React.useState(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  console.log(currentCount);
  return (
    <>
      <ConnectionStatus>
        {/* <Webcam ref={webRef} audio={true}/>
      <button onClick={() => showImage()}>Caputure</button> */}
        <div className="">
          <Webcam audio={true} ref={webcamRef} screenshotFormat="image/jpeg" />
          <button onClick={capture}>Capture photo</button>
          {imgSrc && <img src={imgSrc} />}
          <div className="d-flex flex-row">
            {capturing ? (
              <>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleStopCaptureClick}
                >
                  Stop Capture
                </button>
                <p>{currentCount}</p>
              </>
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={handleStartCaptureClick}
              >
                Start Capture
              </button>
            )}
            {recordedChunks.length > 0 && (
              <button
                className="btn btn-outline-danger ms-5"
                onClick={handleDownload}
              >
                Download
              </button>
            )}
          </div>
        </div>
      </ConnectionStatus>

      {location.loaded ? JSON.stringify(location) : "Location Data Not Aviable"}

      <SpeedTest wifiSpeed={wifiSpeed} />
    </>
  );
}
