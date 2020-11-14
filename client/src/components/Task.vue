<template>
<div class="card mb-4 rounded-manual">
    <div class="card-body">
        <div class="row justify-content-between">
            <div class="col-sm-8 col-auto">
                <div v-if="taskData.id !== task.id">
                    <div class="title-task">
                        <h6 class="card-title badge-primary py-2 px-3 rounded-pill font-weight-bold">{{task.title}}</h6>
                    </div>
                    <div class="main-task">
                        <p class="card-text mt-5">{{task.description}}</p>
                        <span class="text-muted font-weight-light">by: {{filterUser.User.name}}</span>
                    </div>
                </div>
                <form action="" v-on:submit.prevent="editTask(task.id)" v-else-if="taskData.id == task.id && isEdit">
                    <div class="form-group">
                        <label for="edit-title-task">Title: </label>
                        <input type="text"
                            class="form-control" name="edit-title-task" id="edit-title-task" aria-describedby="helpId" placeholder="" v-model="taskData.title">
                    </div>
                    <div class="form-group">
                        <label for="edit-description-task">Description: </label>
                        <input type="text"
                            class="form-control" name="edit-description-task" id="edit-description-task" aria-describedby="helpId" placeholder="" v-model="taskData.description">
                    </div>
                    <button class="btn btn-primary" type="submit">Edit Task</button>
                </form>

                <form action="" v-on:submit.prevent="updateCatTask(task.id)" v-else-if="taskData.id == task.id && isUpdate">
                    <div class="form-group">
                        <select name="" id="" v-model="selected">
                            <option :value="cat.id" v-for="cat in categories" :key="cat.id">{{cat.name}}</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" type="submit">Update</button>
                </form>
                
            </div>
            <div class="col-sm-4 col-auto d-flex justify-content-start align-items-start">
                <button class="btn py-2" @click="formEditTask(task.id)">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
                <button class="btn" @click="deleteTask(task.id)">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </div>
                <!-- <button class="btn-sm btn-outline-dark rounded-manual"
                @click="formUpdateCat(task.id)"
                >+</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name: "Task",
    data(){
        return{
            taskData: {
                id: "",
                title: null || this.task.title,
                description: null || this.task.description,
                CategoryId: ""
            },
            isUpdate: false,
            isEdit: false,
            selected: "" // CategoryId
        }
    },
    methods: {
        deleteTask(taskId){
            Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
            }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Deleted!',
                'Your imaginary task has been deleted.',
                'success'
                )
                this.$emit("deleteTask", taskId)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                'Cancelled',
                'Your imaginary task is safe :)',
                'error'
                )
            }
            })
        },
        formEditTask(taskId) {
            this.taskData.id = taskId
            this.isEdit = true
        },
        // formUpdateCat(taskId){
        //     this.taskData.id = taskId
        //     this.isUpdate = true
        // },
        editTask(taskId){
            const data = {
                id: taskId,
                title: this.taskData.title,
                description: this.taskData.description
            }
            this.$emit("editTask", data)
            this.taskData.id = ""
            this.isEdit = false
        },
        updateCatTask(taskId){
            const data = {
                id: taskId,
                CategoryId: this.selected
            }
            this.$emit("updateCatTask", data)
            this.isUpdate = false
            this.taskData.title = this.task.title
            this.taskData.description = this.task.description
        }
    },
    props: ["task", "categories", "conjunctions"],
    computed: {
        filterUser(){
            let user = this.conjunctions.find(e => e.TaskId == this.task.id)
            return user
        }
    }
}
</script>

<style>
    .task-manual {
        max-height: 100vh;
    }
</style>