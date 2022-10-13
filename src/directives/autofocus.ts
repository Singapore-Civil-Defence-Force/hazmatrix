import type { Directive } from "vue";

// Custom directive to autofocus on a input element
// Reference: https://stackoverflow.com/questions/71184825/typing-custom-directives
export default <Directive<HTMLInputElement>>{
  // Focus the element when the bounded element is inserted into the DOM
  inserted(element: HTMLInputElement) {
    element.focus();
  },
};
