<template>
    <div class="container ml-4 mt-3">
        <div class="baris">
            <category
                v-for="(cat,i) in categories"
                :key="i"
                :category="cat"
                :tasks="tasks"
                @deleteTask="deleteTask"
                @patchTask="patchTask"
                @showEdit="showEdit"
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
    methods: {
        deleteTask(payload){
            this.$emit('deleteTask', payload)
        },
        patchTask(payload){
            this.$emit('patchTask', payload)
        },
        // showEdit(payload){
        //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        //     this.$emit('showEdit', payload)
        // }
    }
}
</script>

<style>

</style>