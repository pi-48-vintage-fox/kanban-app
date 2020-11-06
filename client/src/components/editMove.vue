<template>
   <form @submit.prevent='move'>
      <div class="form-group mt-3">
        <select id="inputState" class="form-control" v-model="category">
          <option disabled selected>Choose Category</option>
          <option value="backlog">Backlog</option>
          <option value="to do">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-block btn-large">
        Move
      </button>

    </form>
</template>

<script>
import axios from '../config/axios'
export default {
  name:'editMove',
  data(){
    return{
      category:''
    }
  },
  methods:{
    move(){
      let id = this.idTask
      let access_token = localStorage.getItem('access_token')

      axios({
        url:`/task/category/${id}`,
        method:'PATCH',
        headers:{access_token},
        data:{
          category:this.category
        }
      })
      .then(res=>{
        this.$emit('changeMove',false)
        this.refreshData()
      })
      .catch(err=>{
        console.log(err.response.msg)
      })
    }
  },
  props:['idTask','refreshData']
}
</script>

<style>

</style>