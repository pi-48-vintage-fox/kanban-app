<template>
  <div>
     <div class="container">
       
          <h3 class="row justify-content-center mt-5">Add Task</h3>
          <div class="row justify-content-center m2">
              <img src="" alt="" srcset="">
          
            <form @submit.prevent="update">
            <div class="form-group">
                <label>Title</label>
                <textarea v-model="title" type="" class="form-control"></textarea> 
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Update To</label>
                <select v-model="category" class="form-control" id="exampleFormControlSelect1">
                <option value="" selected disabled>--Selected--</option>
                <option value="backlog">Backlog</option>
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>

        </div>
      </div>
  </div>
</template>
 
<script>
import axios from "../../config/axios"
export default {
    name: "updateData",
    data() {
        return {
            title: this.detailTask.title,
            category: this.detailTask.category 
        }
    },
    props: [ 'detailTask'],
    methods: {
        update() {
            
            let access_token = localStorage.getItem("access_token")
            let idParams = this.detailTask.id

            axios({
                url: `/task/${idParams}`,
                method: "PUT",
                headers: { access_token },
                data: {
                    title: this.title,
                    category: this.category
                }
            })
            .then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                    })
                this.$emit("afterUpdate")
            })
            .catch(err => {
                 Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data
                    })
            })
        }
    }

}
</script>

<style>

</style>