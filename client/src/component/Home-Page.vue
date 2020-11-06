<template>
<div id="home-page">
    <Navbar
        @changePage="switchToAdd"
        @logOut="logOut"
        @home="home">
    </Navbar>

    <div id="body-homepage" class="container">
        <Category
            v-for="(cat, i) in categories"
            :key="i"
            :tasks="tasks"
            :cat="cat"
            @toEdit="toEdit"
            @toDelete="toDelete"
            @fetchTasks="fetchTasks">
        </Category>
    </div>
</div>
</template>

<script>
import Category from './Category'
import Navbar from './Navbar'

export default {
    name: 'HomePage',
    data() {
        return {
            msg : 'Ini di Homepage'
        }
    },
    components: {
        Category, 
        Navbar
    },
    props: ['tasks', 'categories'],
    methods: {

        home(page){
            this.$emit('home', page)
        },
        switchToAdd() {
            this.$emit('changePage', 'AddPage')
        },

        toEdit(payload){
            this.$emit('toEdit', payload)
        },

        toDelete(payload){
            this.$emit('toDelete', payload)
        },

        logOut(){
            this.$emit('logOut')
        },
        
        fetchTasks(){
            this.$emit('fetchTasks')
        }
    }

}
</script>

<style>

</style>