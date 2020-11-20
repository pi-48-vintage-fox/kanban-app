<template>
         <div class="col-sm-6 col-md-4 col-xl-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title text-uppercase text-truncate py-2">{{categor.name}}</h6>
                        <div class="items border border-light">
                            <Task
                                v-for="(task, i) in filterTaskByCategor"
                                :key = "i"
                                :task="task"
                                @deleteTask="deleteTask"
                                @changePage="changePage"
                                @editTask="editTask"
                                @toCategory="toCategory"
                            ></Task> 
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
import Task from './Task'
export default {
    name: 'Category',
    components: {
        Task
    },
    methods :{
        deleteTask(id){
            this.$emit("deleteTask",id)
        },
        changePage(){
            this.$emit('changePage', 'edit-page')
        },
        editTask(obj){
            this.$emit("editTask",obj)
        },
        toCategory(obj){
            this.$emit("toCategory", obj)
        }
    },
    computed:{
        filterTaskByCategor(){
            let filter = this.tasks.filter(e =>{
                return e.CategoryId == this.categor.id
            })
            return filter
        }
    },
    props : ["categor","tasks"],
}
</script>

<style>

</style>