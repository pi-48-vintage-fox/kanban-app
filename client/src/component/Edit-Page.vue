<template>
<div>
    <Navbar
    @changePage="switchToAdd"
    @logOut="logOut">
    </Navbar>
    <div id="edit-form" class="container">
        <form class="container" @submit.prevent="editTask">
            <h3 class="text-center">Edit Task</h3>
            <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input type="text" class="form-control" id="edit_title" placeholder="detailTask.title" v-model="title">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="edit_description" rows="3" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" id="edit_category" v-model="CategoryId">
                <option value="1">Backlog</option>
                <option>ToDo</option>
                <option>Doing</option>
                <option>Done</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" style="background-color: #F6F5F0; color: black; width: auto">Submit</button>
        </form>
    </div>
</div>
</template>

<script>
import Navbar from './Navbar'
export default {
    name: 'EditPage',
    data() {
        return {
            title: '',
            description: '',
            CategoryId: ''
        }
    },
    components : {
       Navbar
    },
    props: ['detailTask'],
    methods: {
        editTask() {
            let payload = {
                email: this.title,
                description: this.description,
                CategoryId: this.CategoryId
            }
            this.$emit('editPut', payload)
        },
        switchToAdd() {
            this.$emit('changePage', 'AddPage')
        },
        logOut(){
            this.$emit('logOut')
        }
    }
}
</script>

<style>

</style>