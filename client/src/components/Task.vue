<template>
    <div v-show="task.category == category.toLowerCase()" class="card border-0">
        <div class="card-body bg-white mt-3">
            <transition name="fade">  
                <div v-show="getTaskById.title != ''" v-if="task.id == getTaskById.id" id="form-edit-task">
                    <form @submit.prevent="editTitleTask(task.id)" action="">
                        <div class="form-group">
                            <input v-model="getTaskById.title" placeholder="title" type="text" style="width: 100%;" class="form-control">
                        </div>
                        <button type="submit" class="btn"><i class="fas fa-save"></i></button>
                        <button type="reset" @click="getTaskById.title = !getTaskById.title" class="btn"><i
                                class="far fa-window-close"></i></button>
                    </form>
                </div>
            </transition>
            <h5 class="card-title">{{task.title}}</h5>
            <p class="card-text">{{task.User.firstName}} {{task.User.lastName}}</p>
        </div>
        <div class="card-footer border-0 bg-light">
            <button @click.prevent="getById(task.id)" class="btn text-success"><i class="fas fa-edit"></i></button>
            <button @click.prevent="deleteTask(task.id)" class="btn text-danger"><i class="fas fa-trash-alt"></i></button>
            <span v-if="category.toLowerCase() != 'done'">
                <button @click.prevent="changeCategory(category.toLowerCase(), task.id)" class="btn text-info"><i class="fas fa-arrow-right"></i></button>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Task",
    props: [
        'task', 
        'errorMessage',
        'taskAdd', 
        'getTaskById',
        'categories',
        'category'
        ],
    methods: {
        addTask(){
            this.$emit('addTask');
        },
        getById(id){
            this.$emit('getById', id);
        },
        changeCategory(category, id){
            if (category == 'backlog') {
                category = 'todo'
            } else if (category == 'todo') {
                category = 'doing'
            } else if (category == 'doing') {
                category = 'done'
            }
            this.$emit('changeCategory', category, id);
        },
        editTitleTask(id){
            this.$emit('editTitleTask', id);
        },
        deleteTask(id){
            this.$emit('deleteTask', id);
        },
        fetchTasks(){
            this.$emit('fetchTasks');
        }
    },
}
</script>

<style>

</style>