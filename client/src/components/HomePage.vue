<template>
  <div>
    <div>
      <nav class="navbar">
        <div>Kanban by Bimo</div>
        <div class="icons">
          <button @click="pindahKeAdd" type="button" class="btn btn-outline-primary">Add task</button>
          <button @click="logout" type="button" class="btn btn-outline-danger">Logout</button>
        </div>
      </nav>
    </div>
    <section>
      <div>
        <div class="container-fluid">
          <Category
          v-for="(cat,i) in categories"
          :key="i"
          :categoryDetail="cat"
          :categories="categories"
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
    Category,
  },
  props : ['categories', 'tasks'],
  methods : {
    logout(){
      localStorage.clear()
      let payload = {
        name : 'login-page'
      }
      this.$emit('changePage', payload)
    },

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
  },
  created(){
    console.log(this.tasks ,'<<<<<<< ini dari homepage')
  }
};
</script>

<style>
</style>