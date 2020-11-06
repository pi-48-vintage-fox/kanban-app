<template>
  <div class="container" id="edit">
        <form @submit.prevent="edit" >
          <div style="width: 50%; margin: 200px auto;">
            <h1>Edit</h1>
            <div class="form-group">
              <label for="task">Task</label>
              <input type="text" v-model="title" class="form-control" id="edit-task">
            </div>
            <div class="row">
              <div class="col">
                <button type="submit" class="btn btn-primary form-control">Edit</button>
              </div>
              <div class="col">
                <button type="button" class="btn btn-primary form-control" id="backtog">Back</button>
              </div>
          </div>
          </div>
        </form>
      </div>
</template>

<script>
export default {
    name: 'EditPage',
    data(){
        return{
            title : '',
        }        
    },
    methods : {
        // edit(payload,id){
        //     let payload = {  
        //         title: this.title,
        //     }
        //     this.$emit('edit', payload)
        // },
    }
    
}
</script>

<style>

</style>