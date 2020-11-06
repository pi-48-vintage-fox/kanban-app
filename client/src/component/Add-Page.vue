<template>
<div>
    <Navbar
        @changePage="switchToAdd"
        @logOut="logOut">
    </Navbar>

    <div id="add-form" class="container">
        <form class="container" @submit.prevent="addTask">
            <h3 class="text-center">Add Task</h3>
            <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input type="text" class="form-control" id="add_title" placeholder="Title" v-model="title">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="add_description" rows="3" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="CategoryId">
                <option v-for="(cat, i) in categories" 
                :key="i" 
                :value="cat.id">{{cat.name}}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" style="background-color: #F6F5F0; color: black; width: auto">Add Task</button>
        </form>
    </div>
</div>
</template>

<script>
import Navbar from './Navbar'
export default {
    name: 'Add-Page',
    data () {
        return {
            title : '',
            description: '',
            CategoryId: ''
        }
    },
    components: {
        Navbar
    },
    props: ['categories'],
    methods: {
        
        switchToAdd() {
            this.$emit('changePage', 'AddPage')
        },

        addTask(){
            let payload = {
                title: this.title,
                description: this.description,
                CategoryId: this.CategoryId
            }
            this.$emit('addTask', payload)
        },
        
        logOut(){
            this.$emit('logOut')
        }
    }
}
</script>

<style>

</style>