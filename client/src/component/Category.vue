<template>
  <div>
    <section>
        <div id="category-box">
            <div class="card" v-if="cat">
                <div class="card-body">
                <h5 class="card-title text-center">{{cat.name}}</h5>
                <draggable :list="filterTask" group="task" :move="onMove" :category="cat" @end="updateCategory">
                <Task
                v-for="task in filterTask"
                :key="task.id"
                :task="task"
                :id="task.id"
                @toEdit="toEdit"
                @toDelete="toDelete"
                >
                </Task>
                </draggable>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import Task from './Task'
import draggable from 'vuedraggable'
import axios from '../../config/axios'

export default {
    name: 'Category',
    props : ['tasks', 'cat'],
    components : {
        Task,
        draggable
    }, 
    data () {
        return {
            currentId: null,
            currentCategoryId: null,
            // card: []
        }
    },
    computed: {
        filterTask () {
            return this.tasks.filter(el => el.CategoryId == this.cat.id)
        }
    },
    methods: {
        toEdit(payload){
            this.$emit('toEdit', payload)
        },
        toDelete(payload){
            this.$emit('toDelete', payload)
        },
        onMove (evt) {
            this.currentId = evt.draggedContext.element.id
            this.currentCategoryId = evt.relatedContext.component.$attrs.category.id
        },
        updateCategory () {
            const access_token = localStorage.getItem('access_token')
            const id = this.currentId
            const CategoryId = this.currentCategoryId
            console.log(id, CategoryId)
            axios({
                url: `/tasks/${id}`,
                method: 'PATCH',
                headers: {
                    access_token: access_token
                },
                data: {
                    CategoryId: CategoryId
                }
            })
            .then(data=> {
                console.log(data)
                this.$emit('fetchTasks')
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    // created() {
    //     this.card = this.filterTask
    // }
}
</script>

<style>

</style>