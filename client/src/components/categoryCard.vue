<template>
  <div class="col kanban">
    
    <h5 class="card-title" style="color: lightcyan">{{catDetail.category}}</h5>
    <kanban v-for="task in categorized" :key="task.id" :task='task'></kanban>
    
    <div @click="pindahKeAdd()">
      <addKanban>
    </div>
  </div>
</template>

<script>
import kanban from './kanbanCard'
import addKanban from './addKanban'
export default {
  name: "categoryCard",
  components:{
    kanban,addKanban
  },
  props:['catDetail','tasks'],
  methods:{
    pindahKeAdd(){
      this.$emit('changePage','addPage')
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