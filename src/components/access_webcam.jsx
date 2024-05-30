import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import faceDetectionUtils from '../utils/detect_faces'; // Adjust the import path as needed

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const faces = await faceDetectionUtils.detectFaces(video);
        faceDetectionUtils.drawResults(faces, canvasRef, video);
      }
    }, 100); // Increased interval to reduce load

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-full max-w-3xl h-[480px] p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl">
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={{ width: 640, height: 480 }}
          className="rounded-lg w-full h-full shadow-lg"
        />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      </div>
    </div>
  );
};

export default WebcamComponent;
