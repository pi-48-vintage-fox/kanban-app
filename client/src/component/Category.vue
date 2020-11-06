<template>
  <div>
    <section>
        <div id="category-box">
            <div class="card" v-if="cat">
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
import draggable from 'vuedraggable'
export default {
    name: 'Category',
    props : ['tasks', 'cat'],
    components : {
        Task,
        draggable
    }, 
    data () {
        return {
            params: {
                    client_id: "365819165459-244erimjnuagnlvtirgm2t6isncdinpq.apps.googleusercontent.com"
            },
                // only needed if you want to render the button with the google ui
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
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
        }
    }
}
</script>

<style>

</style>