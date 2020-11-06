<template>
  <div class="col kanban">
    
    <h5 class="card-title" style="color: lightcyan">{{catDetail.category}}</h5>
    <draggable :list='categorized' group='task' :move="onMove" :category='catDetail' @end='updateCategory'>
      <kanban v-for="task in categorized" :key="task.id" :task='task' :reload='reloadData' :id='task.id'></kanban>
    </draggable>

    <button @click.prevent="addtask" class="btn btn-primary btn-block btn-large">Add Activity</button>
   
  </div>
</template>

<script>
import kanban from './kanbanCard'
import draggable from 'vuedraggable'
import axios from '../config/axios'

export default {
  name: "categoryCard",
  data(){
    return{
      currentId:null,
      currentCategory:null
    }
  },
  components:{
    kanban,draggable
  },
  props:['catDetail','tasks','reloadData'],
  methods:{
    addtask(){
      this.$emit('changePage','addTask-page')
    },
    onMove(event){
      this.currentId = event.draggedContext.element.id
      this.currentCategory = event.relatedContext.component.$attrs.category.category
    },
    updateCategory(){
      let access_token = localStorage.getItem('access_token')
      axios({
        url:`/task/category/${this.currentId}`,
        method:'PATCH',
        headers:{access_token},
        data:{
          category:this.currentCategory
        }
      })
        .then(res=>{
          this.reloadData()
        })
        .catch(err=>{
          console.log(err.response.msg)
        })
    },
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