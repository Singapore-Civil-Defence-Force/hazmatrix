import type { Directive } from "vue";

/*
  This autofocus directive no longer works because the vue2 "inserted" hook
  is now deprecated in vue3, and vue3's mounted hook works differently as the
  inserted hook is called when the element is inserted into the parent node,
  which means that it will work even when wrapped in keep-alive, however for
  mounted hook, it will only be called when mounted into DOM which means that
  it does not work for when the component is re-activated again.

  However the new vue3 directives do not have any hooks that will support this
  use case, therefore the solution for now is to just add a onActivated hook
  in the setup functions directly to trigger the autofocus

  Ref:
  https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks
  https://v2.vuejs.org/v2/guide/custom-directive.html#Hook-Functions
  https://v3-migration.vuejs.org/breaking-changes/custom-directives.html
  https://vuejs.org/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance
  https://vuejs.org/api/built-in-components.html#keepalive
  https://vuejs.org/api/composition-api-lifecycle.html#onactivated
  https://github.com/vuejs/core/issues/2349
*/

// Custom directive to autofocus on a input element
// Reference: https://stackoverflow.com/questions/71184825/typing-custom-directives
export default <Directive<HTMLInputElement>>{
  // Focus the element when the bounded element is mounted onto the DOM
  mounted(element: HTMLInputElement) {
    element.focus();
  },
};
