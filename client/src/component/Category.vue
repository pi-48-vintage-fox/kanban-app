<template>
  <div>
    <section>
        <div id="category-box">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title text-center">{{cat.name}}</h5>
                <Task
                v-for="task in filterTask"
                :key="task.id"
                :task="task"
                @toEdit="toEdit"
                @toDelete="toDelete"
                >
                </Task>
                </div>
                <div class="card-footer text-muted text-center">
                    Add Task
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import Task from './Task'
export default {
    name: 'Category',
    props : ['tasks', 'cat'],
    components : {
        Task
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
        }
    }
}
</script>

<style>

</style>