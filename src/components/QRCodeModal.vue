<template>
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background"></div>

    <div class="modal-content">
      <p class="image is-4by3">
        <img :src="imgSrc" alt="" />
      </p>
      <button
        class="button is-fullwidth is-success is-inverted"
        aria-label="share"
        style="border-radius: 0px"
      >
        share
      </button>
    </div>

    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
export default {
  name: "QRCodeModal",

  data() {
    return {
      showModal: true,
      imgSrc: "https://bulma.io/images/placeholders/1280x960.png",
    };
  },
};
</script>
