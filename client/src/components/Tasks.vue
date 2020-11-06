<template>
    <div class="card task-card" style="width: 15rem">
        <div class="card-body dalam">
            <h5 class="task-title">{{task.title}}</h5>
            <p class="descriptionP">{{task.description}}</p>
            <p class="descriptionP">{{task.category}}</p>
            <p class="descriptionP">Assigned by: </p>
            <div class="buttons">
                <a href="#" class="edit">EDIT</a>
                <a href="#" class="delete">DELETE</a>
                <a href="#" class="continue">CONTINUE>></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['task'],
}
</script>

<style>

</style>