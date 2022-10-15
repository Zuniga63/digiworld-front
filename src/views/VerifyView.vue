<script setup>
import CustomLabel from '../components/Forms/CustomLabel.vue';
import CustomInput from '../components/Forms/CustomInput.vue';
import axios from 'axios';
import AuthenticationCard from '../components/Forms/AuthenticationCard.vue';
import CustomButton from '../components/Forms/CustomButton.vue';
</script>

<script>
export default {
  data() {
    return {
      // Form properties
      email: null,
      // FORM STATE
      loading: false,
      error: '',
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;
        this.error = '';
        const url = `/user/virify/${encodeURIComponent(this.email)}`;
        const res = await axios.patch(url);
        const user = res.data.user;

        // Persit data and redirect to home
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push('/');
        }
        this.error = 'Bad response.';
      } catch (error) {
        this.error = 'Email is not verify!';
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    enabled() {
      return this.email;
    },
  },
  components: { CustomLabel, CustomInput, AuthenticationCard },
};
</script>
<template>
  <authentication-card>
    <template #logo>
      <img
        src="https://www.digiworld.com.co/assetsInicio/img/iconL.svg"
        alt="logo"
      />
    </template>

    <div v-if="error">
      <div class="text-center font-medium text-red-600">
        Whoops! Something went wrong.
      </div>
      <span class="block text-center text-sm text-gray-400">{{ error }}</span>
    </div>

    <form @submit.prevent="onSubmit">
      <header class="mb-4">
        <h2 class="text-center text-2xl">Verify Email</h2>
      </header>
      <div>
        <!-- USERNAME -->
        <div>
          <custom-label value="Email" class="mb-1" for="username" required />
          <custom-input
            v-model="email"
            type="email"
            id="username"
            class="block"
            required
            :disabled="loading"
          />
        </div>
      </div>
      <footer class="mt-4 flex items-center justify-end">
        <CustomButton class="ml-4" :disabled="!enabled || loading">
          <span v-if="!loading">Verify</span>
          <span v-else class="animate-pulse">Process...</span></CustomButton
        >
      </footer>
    </form>
  </authentication-card>
</template>
