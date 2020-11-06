<template>
  
    <div class="col-3 overflow-auto category" style="background-color:#f9d3d2;"> 
        {{categoryDetail.title}}
    
         
      <Task 
        v-for="(task) in taskFilter"
        :key="task.id" 
        :task="task"
        :categoryName="categoryDetail.title"
        :fetchTasks="fetchTasks"
      >
      </Task>
    </div>

</template>


<script>
import Task from './Task'
export default {
  name: 'Category',
  components: {
    Task
  },
  props: ['categories','categoryDetail', 'tasks', 'fetchTasks'],
  computed: {
    taskFilter(){
      const category = this.categoryDetail.title.toLowerCase().split(' ').join('')
      return this.tasks.filter(task => task.category === category)
    }
  },
  
}
</script>
