<template>
  <!-- form edit -->

    <form @submit.prevent='edittitle'>
      <input type="text" v-model="title" placeholder="Edit Title" required="required" />
      <button type="submit" class="btn btn-primary btn-block btn-large">
        Edit
      </button>
    </form>

</template>

<script>
import axios from '../config/axios'
export default {
  name:'editTitle',
  data(){
    return{
      title:''
    }
  },
  props:['idTask','refreshData'],
  methods:{
    edittitle(){
      let id = this.idTask
      let access_token=localStorage.getItem('access_token')
      axios({
        url:`/task/title/${id}`,
        method:'PATCH',
        headers:{access_token},
        data:{
          title:this.title
        }
      })
      .then(res=>{
        this.$emit('changeShow',false)
        this.refreshData()
      })
      .catch(err=>{
        console.log(err.response.msg)
      })
    }
  }
};
</script>

<style>
</style>