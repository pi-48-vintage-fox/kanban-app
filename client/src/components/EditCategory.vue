<template>
  <div class="container" id="edit">
        <form>
          <div style="width: 50%; margin: 200px auto;">
            <h1>Move</h1>
            <div class="form-group">
              <label for="category">category</label>
              <select class="form-control" v-model="category" id="category">
                <option value="2">Todo</option>
                <option value="3">Doing</option>
                <option value="4">Done</option>
              </select>
            </div>
            <div class="row">
              <div class="col">
                <button type="button" @click="editCategory" class="btn btn-primary form-control">Move</button>
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
    name: 'EditCategory',
    data(){
        return{
            category : '',
        }        
    },
    methods : {
        editCategory(){
            let payload = {  
                category: this.category,
                id:this.taskId
            }
            this.$emit('editCategory', payload)
        },
    },
    props:['taskId']
    
}
</script>

<style>

</style>