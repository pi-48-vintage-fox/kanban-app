<template>
    <div class="card task-card" style="width: 15rem">
        <div class="card-body dalam">
            <h5 class="task-title">{{task.title}}</h5>
            <p class="descriptionP">{{task.description}}</p>
            <p class="descriptionP">{{task.category}}</p>
            <p class="descriptionP">Assigned by: </p>
            <div class="buttons">
                <a href="#" class="edit" @click="showEdit">EDIT</a>
                <a href="#" class="delete" @click="deleteTask">DELETE</a>
                <a href="#" class="continue" @click="patchTask">CONTINUE>></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['task'],
    methods: {
        deleteTask(){
            let payload = {
                id: this.task.id
            }
            this.$emit('deleteTask', payload)
        },
        patchTask(){
            let category
            if(this.task.category=='backlog'){
                category = 'production'
            }else if(this.task.category=='production'){
                category = 'inprogress'
            }else if (this.task.category=='inprogress'){
                category = 'done'
            }else{
                category = 'done'
            }
            let payload = {
                id: this.task.id,
                category
            }
            this.$emit('patchTask', payload)
        },
        // showEdit(){
        //     let payload ={
        //         task: this.task
        //     }
        //     // console.log(payload);
        //     this.$emit('showEdit', payload)
        // }
    }
}
</script>

<style>

</style>