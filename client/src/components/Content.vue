<template>
    <section class="content h-100 overflow-hidden w-100">
            <div class="row-content container-fluid px-5">
                <div class="d-flex overflow-auto">
                    <Category
                        v-for="category in categories" 
                        v-bind:key="category.id"
                        :category="category"
                        :categories="categories"
                        :tasks="tasks"
                        :conjunctions="conjunctions"
                        @addTask="addTask"
                        @deleteTask="deleteTask"
                        @editTask="editTask"
                        @updateCatTask="updateCatTask"
                        class="animate__animated animate__backInDown animate__slow overflow-auto"
                        @updateCategoryDrag="updateCategoryDrag"
                        @deleteCategory="deleteCategory"
                    ></Category>

                    <div class="col add-category">
                        <div class="card bg-content rounded-manual">
                            <div class="card-body">
                                <div class="d-flex justify-content-center h-100 mt-2">
                                    <div class="">
                                        <button class="btn">
                                            <h6 class="card-title py-2 px-3 rounded text-primary">Add Category</h6>
                                        </button>
                                        <form action="" @submit.prevent="addCategory">
                                            <div class="form-group">
                                              <label for="">Name: </label>
                                              <input type="text"
                                                class="form-control" name="" id="" aria-describedby="helpId" placeholder="" v-model="category.name">
                                              <small id="helpId" class="form-text text-muted">Help text</small>
                                            </div>
                                            <button class="btn-sm btn-outline-primary text-center form-control" type="submit">Add Category</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
</template>

<script>

import Category from "./Category"

export default {
    name: "Content",
    data(){
        return {
            category: {
                name: null
            }
        }
    },
    components: {
        Category
    },
    methods: {
        addTask(data){
            this.$emit("addTask", data)
        },
        deleteTask(taskId){
            this.$emit("deleteTask", taskId)
        },
        editTask(data){
            this.$emit("editTask", data)
        },
        updateCatTask(data){
            this.$emit("updateCatTask", data)
        },
        updateCategoryDrag(payload){
            console.log(payload, 'ni dr content')
            this.$emit("updateCategoryDrag", payload)
        },
        addCategory(){
            const data = {
                name: this.category.name
            }
            this.$emit("addCategory", data)
            this.category.name = null
        },
        deleteCategory(id){
            this.$emit("deleteCategory", id)
        }
    },
    props: ["categories", "tasks", "conjunctions"]
}
</script>
<style>
    .add-category{
        margin-top: 5.5rem;
    }
</style>