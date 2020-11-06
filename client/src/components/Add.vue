<template>
  <div class="container mt-5" >
    <div class="row justify-content-center"  >
   
      <form class="mt-5">
        <div class="form-group">
          <label for="task">New Task</label>
          <input
            v-model="task_form"
            type="text"
            class="form-control"
            id="task"
           
          >
        </div>
        <div class="form-group">
          <label for="textarea">Description</label>
          <textarea 
              id="textarea" 
              class="materialize-textarea"
              v-model="description_form"
              >
          </textarea>
        </div>
        <button 
          type="submit" 
          class="btn btn-primary"
          @click.prevent="postNewTask"
        >Submit
        </button>
        <button 
          type="submit" 
          class="btn btn-primary red accent-2"
          @click.prevent="backHome"
        >Cancel
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from '../config/axios'
export default {
  name: "Add",
  pageName: "add-page",
  data(){
    return {
      task_form :'',
      description_form: ''
    }
  },
  methods: {

    postNewTask(){
      
      console.log('ini di postNewTask -->', this.task_form);
      const access_token = localStorage.getItem('access_token')
      axios({
        url: '/tasks',
        method: 'POST',
        headers: {
          access_token
        },
        data: {
          title: this.task_form,
          description: this.description_form
        }
      })
        .then(({data}) => {
            console.log(data);
            this.task_form = ''
            this.description_form = ''
            this.backHome()
            
        })
        .catch(err => {
          console.log(err.response);
          
        })  
    },
    backHome(){
        this.$emit('backToHome', 'home-page')
    }
  }
};
</script>
