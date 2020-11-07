<template>
    <section class="task-form card container formbox containermodif" id="edit">
        <div class="col-4">
            <div class="card task-card" style="width: 23rem">
                <div class="card-body dalam">
                    <form action="" @submit.prevent="editTask">
                        <div class="form-group">
                            <label for="edit-title">Title</label>
                            <input class="form-control" type="text" v-model="title">
                        </div>
                        <div class="form-group">
                            <label for="edit-description">Description</label>
                            <textarea class="form-control" type="text" cols="30" rows="4" v-model="description"></textarea>
                        </div> 
                        <div class="form-group">
                            <label for="editcategory">Status</label>
                            <select class="form-control" v-model="category" >
                                <option value="backlog">Backlog</option>
                                <option value="production">Production</option>
                                <option value="inprogress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>       
                        <button type="submit" class="btn btn-info buttons container">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'edit-page',
    data() {
        return {
            title: this.detailTask.title,
            description: this.detailTask.description,
            category: this.detailTask.category,
        }
    },
    props: ['detailTask'],
    methods: {
        editTask(){

        }
    }
}
</script>

<style>

</style>