<script setup lang="ts">
import { useSlots } from "vue";
import { notif } from "../notif";

const slots = useSlots();

const props = defineProps<{
  hideIcon?: boolean;
  textToCopy?: string;
}>();

/**
 * Write a string to the user's clipboard
 */
async function copy() {
  // Allow user to copy the slot content directly
  // But this requires a runtime check to ensure that either a string is
  // passed in or the slot is defined since it cant be done statically.
  const copyString = props.textToCopy
    ? props.textToCopy
    : slots.default && slots.default()[0].children?.toString();

  if (!copyString) alert("RUNTIME ERR: CopyOnClick copy string is empty!");

  await navigator.clipboard.writeText(copyString || "").catch(function () {
    // Notify user on failed copy
    notif.showNotif("Failed to copy!");
  });

  // Notify user on successful copy
  notif.showNotif("Copied!");
}
</script>

<template>
  <span class="icon-text is-clickable" @click="copy">
    <slot></slot>
    <img
      v-if="!hideIcon"
      src="../assets/copy-icon.png"
      style="margin-left: 0.6em; height: 1.5em"
    />
  </span>
</template>
