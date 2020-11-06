<template>
  <div class="col kanban">
    
    <h5 class="card-title" style="color: lightcyan">{{catDetail.category}}</h5>
    <kanban v-for="task in categorized" :key="task.id" :task='task' :reload='reloadData'></kanban>

    <button @click.prevent="addtask" class="btn btn-primary btn-block btn-large">Add Activity</button>
   
  </div>
</template>

<script>
import kanban from './kanbanCard'

export default {
  name: "categoryCard",
  components:{
    kanban
  },
  props:['catDetail','tasks','reloadData'],
  methods:{
    addtask(){
      this.$emit('changePage','addTask-page')
    }
  },
  computed:{
    categorized(){
      return this.tasks.filter(task=> (task.category).toLowerCase() == (this.catDetail.category).toLowerCase())
    }
  }
};
</script>

<style>
</style>