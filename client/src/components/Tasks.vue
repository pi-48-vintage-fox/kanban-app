<template>
    <div class="cardedit">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title" style="font-size: small;">{{ tasks.title }}</h5>
                <!-- <h6 class="card-subtitle mb-2 text-muted" style="font-size: smaller;">13 March 2020</h6> -->
                <p class="card-text" style="font-size: smaller;">{{ tasks.description }}</p>
                <div class="edit-delete-check">
                    <i v-on:click.prevent="move()" class="fa fa-check" aria-hidden="true" style="margin-right: 10px; cursor: pointer;"></i>
                    <i v-on:click.prevent="showEdit()" class="fa fa-pencil" aria-hidden="true" style="margin-right: 10px; cursor: pointer;"></i>
                    <i v-on:click.prevent="deleteTask()" class="fa fa-trash" aria-hidden="true" style="margin-right: 10px; cursor: pointer;"></i>
                </div>
        
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskPage',
    props: [ 'tasks' ],
    methods: {
        move() {
            let category = "Backlog"
            if(this.tasks.category === "Backlog") {
                category = "Products"
            } else if (this.tasks.category === "Product") {
                category = "Development"
            } else if (this.tasks.category === "Development") {
                category = "Done"
            }
            let payload = {
                category: category,
                id: this.tasks.id
            }
            this.$emit('move', payload)
        },
        deleteTask() {
            let payload = {
                id: this.tasks.id
            }
            this.$emit('deleteTask', payload)
        },
        showEdit() {
            let payload = {
                id: this.tasks.id,
                title: this.tasks.title,
                description: this.tasks.description
            }
            this.$emit('showEdit', payload)
        }
    }
}
</script>

<style>

</style>