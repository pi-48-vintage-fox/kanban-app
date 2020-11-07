<template>
          <nav class="navbar navbar-expand-lg navbar-light navbarmodif">
            <a class="navbar-brand" href="#" @click.prevent="homePageClick">Logo YEUH!</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#" >Kanban App Cuy!<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent='showAddForm'>Add Task!</a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" @click.prevent='logoutsubmit' href="#">Log Out</a>
                    </li>
                </ul>
            </div>
        </nav>
</template>

<script>
export default {
    methods: {
        logoutsubmit(){
            this.$emit("logout")
        },
        homePageClick(){
            this.$emit("change-page",'home-page')
        },
        showAddForm(){
            this.$emit("change-page",'add-page')
        }
    }

}
</script>

<style>

</style>