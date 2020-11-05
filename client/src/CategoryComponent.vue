<template>
  <div class="card border-primary mt-3 mb-3" :class="`order-${cat.order}`" style="max-width: 18rem; max-height: 500px">
    <div class="card-header font-weight-bold text-center text-light display-4" :class="`${cat.color}`">
      {{cat.name}}
    </div>
    <!-- List -->
    <div style="overflow: auto; position: relative">
      <TaskComponent
      v-for="task in tasksCategory" 
      :key="task.id"
      :task="task"
      :currentId="currentId"
      ></TaskComponent>
    </div>
    <!-- List End -->
    <div class="card-footer bg-transparent text-center font-weight-bold">
      <a href="#"><i class="fas fa-plus-circle"></i><br />Add Task</a>
    </div>
  </div>
</template>

<script>
import TaskComponent from "./TaskComponent";
export default {
  name: "CategoryComponent",
  props: ['cat','tasks','currentId'],
  components : {
      TaskComponent
  },
  computed: {
      tasksCategory(){
          return this.tasks.filter(task => task.category === this.cat.name)
      }
  }
};
</script>

<style>
</style>