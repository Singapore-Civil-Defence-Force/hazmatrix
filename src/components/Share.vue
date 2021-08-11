<template>
  <div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <!-- Modal can be closed by clicking any part of the modal background -->
      <div class="modal-background" @click="showModal = false"></div>

      <!-- The whole modal content can be clicked to trigger the web share UI flow -->
      <div class="modal-content" @click="shareViaWebShare">
        <span class="image is-square">
          <img :src="imageDataURI" />
        </span>

        <!-- Share button to let user know that they can click to use webshare if needed, even though the whole modal content is clickable -->
        <button
          class="button is-fullwidth is-success is-inverted"
          aria-label="share"
          style="border-radius: 0px"
        >
          share via link
        </button>
      </div>

      <!-- Modal can be closed by clicking the top right X -->
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="showModal = false"
      />
    </div>

    <div class="columns is-mobile">
      <div class="column">
        <button
          class="button is-light is-fullwidth is-warning"
          @click="showQRcode"
        >
          share - QR
        </button>
      </div>
      <div class="column">
        <button
          class="button is-light is-fullwidth is-success"
          @click="shareViaWebShare"
        >
          share - link
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "Share",

  props: ["webshare"],

  data() {
    return {
      showModal: false,
      imageDataURI: undefined,
    };
  },

  methods: {
    shareViaWebShare() {
      // Ensure navigator.share is available first, quit if not available
      if (!navigator.share) return alert("Web Share not supported on device");

      // Start the share UI, but not awaiting for it, as platforms resolve this at different timings
      navigator.share(this.webshare);

      // Since this can be triggered by clicking the QR code, close modal automatically once share UI flow is triggered
      this.showModal = false;
    },

    // Open up modal and generate QR Code image on the fly
    async showQRcode() {
      this.showModal = true;

      // Only generate image data source when modal opened to prevent pre-generating it and eating ram everytime this component is used
      this.imageDataURI = await QRCode.toDataURL(this.webshare.url, {
        // Use high error resistance rate of ~ 30%
        errorCorrectionLevel: "H",
      });
    },
  },
};
</script>
