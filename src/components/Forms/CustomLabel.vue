<script>
export default {
  props: {
    value: String,
    required: Boolean,
  },
  computed: {
    requireClass() {
      return {
        "after:content-['*'] after:ml-0.5 after:text-red-500": this.required,
      };
    },
  },
};
</script>

<template>
  <label class="block text-sm font-medium text-gray-700" :class="requireClass">
    <span v-if="value">{{ value }}</span>
    <span v-else><slot></slot></span>
  </label>
</template>
