<script>
export default {
  props: {
    task: Object,
    users: Object,
    isProfessor: Boolean,
  },
  computed: {
    professor() {
      return this.users.find(item => item._id === this.task.professorId);
    },
    student() {
      return this.users.find(item => item._id === this.task.studentId);
    },
  },
};
</script>
<template>
  <div class="rounded border border-gray-400 px-2 py-3 shadow">
    <header>
      <h4 class="text-center font-bold text-gray-800">{{ task.name }}</h4>
      <p class="text-center text-xs italic">
        {{ isProfessor ? this.student.name : this.professor.name }}
      </p>
    </header>
    <p class="py-2 text-gray-700">{{ task.description }}</p>
    <p class="text-sm italic">
      <span class="font-bold">solution</span>: {{ task.solution }}
    </p>
  </div>
</template>
