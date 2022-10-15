<script setup>
import axios from 'axios';
import NavBar from '../components/NavBar.vue';
import RegisterTask from '../components/RegisterTask.vue';
import TaskList from '../components/TaskList.vue';
</script>

<script>
export default {
  data() {
    return {
      user: null,
      role: null,
      tasks: [],
      users: [],
    };
  },
  methods: {
    getUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user;
    },
    async getRole(user) {
      const currentRoles = [];
      let currentRole = null;

      await axios
        .get('/rol/all')
        .then(res => {
          currentRoles.push(...res.data);
          if (user) {
            currentRole = res.data.find(r => r._id === user.rol);
          }
        })
        .catch(error => console.log(error));

      return currentRole;
    },
    async getTasks(user, role) {
      const task = [];
      if (user && role) {
        let url = '/task';

        if (role && role.name === 'Profesor') url += '/byProfessor/';
        else url += '/byStudent/';

        url += user._id;
        await axios
          .get(url)
          .then(({ data }) => {
            task.push(...data);
          })
          .catch(error => console.log(error));
      }

      return task;
    },
    /**
     * This method get the user list without actual user
     * @param {*} user Actual user
     */
    async getUsersWithoutUser(user) {
      const result = [];
      try {
        const res = await axios.get('/user/all').then();
        const users = res.data.filter(item => item._id !== user._id);
        result.push(...users);
      } catch (error) {
        console.log(error);
      }

      return result;
    },
    async fetchTasks() {
      const tasks = await this.getTasks(this.user, this.role);
      this.tasks = tasks;
    },
  },
  computed: {
    isProfessor() {
      return this.role?.name === 'Profesor';
    },
  },
  async beforeMount() {
    const user = this.getUser();
    const role = await this.getRole(user);
    const tasks = await this.getTasks(user, role);
    const users = await this.getUsersWithoutUser(user);

    this.user = user;
    this.role = role;
    this.tasks = tasks;
    this.users = users;
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar :user="user" :role="role" />

    <main class="grid grid-cols-12 gap-4 py-10 px-8">
      <!-- Task List -->
      <div class="col-span-3">
        <TaskList :users="users" :tasks="tasks" :is-professor="isProfessor" />
      </div>
      <!-- Task Board -->
      <div class="col-span-6"></div>
      <!-- FORM for Create Task -->
      <div class="col-span-3">
        <RegisterTask
          :role="role"
          :user="user"
          :users="users"
          @refresh="fetchTasks"
        />
      </div>
    </main>
  </div>
</template>
