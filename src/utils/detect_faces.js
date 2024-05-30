import '@mediapipe/face_detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceDetection from '@tensorflow-models/face-detection';

let detector = null;

const loadModel = async () => {
  if (!detector) {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
    };

    // Create a promise that rejects after 5 seconds
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Model loading timed out')), 5000)
    );

    // Use Promise.race to apply the timeout
    detector = await Promise.race([
      faceDetection.createDetector(model, detectorConfig),
      timeout
    ]);
  }
};

const detectFaces = async (video) => {
  if (!video || video.readyState !== 4) return [];

  if (!detector) {
    await loadModel();
  }

  const estimationConfig = { flipHorizontal: false };
  const faces = await detector.estimateFaces(video, estimationConfig);

  return faces;
};

const drawResults = (faces, canvasRef, video) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  faces.forEach((face) => {
    const { xMin, yMin, width, height } = face.box;

    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(xMin, yMin, width, height);

    face.keypoints.forEach((keypoint) => {
      const { x, y } = keypoint;
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
      ctx.fill();
    });
  });
};

const faceDetectionUtils = {
  detectFaces,
  drawResults,
};

export default faceDetectionUtils;
