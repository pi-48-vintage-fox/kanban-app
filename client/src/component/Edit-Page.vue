<template>
<div>
    <Navbar
        @changePage="switchToAdd"
        @logOut="logOut"
        @home="home">
    </Navbar>

    <div id="edit-form" class="container">
        <form class="container" @submit.prevent="editTask">
            <h3 class="text-center">Edit Task</h3>
            <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input type="text" class="form-control" id="edit_title" v-model="detailTask.title">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="edit_description" rows="3" v-model="detailTask.description"></textarea>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="detailTask.CategoryId">
                <option v-for="(cat, i) in categories" 
                :key="i" 
                :value="cat.id">{{cat.name}}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" style="background-color: #F6F5F0; color: black; width: auto">Edit Task</button>
        </form>
    </div>
</div>
</template>

<script>
import Navbar from './Navbar'
export default {
    name: 'EditPage',
    components : {
       Navbar
    },
    props: ['detailTask', 'categories'],
    methods: {
        
        editTask() {
            this.$emit('editPut', this.detailTask)
        },

        switchToAdd() {
            this.$emit('changePage', 'AddPage')
        },
        
        logOut(){
            this.$emit('logOut')
        },

        home(page){
            this.$emit('home', page)
        },
    }
}
</script>

<style>

</style>