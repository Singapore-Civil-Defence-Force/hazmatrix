// Built using simple state management design instead of using a store
// https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api

import { reactive } from "vue";

export const notif = reactive({
  notif: false,
  notifContent: "",
  autoCloseTimeout: undefined,

  /**
   * Clear any timeouts set in showNotif so that the new notif will not
   * close the old notif when time is up.
   */
  clearTimeoutIfAny() {
    // If there is already an auto close timeout set, remove it,
    // So that the auto close will not close a newly requested banner
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = undefined;
    }
  },

  /**
   * Show a notification using the notification banner, with a customisable timeout
   */
  showNotif(notifContent: string, timeout = 3000) {
    this.clearTimeoutIfAny();

    this.notif = true;
    this.notifContent = notifContent;

    // Auto close notif banner after timeout
    // @todo Fix type
    this.autoCloseTimeout = setTimeout(
      () => (this.notif = false),
      timeout
    ) as any;
  },

  /** Clear notification shown if any */
  clearNotif() {
    this.clearTimeoutIfAny();
    this.notif = false;
  },

  /**
   * Write a string to the user's clipboard and show a notification for it
   * Maybe add 1 more param to allow user to customize what is shown in notif
   */
  copy(text: string, showNotif = true) {
    navigator.clipboard
      .writeText(text)
      .then(() => showNotif && this.showNotif("Copied to clipboard!"));
  },
});
