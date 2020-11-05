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
    <div v-if="!addMode" class="card-footer bg-transparent text-center font-weight-bold">
      <a @click.prevent="addTask" href="#"><i class="fas fa-plus-circle"></i><br />Add Task</a>
    </div>
    <div v-else class="card-footer">
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Task Title">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description" placeholder="Description...">
            </div>
            <button type="submit" class="btn btn-primary form-control">Add</button>
            <button @click.prevent="cancelTask" type="butoon" class="btn btn-primary form-control">Cancel</button>
        </form>
    </div>
  </div>
</template>

<script>
import TaskComponent from "./TaskComponent";
export default {
  name: "CategoryComponent",
  data(){
      return {
          addMode : false
      }
  },
  props: ['cat','tasks','currentId'],
  components : {
      TaskComponent
  },
  methods: {
      addTask(){
          this.addMode = true
      },
      cancelTask(){
          this.addMode = false
      }
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