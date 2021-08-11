<template>
  <div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <!-- Modal can be closed by clicking any part of the modal background -->
      <div class="modal-background" @click="showModal = false"></div>

      <div class="modal-content">
        <!-- @todo Remove the 4by3 modifier -->
        <span class="image is-4by3">
          <img :src="imgSrc" />
        </span>

        <!-- Share button to allow user to use webshare if needed -->
        <!-- @todo Close modal automatically once done -->
        <button
          class="button is-fullwidth is-success is-inverted"
          aria-label="share"
          @click="shareViaWebShare"
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
          @click="showModal = true"
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
// @todo Only generate the modal image data source when modal is opened, to prevent it from being pre-generated

export default {
  name: "Share",

  props: ["webshare"],

  data() {
    return {
      showModal: false,
      imgSrc: "https://bulma.io/images/placeholders/1280x960.png",
    };
  },

  methods: {
    shareViaWebShare() {
      navigator.share(this.webshare);
    },
  },
};
</script>
