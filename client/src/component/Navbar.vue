<template>
  <div id="navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Kam-ban</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="switchToAdd">Add Task</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="logOut">Log Out</a>
                </li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        switchToAdd() {
            this.$emit('changePage', 'AddPage')
        },
        logOut() {
            this.$emit('logOut')
        }
    }
}
</script>

<style>

</style>