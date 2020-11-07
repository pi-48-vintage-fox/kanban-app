<template>
    <div class="col">
        <h5 class="card-title card">{{category.title}}</h5>
        <div class="card card-luar" style="width: 18rem">
            <div class="card-body">
                <taskscard
                v-for="(task,i) in filteredTasks"
                :key="i"
                :task="task"
                @deleteTask="deleteTask"
                @patchTask="patchTask"
                @showEdit="showEdit"
                >
                </taskscard>
            </div>
        </div>
    </div>
</template>

<script>
import taskscard from './Tasks'
export default {
    props: ['tasks','category'],
    components: {
        taskscard
    },
    computed: {
        filteredTasks(){
            console.log(this.category.category);
            console.log('aaaaasuuu');
            console.log(this.tasks);
            if(!this.tasks){

            }else{
                return this.tasks.filter(task=>{
                    return task.category==this.category.category
                 })
            } 
        }
    },
    methods: {
        deleteTask(payload){
            this.$emit('deleteTask', payload)
        },
        patchTask(payload){
            this.$emit('patchTask', payload)
        },
        // showEdit(payload){
        //     // console.log(payload);
        //     this.$emit('showEdit', payload)
        // }
    }
}
</script>

<style>

</style>