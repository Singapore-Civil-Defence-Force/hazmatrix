<script setup lang="ts">
/**
 * This component scans a QR code,
 * - On valid QR code link: Redirect to the specified view
 * - On invalid QR code link: Highlight QR code border in frame and show on frame the text version of the code
 */

import { ref } from "vue";
import { useRouter } from "vue-router";

import { baseURL } from "../config";
import { QrcodeStream } from "vue-qrcode-reader";

const emit = defineEmits(["qrcode-detected"]);

const router = useRouter();

const baseUrlLength = baseURL.length;

const Cameras = ["auto", "rear", "front", "off"] as const;
type Camera = typeof Cameras[number];

/**
 * Returns the camera string of the last used camera if any,
 * else defaults to the "auto" camera string.
 * Reference: https://stackoverflow.com/questions/36836011/checking-validity-of-string-literal-union-type-at-runtime
 */
function getLastUsedCamera(): Camera {
  const camera: unknown = localStorage.getItem("vue-qrcode-reader:camera");
  const cameraString = Cameras.find((validCamera) => validCamera === camera);
  // `cameraString` comes from the list of `sheepNames` so the compiler is happy.
  return cameraString ? cameraString : "auto";
}

// Camera value defaults to auto to let the library figure out which camera to use if there is no last used camera type
const camera = ref<Camera>(getLastUsedCamera());

// Switch current camera type and save it to localStorage, and the current camera type will be reused the next time too
function switchCamera() {
  // Simple camera switcher with options (auto, rear, front)
  switch (camera.value) {
    case "auto":
      // Default to rear when switching off auto mode
      camera.value = "rear";
      localStorage.setItem("vue-qrcode-reader:camera", "rear");
      break;
    case "front":
      camera.value = "rear";
      localStorage.setItem("vue-qrcode-reader:camera", "rear");
      break;
    case "rear":
      camera.value = "front";
      localStorage.setItem("vue-qrcode-reader:camera", "front");
      break;
  }
}

// Paint an outline over detected QR Code
function paintOutline(detectedCodes: Array<any>, ctx: any) {
  for (const detectedCode of detectedCodes) {
    const qrcodeValue = detectedCode.rawValue;

    // @todo Can this just use a find method or includes method directly?
    // Only parse and emit qrcode value if its of the correct format
    if (qrcodeValue.slice(0, baseUrlLength) === baseURL) {
      // Stop scanning by turning camera off
      camera.value = "off";

      // Navigate to new route path using router
      router.push({ path: qrcodeValue.slice(baseUrlLength) });

      // Emit event to allow parent component to unmount/remove QR code scanner component using a v-if
      emit("qrcode-detected");
    } else {
      /* Highlight invalid QR Code in red */
      const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

      // Set color of outline
      ctx.strokeStyle = "red";

      ctx.beginPath();
      ctx.moveTo(firstPoint.x, firstPoint.y);
      for (const { x, y } of otherPoints) {
        ctx.lineTo(x, y);
      }
      ctx.lineTo(firstPoint.x, firstPoint.y);
      ctx.closePath();
      ctx.stroke();

      /* paint center text */
      const { boundingBox, rawValue } = detectedCode;
      const centerX = boundingBox.x + boundingBox.width / 2;
      const centerY = boundingBox.y + boundingBox.height / 2;
      const fontSize = Math.max(
        12,
        (50 * boundingBox.width) / ctx.canvas.width
      );

      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#35495e";
      ctx.strokeText(detectedCode.rawValue, centerX, centerY);

      ctx.fillStyle = "#5cb984";
      ctx.fillText(rawValue, centerX, centerY);
    }
  }
}

// Handle any errors during initialization
async function logErrors(promise: Promise<MediaTrackCapabilities>) {
  try {
    await promise;
  } catch (error) {
    if (!(error instanceof Error)) return;

    console.error(error);
    alert("Failed to initialize camera!");

    if (error.name === "NotAllowedError") {
      // user denied camera access permisson
    } else if (error.name === "NotFoundError") {
      // no suitable camera device installed
    } else if (error.name === "NotSupportedError") {
      // page is not served over HTTPS (or localhost)
    } else if (error.name === "NotReadableError") {
      // maybe camera is already in use
    } else if (error.name === "OverconstrainedError") {
      // did you requested the front camera although there is none?
    } else if (error.name === "StreamApiNotSupportedError") {
      // browser seems to be lacking features
    }
  }
}
</script>

<template>
  <div>
    <QrcodeStream :track="paintOutline" :camera="camera" @init="logErrors">
      <button @click="switchCamera">
        <img src="../assets/camera-switch.svg" alt="switch camera" />
      </button>
    </QrcodeStream>
  </div>
</template>
