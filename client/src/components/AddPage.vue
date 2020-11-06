<template>
  <div class="container" id="add">
        <form @submit.prevent="add" >
          <div style="width: 50%; margin: 200px auto;">
            <h1>Add</h1>
            <div class="form-group">
              <label for="task">Task</label>
              <input type="text" v-model="title" class="form-control" id="add-task">
            </div>
            <div class="row">
              <div class="col">
                <button type="submit" class="btn btn-primary form-control">Add</button>
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
    name: 'AddPage',
    data(){
        return{
            title : '',
        }        
    },
    methods : {
        add(){
            let payload = {  
                title: this.title,
            }
            this.$emit('add', payload)
        },
    }
    
}
</script>

<style>

</style>