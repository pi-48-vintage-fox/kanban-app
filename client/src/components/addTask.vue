<template>
  <div class="login">
    <h1>Input New Task</h1>
    <form @submit.prevent="addingTask">
      <div>
        <input
        type="text"
        name="title"
        placeholder="Task Title"
        required="required"
        v-model="title"
      />
      </div>
      
      <div class="form-group mt-3">
        <label for="inputState" style="color:cyan">Choose Task Category</label>
        <select id="inputState" class="form-control" v-model="category">
          <option values ='' disabled selected>Choose Category</option>
          <option value="backlog">Backlog</option>
          <option value="to do">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>


      <button type="submit" class="btn btn-primary btn-block btn-large">
        Add New Task</button
      ><br />
      <div>
        <button
          @click.prevent="back"
          class="btn btn-primary btn-block btn-large"
        >
          Back
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../config/axios'

export default {
  props:['reloadUlang'],
  data(){
    return{
      title:'',
      category:''
    }
  },
  methods: {
    back() {
      this.$emit("changePage", "home-page");
    },

    addingTask(){
      let access_token = localStorage.getItem('access_token')
      axios({
        url:'/task',
        method:'POST',
        headers:{access_token},
        data:{
          title:this.title,
          category:this.category
        }
      })
        .then(response=>{
          this.$emit('changePage','home-page')
          this.reloadUlang()
        })
        .catch(err=>{
          console.log(err.response.msg)
        })
    }
  },
};
</script>

<style>
</style>