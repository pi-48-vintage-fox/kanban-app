<template>
    <div class="card" id="task">
        <div class="card-body">
            <h5 class="card-title">{{task.title}}</h5>
            <p class="card-text">{{task.description}}</p>
             <small class="form-text text-muted">Created by: {{task.User.name}}</small>
            <a href="#" class="card-link" @click="switchToEdit">Edit</a>
            <a href="#" class="card-link">Delete</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'task',
    props: ['task'],
    methods: {
        switchToEdit(){
            this.$emit('changePage', 'EditPage')
        }
    }
}
</script>

<style>

</style>