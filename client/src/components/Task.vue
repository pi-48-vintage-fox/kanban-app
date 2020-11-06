<template>
    <div class="card draggable shadow-sm" draggable="true">
        <div class="card-body p-2">
            <div v-if="taskData.id !== task.id">
            <div class="card-title">
                <i class="fas fa-trash float-right" @click="deleteTask(task.id)"></i>
                <a href="#" class="lead font-weight-light">{{task.title}} </a>
            </div>
            </div>
            <div class="card-title" v-else-if="task.id == taskData.id">
                <form v-on:submit.prevent="editTask(task.id)">
                    <div class="form-group">
                        <label for="edit">Title: </label>
                        <input type="text" v-model="taskData.title">
                    </div>
                    <button class="btn btn-primary btn-sm" type="submit">Edit</button>
                </form>
            </div>
                <p>
                    {{task.tag}}
                </p>
                <button class="btn btn-primary btn-sm" @click.prevent="toEdit(task.id)">Edit</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'task',
    data(){
        return {
            taskData: {
                id:'',
                title:'',
                CategoryId:''
            }
        }
    },
    props : ["task"],
    methods :{
        deleteTask(id){
            this.$emit("deleteTask",id)
        },
        toEdit(id){
           this.taskData.id = id
        },
        editTask(id){
            const obj = {
                id: id,
                title: this.taskData.title
            }
            this.$emit("editTask",obj)
            this.taskData.id = ''
            this.taskData.title = ''
        }
    }
}
</script>

<style>

</style>