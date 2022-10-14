import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

import './assets/main.css';

const app = createApp(App);

// Confing axios
axios.defaults.baseURL = import.meta.env.VITE_BACK_END_URL;
if (window) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token && user) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // Verify if the user is authenticated
    axios
      .get(`/user/byId/${JSON.parse(user)._id}`)
      .then(res => {
        const newUserData = res.data;
        localStorage.setItem('user', JSON.stringify(newUserData));
      })
      .catch(() => localStorage.clear());
  } else {
    // Clear the local storage
    localStorage.clear();
  }
}

app.use(router);

app.mount('#app');
