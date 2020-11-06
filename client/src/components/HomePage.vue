<template>
    <div class="home-page mt-5" id="home-page">
                <div v-if="errorMessage != ''" class="alert alert-danger alert-dismissible fade show" role="alert">
                    {{errorMessage}}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-3">
                        <div class="card d-flex flex-column">
                            <div class="card-header">
                                <h5>Backlog</h5>
                                <div class="add-task">
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
                                <div v-for="task in tasks" :key="task.id" v-show="task.category == 'backlog'" class="card border-0">
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
                                      <p class="card-text"><img class="" alt="profile" width="20px"> {{task.User.firstName}} {{task.User.lastName}}</p>
                                    </div>
                                    <div class="card-footer border-0 bg-light">
                                        <button @click.prevent="getById(task.id)" class="btn text-success"><i class="fas fa-edit"></i></button>
                                        <button @click.prevent="deleteTask(task.id)" class="btn text-danger"><i class="fas fa-trash-alt"></i></button>
                                        <button @click.prevent="changeCategory('todo', task.id)" class="btn text-info"><i class="fas fa-arrow-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-header">
                                <h5>Todo</h5>
                            </div>
                            <div class="card-body bg-secondary">
                                <div v-for="task in tasks" :key="task.id" v-show="task.category == 'todo'" class="card">
                                    <div class="card-body bg-white">
                                        <transition name="fade">
                                            <div v-show="getTaskById.title != ''" v-if="task.id == getTaskById.id" id="form-edit-task">
                                                <form @submit.prevent="editTitleTask(task.id)" action="">
                                                    <div class="form-group">
                                                        <input v-model="getTaskById.title" placeholder="title" type="text" style="width: 100%;"
                                                            class="form-control">
                                                    </div>
                                                    <button type="submit" class="btn"><i class="fas fa-save"></i></button>
                                                    <button type="reset" @click="getTaskById.title = !getTaskById.title" class="btn"><i
                                                            class="far fa-window-close"></i></button>
                                                </form>
                                            </div>
                                        </transition>
                                      <h5 class="card-title">{{task.title}}</h5>
                                    <p class="card-text"><img class="" alt="profile" width="20px"> {{task.User.firstName}}
                                        {{task.User.lastName}}</p>
                                    </div>
                                    <div class="card-footer border-0 bg-light">
                                        <button @click="getById(task.id)" class="btn text-success"><i class="fas fa-edit"></i></button>
                                        <button @click="deleteTask(task.id)" class="btn text-danger"><i class="fas fa-trash-alt"></i></button>
                                        <button @click="changeCategory('doing', task.id)" class="btn text-info"><i
                                                class="fas fa-arrow-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-header">
                                <h5>Doing</h5>
                            </div>
                            <div class="card-body bg-secondary">
                                <div v-for="task in tasks" :key="task.id" v-show="task.category == 'doing'" class="card">
                                    <div class="card-body bg-white">
                                        <transition name="fade">
                                            <div v-show="getTaskById.title != ''" v-if="task.id == getTaskById.id" id="form-edit-task">
                                                <form @submit.prevent="editTitleTask(task.id)" action="">
                                                    <div class="form-group">
                                                        <input v-model="getTaskById.title" placeholder="title" type="text" style="width: 100%;"
                                                            class="form-control">
                                                    </div>
                                                    <button type="submit" class="btn"><i class="fas fa-save"></i></button>
                                                    <button type="reset" @click="getTaskById.title = !getTaskById.title" class="btn"><i
                                                            class="far fa-window-close"></i></button>
                                                </form>
                                            </div>
                                        </transition>
                                      <h5 class="card-title">{{task.title}}</h5>
                                    <p class="card-text"><img class="" alt="profile" width="20px"> {{task.User.firstName}}
                                        {{task.User.lastName}}</p>
                                    </div>
                                    <div class="card-footer border-0 bg-light">
                                        <button @click="getById(task.id)" class="btn text-success"><i class="fas fa-edit"></i></button>
                                        <button @click="deleteTask(task.id)" class="btn text-danger"><i class="fas fa-trash-alt"></i></button>
                                        <button @click="changeCategory('done', task.id)" class="btn text-info"><i class="fas fa-arrow-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-header">
                                <h5>Done</h5>
                            </div>
                            <div class="card-body bg-secondary">
                                <div v-for="task in tasks" :key="task.id" v-show="task.category == 'done'" class="card">
                                    <div class="card-body bg-white">
                                        <transition name="fade">
                                            <div v-show="getTaskById.title != ''" v-if="task.id == getTaskById.id" id="form-edit-task">
                                                <form @submit.prevent="editTitleTask(task.id)" action="">
                                                    <div class="form-group">
                                                        <input v-model="getTaskById.title" placeholder="title" type="text" style="width: 100%;"
                                                            class="form-control">
                                                    </div>
                                                    <button type="submit" class="btn"><i class="fas fa-save"></i></button>
                                                    <button type="reset" @click="getTaskById.title = !getTaskById.title" class="btn"><i
                                                            class="far fa-window-close"></i></button>
                                                </form>
                                            </div>
                                        </transition>
                                      <h5 class="card-title">{{task.title}} {{task.id}}</h5>
                                    <p class="card-text"><img class="" alt="profile" width="20px"> {{task.User.firstName}}
                                        {{task.User.lastName}}</p>
                                    </div>
                                    <div class="card-footer border-0 bg-light">
                                        <button @click="getById(task.id)" class="btn text-success"><i class="fas fa-edit"></i></button>
                                        <button @click="deleteTask(task.id)" class="btn text-danger"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    props: [
        'tasks', 
        'errorMessage', 
        'show',
        'taskAdd', 
        'getTaskById'
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
    }
}
</script>

<style>

</style>