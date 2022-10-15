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
      // Lists
      types: [],
      roles: [],
      // Form properties
      username: null,
      password: null,
      name: null,
      typeDocument: null,
      document: null,
      email: null,
      phone: null,
      role: null,
      // FORM STATE
      loading: false,
      hasError: false,
    };
  },
  methods: {
    async fetchData() {
      axios
        .get('/tipe-document/all')
        .then(res => (this.types = res.data))
        .catch(error => console.log(error));

      axios
        .get('/rol/all')
        .then(res => (this.roles = res.data))
        .catch(error => console.log(error));
    },
    getData() {
      return {
        username: this.username,
        passWord: this.password,
        name: this.name,
        tipe_document: this.typeDocument,
        document: this.document,
        email: this.email,
        phone: this.phone,
        rol: this.role,
      };
    },
    async onSubmit() {
      try {
        this.loading = true;
        this.hasError = false;
        await axios.post('/auth/register', this.getData());
        this.$router.push('/login');
      } catch (error) {
        console.log(error);
        this.hasError = true;
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    enabled() {
      return (
        this.username &&
        this.password &&
        this.name &&
        this.typeDocument &&
        this.document &&
        this.email &&
        this.phone &&
        this.role
      );
    },
  },
  beforeMount() {
    this.fetchData();
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

    <div v-if="hasError">
      <div class="text-center font-medium text-red-600">
        Whoops! Something went wrong.
      </div>
    </div>

    <form @submit.prevent="onSubmit">
      <header class="mb-4">
        <h2 class="text-center text-2xl">Formulario de Registro</h2>
      </header>
      <div>
        <!-- USERNAME && ROL -->
        <div class="mb-2 grid grid-cols-1 gap-x-2 md:grid-cols-5">
          <!-- USERNAME -->
          <div class="md:col-span-3">
            <custom-label
              value="Username"
              class="mb-1"
              for="username"
              required
            />
            <custom-input
              v-model="username"
              type="text"
              id="username"
              class="block"
              required
              :disabled="loading"
            />
          </div>
          <!-- ROLE -->
          <div class="md:col-span-2">
            <custom-label value="Role" class="mb-1" for="role" required />
            <select
              id="role"
              class="w-full rounded-md border border-gray-300 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              v-model="role"
              :disabled="loading"
            >
              <option :value="null" disabled>Selecciona uno</option>
              <option
                v-for="userRol in roles"
                :key="userRol._id"
                :value="userRol._id"
              >
                {{ userRol.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- email -->
        <div class="mb-2">
          <CustomLabel value="Email" class="mb-2" for="email" required />
          <CustomInput
            v-model="email"
            type="email"
            id="email"
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

        <!-- NAME -->
        <div class="mb-2">
          <custom-label value="Full Name" class="mb-2" for="name" required />
          <custom-input
            v-model="name"
            type="text"
            id="name"
            class="block"
            required
            :disabled="loading"
          />
        </div>

        <!-- DOCUMENT -->
        <div class="mb-2 grid grid-cols-1 gap-x-2 md:grid-cols-4">
          <div class="md:col-span-2">
            <custom-label
              value="Document"
              class="mb-1"
              for="document"
              required
            />
            <custom-input
              v-model="document"
              type="number"
              id="document"
              class="block"
              required
              :disabled="loading"
            />
          </div>
          <div class="md:col-span-2">
            <custom-label
              value="Type"
              class="mb-1"
              for="documentType"
              required
            />
            <select
              id="documentType"
              class="w-full rounded-md border border-gray-300 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              v-model="typeDocument"
              :disabled="loading"
            >
              <option :value="null" disabled>Selecciona uno</option>
              <option
                v-for="docType in types"
                :key="docType._id"
                :value="docType._id"
              >
                {{ docType.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- phone -->
        <div>
          <custom-label value="Phone" class="mb-1" for="phone" required />
          <custom-input
            v-model="phone"
            type="number"
            id="phone"
            class="block"
            required
            :disabled="loading"
          />
        </div>
      </div>
      <footer class="mt-4 flex items-center justify-end">
        <RouterLink
          to="/login"
          class="text-sm text-gray-600 underline hover:text-gray-900"
          >already registered?</RouterLink
        >
        <CustomButton class="ml-4" :disabled="!enabled || loading">
          <span v-if="!loading">Register</span>
          <span v-else class="animate-pulse">Process...</span></CustomButton
        >
      </footer>
    </form>
  </authentication-card>
</template>
