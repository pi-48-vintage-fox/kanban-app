<template>
  <div>
    <div>
      <nav class="navbar">
        <div>Kanban by Bimo</div>
        <div @click="pindahKeAdd()" class="icons">
          <button type="button" class="btn btn-primary">Add task</button>
          <button type="button" class="btn btn-danger">Logout</button>
        </div>
      </nav>
    </div>
    <section>
      <div>
        <div class="container-fluid">
          <Category
          :tasks="tasks"
          @toEditPage="toEditPage"
          @toEditCategory="toEditCategory"
          @toDelete="toDelete">                
          </Category>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Category from './Category'
export default {
  name: "HomePage",
  components: {
    Category
  },
  props : ['categories', 'tasks'],
  methods : {
    pindahKeAdd(){
      let payload = {
        name : 'add-page'
      }
      this.$emit('changePage', payload)
    },
    toEditPage(payload){
      this.$emit('toEditPage', payload)
    },
    toEditCategory(payload){
      this.$emit('toEditCategory', payload)
    },
    toDelete(payload){
      this.$emit('toDelete', payload)
    }
  }
};
</script>

<style>
</style>