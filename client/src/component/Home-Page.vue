<template>
<div id="home-page">
    <Navbar></Navbar>
    <div id="body-homepage" class="container">
        
        <Category
            v-for="(cat, i) in category"
            :key="i"
            :tasks="tasks"
            :cat="cat">
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
    props: ['tasks', 'category']

}
</script>

<style>

</style>