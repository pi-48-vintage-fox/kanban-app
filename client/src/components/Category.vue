<template>
  <div class="row" style="width: 100%">
    <div class="col">
      <div v-bind:class="[boardClass]" class="item shadow">
        <h4>{{categoryDetail.name}}</h4>
        <Task
          v-for="task in taskPerCategory"
          :categoryDetail="categoryDetail"
          :key="task.id"
          :task="task"
          @toEditPage="toEditPage"
          @toEditCategory="toEditCategory"
          @toDelete="toDelete"
        >
        </Task>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "Category",
  components: {
    Task,
  },
  props: ["categoryDetail","tasks"],
  computed :{
    taskPerCategory(){
      return this.tasks.filter(element => {
        return element.CategoryId === this.categoryDetail.id})      
    },
    boardClass(){
      if (this.categoryDetail.name === "Backlog") {
        return 'planning'
      }
      if (this.categoryDetail.name === "Todo") {
        return 'todo'
      }
      if(this.categoryDetail.name === "Doing"){
        return 'doing'
      }
      if (this.categoryDetail.name === "Done") {
        return 'done'
      }
    }
  },
  methods: {
    toEditPage(payload) {
      this.$emit("toEditPage", payload);
    },
    toEditCategory(payload) {
      this.$emit("toEditCategory", payload)
    },
    toDelete(payload) {
      console.log(payload)
      this.$emit("toDelete", payload)
    }
  },
  created(){
   console.log(categoryDetail,'<<<<<<<< ini categorydetail')
  }
};
</script>

<style>
</style>