<template>
  <div class="col-lg-3">
        <div class="card d-flex flex-column">
            <div class="card-header">
                <h5>{{category}}</h5>
                <div v-if="category == 'Backlog'" class="add-task">
                    <button class="btn" style="border-radius: 50%;" @click="show = !show" ><i class="fas fa-plus"></i></button>
                </div>
                <transition name="fade">  
                    <div v-show="show" class="mt-3" id="form-add-task">
                        <form @submit.prevent="addTask" action="" class="mt-3">
                            <div class="form-group">
                                <input v-model="taskAdd.title" placeholder="title" type="text" style="width: 100%;" class="form-control">
                            </div>
                            <button type="submit" style="border-radius: 50%;" class="btn"><i class="fas fa-save"></i></button>
                            <button type="reset" @click="show = !show" style="border-radius: 50%;" class="btn"><i class="far fa-window-close"></i></button>
                        </form>
                    </div>
                </transition>
            </div>
            <div class="card-body" id="card-tasks">
            <Task
                v-for="task in tasks" :key="task.id"
                :task="task"
                :getTaskById="getTaskById"
                :category="category"
                :errorMessage="errorMessage"
                :categories="categories"
                @addTask="addTask"
                @getById="getById"
                @changeCategory="changeCategory"
                @editTitleTask="editTitleTask"
                @deleteTask="deleteTask"
                @fetchTasks="fetchTasks" 
            >
            </Task>
            </div>
        </div>
    </div>
</template>

<script>
import Task from './Task';
export default {
    name: 'Category',
    props: [
        'tasks', 
        'errorMessage', 
        'show',
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
    components: {
        Task
    }
}
</script>

<style>

</style>