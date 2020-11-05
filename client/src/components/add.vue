<template>
  <div>
    <div class="container">
        
          <h3 class="row justify-content-center mt-5">Add Task</h3>
          <div class="row justify-content-center m2">
              <img src="" alt="" srcset="">
           
            <form @submit.prevent="add">
            <div class="form-group">
                <label >Title</label>
                <textarea v-model="newData.title"  type="" class="form-control"></textarea> 
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>

        </div>
      </div>
  </div>
</template>

<script>
import axios from "../../config/axios"
export default {
    name: "add",
    data() {
        return {
            newData: {
                title: '',
                category: 'backlog'
            }
        }
    },
    methods: {
       
        add() {
        let access_token = localStorage.getItem("access_token")
        let title = this.newData.title
        let category = 'backlog'
           axios({
               url: "/task",
               method: "POST",
               headers: { access_token },
               data: { 
                   title,
                   category
                }
           })
           .then(response => {
               this.$emit('add')
           })
           .catch(err => {
               console.log(err);
           })
        }
    }
}
</script>

<style>

</style>