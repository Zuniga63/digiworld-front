<script>
export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
    role: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>
<template>
  <nav class="border-b border-gray-100 bg-white">
    <!-- Primary Navigation Menu -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex w-24 shrink-0 items-center lg:w-40">
          <img
            src="https://www.digiworld.com.co/assetsInicio/img/iconL.svg"
            alt="logo"
          />
        </div>

        <div class="hidden sm:block">
          <h2 class="text-center text-xl font-bold text-gray-800">
            {{ user?.name }}
          </h2>
          <p class="text-center text-sm font-bold italic text-gray-700">
            {{ role?.name }}
          </p>
        </div>

        <button
          class="rounded border border-red-600 bg-red-500 px-4 py-2 font-bold text-white shadow shadow-red-400 transition-opacity hover:opacity-80 active:opacity-100"
          @click="logout"
        >
          Log out
        </button>
      </div>
    </div>
  </nav>
</template>
