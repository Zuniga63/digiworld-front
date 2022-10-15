<script setup>
import { RouterLink } from 'vue-router';
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
      userinfo: null,
      password: null,
      // FORM STATE
      loading: false,
      error: '',
    };
  },
  methods: {
    getData() {
      return {
        userinfo: this.userinfo,
        passWord: this.password,
      };
    },
    async onSubmit() {
      try {
        this.loading = true;
        this.error = '';
        const res = await axios.post('/auth/login', this.getData());
        const { user, token } = res.data;

        // Persit data and redirect to home
        if (user && token) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
          this.$router.push('/');
        }
        this.error = 'Bad response.';
      } catch (error) {
        this.error = '¡User or password wrong!';
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    enabled() {
      return this.userinfo && this.password;
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
        <h2 class="text-center text-2xl">Login</h2>
      </header>
      <div>
        <!-- USERNAME -->
        <div>
          <custom-label value="Username" class="mb-1" for="username" required />
          <custom-input
            v-model="userinfo"
            type="text"
            id="username"
            class="block"
            required
            :disabled="loading"
          />
        </div>

        <!-- PASSWORD -->
        <div class="mb-2">
          <custom-label value="Password" class="mb-2" for="password" required />
          <custom-input
            v-model="password"
            type="password"
            id="password"
            class="block"
            required
            :disabled="loading"
          />
        </div>
      </div>
      <footer class="mt-4 flex items-center justify-end">
        <RouterLink
          to="/register"
          class="text-sm text-gray-600 underline hover:text-gray-900"
          >Register?</RouterLink
        >
        <CustomButton class="ml-4" :disabled="!enabled || loading">
          <span v-if="!loading">Log in</span>
          <span v-else class="animate-pulse">Process...</span></CustomButton
        >
      </footer>
    </form>
  </authentication-card>
</template>
