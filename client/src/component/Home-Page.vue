<template>
<div id="home-page">
    <Navbar
    @changePage="switchToAdd">
    </Navbar>
    <div id="body-homepage" class="container">
        
        <Category
            v-for="(cat, i) in category"
            :key="i"
            :tasks="tasks"
            :cat="cat"
            @toEdit="toEdit"
            @toDelete="toDelete">
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
    props: ['tasks', 'category'],
    methods: {
        switchToAdd() {
            this.$emit('changePage', 'AddPage')
        },
        toEdit(payload){
            this.$emit('toEdit', payload)
        },
        toDelete(payload){
            this.$emit('toDelete', payload)
        }
    }

}
</script>

<style>

</style>