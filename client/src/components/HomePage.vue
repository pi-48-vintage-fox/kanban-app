<template>
    <div class="home-page mt-5" id="home-page">
                <div v-if="errorMessage != ''" class="alert alert-danger alert-dismissible fade show" role="alert">
                    {{errorMessage}}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="row justify-content-center">
                    <Category v-for="(category, i) in categories"
                        :key="i"
                        :category="category"
                        :tasks="tasks"
                        :errorMessage="errorMessage"
                        :show="show"
                        :taskAdd="taskAdd"
                        :getTaskById="getTaskById"
                        :categories="categories"
                        @addTask="addTask"
                        @getById="getById"
                        @changeCategory="changeCategory"
                        @editTitleTask="editTitleTask"
                        @deleteTask="deleteTask"
                        @fetchTasks="fetchTasks" 
                    >
                    </Category>
                </div>
    </div>
</template>

<script>
import Category from './Category';
export default {
    name: 'HomePage',
    props: [
        'tasks', 
        'errorMessage', 
        'show',
        'taskAdd', 
        'getTaskById',
        'categories'
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
        Category
    }
}
</script>

<style>

</style>