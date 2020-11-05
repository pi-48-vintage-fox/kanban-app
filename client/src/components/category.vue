<template>
  <div>
    <div class="container mt-3">
        <div class="row">
            <div class="col-3">
                <h5 class="text-center">BackLog</h5>
                <div class="col my-2 p-3 card overflow-auto" style="height: 500px">
                    <task v-for="backlog in fetchBacklog"
                    :key="fetchBacklog.id"
                    ></task>
                </div>
            </div>

             <div class="col-3">
                <h5 class="text-center">Todos</h5>
                <div class="col my-2 p-3 card overflow-auto" style="height: 500px">
                    <task v-for="backlog in fetchTodo"
                    :key="fetchTodo.id"></task>
                </div>
            </div>

            <div class="col-3">
                <h5 class="text-center">Doing</h5>
                <div class="col my-2 p-3 card overflow-auto" style="height: 500px">
                    <task v-for="backlog in fetchDoing"
                    :key="fetchDoing.id"></task>
                </div>
            </div>

            <div class="col-3">
                <h5 class="text-center">Done</h5>
                <div class="col my-2 p-3 card overflow-auto" style="height: 500px">
                    <task v-for="backlog in fetchDone"
                    :key="fetchDone.id"
                    ></task>
                </div>
            </div>
        </div>
       
  </div>
</template>

<script>
import task from "./task"
import axios from "../../config/axios"
export default {
    name: "category",
    data() {
        return {
          newData: []
        }
    },
    props: [ ],
    methods: {
       fetchTask() {
            let access_token = localStorage.getItem("access_token")
            axios({
                url: "/task",
                headers: { access_token }
            })
            .then(response => {
                this.newData = response.data
                
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    computed: {
        fetchTodo() {
            return this.newData.filter(el => el.category == "todo")
        },
        fetchBacklog() {
            return this.newData.filter(el => el.category == "backlog")
        },
        fetchDoing() {
            return this.newData.filter(el => el.category == "doing")
        },
        fetchDone() {
            return this.newData.filter(el => el.category == "done")
        }
    },
    components: {
        task,
    },
    created() {
        this.fetchTask()
    }

   
}
</script>

<style>

</style>