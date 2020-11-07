<template>
    <section class="task-form card container formbox containermodif" id="add">
        <div class="col-4">
            <div class="card task-card" style="width: 23rem">
                <div class="card-body dalam">
                    <form action="" @submit.prevent="addSubmit">
                        <div class="form-group">
                            <label for="add-title">Title</label>
                            <input class="form-control" type="text" v-model="title">
                        </div>
                        <div class="form-group">
                            <label for="add-description">Description</label>
                            <textarea class="form-control" type="text" cols="30" rows="4" v-model="description"></textarea>
                        </div>   
                        <button type="submit" class="btn btn-success buttons container">Add</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['propsadd'],
    data() {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        addSubmit(){
            this.propsadd({title: this.title, description: this.description})
            this.$emit("change-page",'home-page')
        }
    }
}
</script>

<style>

</style>