<template>
  <div>
    <qrcode-stream :track="paintOutline" :camera="camera" @init="logErrors">
      <button @click="switchCamera">
        <img src="../assets/camera-switch.svg" alt="switch camera" />
      </button>
    </qrcode-stream>
  </div>
</template>

<script>
/*
  This component scans a QR code,
  
  On valid QR code link: Parse out and pass itemID back to parent component using the 'qrcode-detected' event
  On invalid QR code link: Highlight QR code border in frame and show on frame the text version of the code
*/

import { QrcodeStream } from "vue-qrcode-reader";

export default {
  components: { QrcodeStream },

  data() {
    return {
      // Defaults to auto to let the lib figure out which camera to use
      camera: "auto",
    };
  },

  methods: {
    switchCamera() {
      // Simple camera switcher with options (auto, rear, front)
      switch (this.camera) {
        case "auto":
          // Default to rear when switching off auto mode
          this.camera = "rear";
          break;
        case "front":
          this.camera = "rear";
          break;
        case "rear":
          this.camera = "front";
          break;
      }
    },

    // Paint an outline over detected QR Code
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const qrcodeValue = detectedCode.rawValue;

        // Only parse and emit qrcode value if its of the correct format
        if (
          qrcodeValue.slice(0, 39) === "https://scdf-ims.web.app/#/home?itemID="
        ) {
          // Only emit value back to parent component if qr code is valid
          // Parse out and emit back itemID only
          this.$emit("qrcode-detected", qrcodeValue.slice(39));
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
    },

    logErrors(promise) {
      promise.catch(console.error);
    },
  },
};
</script>
