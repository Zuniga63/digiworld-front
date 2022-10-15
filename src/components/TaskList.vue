<script>
import TaskListItem from './TaskListItem.vue';
export default {
  props: {
    tasks: Object,
    users: Object,
    isProfessor: Boolean,
  },
  components: { TaskListItem },
};
</script>
<template>
  <div class="shadow-lg shadow-slate-900">
    <h3
      class="rounded-t border border-slate-800 bg-slate-800 px-4 py-2 text-center font-bold text-gray-200"
    >
      Task List
    </h3>

    <div
      class="grid max-h-96 gap-3 overflow-y-scroll rounded-b border-x border-b border-slate-800 px-4 py-2"
    >
      <TaskListItem
        v-for="task in tasks"
        :key="task._id"
        :task="task"
        :users="users"
        :is-professor="isProfessor"
      />
    </div>
  </div>
</template>
