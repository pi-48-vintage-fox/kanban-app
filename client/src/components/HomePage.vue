<template>
    <div class="container ml-4 mt-3">
        <div class="baris">
            <category
                v-for="(cat,i) in categories"
                :key="i"
                :category="cat"
                :tasks="tasks"
            >                
            </category>
        </div>
    </div>
</template>

<script>
import category from './Category'
export default {
    props: ['categories','tasks'],
    components: {
        category
    },  
}
</script>

<style>

</style>