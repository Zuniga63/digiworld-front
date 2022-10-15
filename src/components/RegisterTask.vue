<script setup>
import CustomLabel from './Forms/CustomLabel.vue';
import CustomInput from './Forms/CustomInput.vue';
import CustomButton from './Forms/CustomButton.vue';
import axios from 'axios';
</script>

<script>
export default {
  props: {
    user: Object,
    role: Object,
    users: Object,
  },
  emits: ['refresh'],
  data() {
    return {
      name: '',
      userId: null,
      description: '',
      solution: '',
      loading: false,
      error: '',
    };
  },
  methods: {
    getData() {
      return {
        studentId: this.isProfessor ? this.userId : this.user._id,
        professorId: this.isProfessor ? this.user._id : this.userId,
        name: this.name,
        description: this.description,
        solution: this.solution,
      };
    },
    async onsubmit() {
      if (this.enabled) {
        const data = this.getData();
        try {
          await axios.post('/task/create', data);
          this.$emit('refresh');

          //Reset the form
          this.name = '';
          this.userId = null;
          this.description = '';
          this.solution = '';
        } catch (error) {
          console.log(error);
          this.error = 'has error';
        }
      }
    },
  },
  computed: {
    userList() {
      return this.users.filter(item => item.rol !== this.role._id);
    },
    isProfessor() {
      return this.role?.name === 'Profesor';
    },
    enabled() {
      return this.name && this.userId && this.description;
    },
  },
  components: { CustomLabel, CustomInput, CustomButton },
};
</script>
<template>
  <form @submit.prevent="onsubmit" class="shadow-lg shadow-slate-900">
    <h3
      class="rounded-t border border-slate-800 bg-slate-800 px-4 py-2 text-center font-bold text-gray-200"
    >
      New Task
    </h3>
    <div class="border-x border-slate-800 px-4 py-2">
      <div class="mb-2">
        <CustomLabel value="Name" />
        <custom-input
          v-model="name"
          type="text"
          id="username"
          class="block"
          required
        />
      </div>

      <div class="mb-2">
        <custom-label
          :value="isProfessor ? 'Student' : 'Profesor'"
          class="mb-1"
          for="documentType"
          required
        />
        <select
          id="documentType"
          class="w-full rounded-md border border-gray-300 px-2 py-1 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          v-model="userId"
        >
          <option :value="null" disabled>Pick one</option>
          <option
            v-for="userProfesor in userList"
            :key="userProfesor._id"
            :value="userProfesor._id"
          >
            {{ userProfesor.name }}
          </option>
        </select>
      </div>

      <div class="mb-2">
        <CustomLabel value="Description" />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="3"
          class="w-full px-2 py-2 text-sm"
          v-model="description"
        ></textarea>
      </div>

      <div>
        <CustomLabel value="Solution" required />
        <textarea
          name="solution"
          id="solution"
          cols="30"
          rows="3"
          class="w-full px-2 py-2 text-sm"
          v-model="solution"
          required
        ></textarea>
      </div>

      <span
        class="mt-2 block rounded bg-red-50 py-1 px-4 text-xs text-red-500"
        v-if="error"
        >Missing Props</span
      >
    </div>
    <footer
      class="flex items-center justify-end rounded-b border border-slate-800 bg-slate-700 px-4 py-2"
    >
      <span class="animate-pulse text-gray-100" v-if="loading">Loading...</span>
      <CustomButton :disabled="!enabled" class="ml-4">Add</CustomButton>
    </footer>
  </form>
</template>
