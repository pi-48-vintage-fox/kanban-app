<template>
    <div class="card" id="task">
        <div class="card-body">
            <h5 class="card-title">{{task.title}}</h5>
            <p class="card-text">{{task.description}}</p>
             <small class="form-text text-muted">Created by: {{task.User.name}}</small>
            <a href="#" class="card-link" @click.prevent="toEdit">Edit</a>
            <a href="#" class="card-link" @click.prevent="toDelete">Delete</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'task',
    props: ['task'],
    methods: {
        toEdit(){
            let payload = {
                pageName: 'EditPage',
                id: this.task.id,
                title: this.task.title,
                description: this.task.title,
                CategoryId: this.task.CategoryId
            }
            // console.log(payload)
            this.$emit('toEdit', payload)
        },
        toDelete() {
            let payload = {
                id: this.task.id
            }
            this.$emit('toDelete', payload)
        }
    }
}
</script>

<style>

</style>