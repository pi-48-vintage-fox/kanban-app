<template>
  <div class="sub-board col-md-3 col-xs-2 col-4">
    <h1>{{ category }}</h1>
    <draggable class="content" :list="tasksPerCategory">
      <Task 
        v-for="task in tasksPerCategory" :key="task.id"
        :task="task"
        @choseTaskId="choseTaskId"
      ></Task>
    </draggable>
  </div>
</template>

<script>
import Task from './Task';
import draggable from 'vuedraggable';
export default {
  name: 'Category',
  data() {
    return {
      chosenTaskId: ''
    }
  },
  components: {
    Task, draggable
  },
  methods: {
    choseTaskId(id) {
      this.chosenTaskId = id
    }
  },
  props: [ 'category', 'tasks' ],
  computed: {
    tasksPerCategory() {
      return this.tasks.filter(element => element.category === this.category)
    }
  }
};
</script>

<style>
</style>