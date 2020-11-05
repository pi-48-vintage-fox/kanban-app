<template>
  <div>
    <div class="container mt-3">

       <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    
         <div class="row">
            <div class="col-6">
            <button @click="add" class="btn btn-outline-primary"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg> add</button>
            </div>
            <div class="col-6">
              <button @click="logout" class="btn btn-outline-primary">Logout</button>

            </div>
         </div>

      </nav>
    </div>
  </div>

</template>

<script>
export default {
    name: "navigasi",
    data() {
        return {

        }
    },
    methods: {
        logout() {
          this.$emit('logout')
        },
        add() {
          this.$emit('add')
        }
    }

}
</script>

<style>

</style>