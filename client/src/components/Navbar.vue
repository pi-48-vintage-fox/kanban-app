<template>
    <nav class="flex items-center justify-between flex-wrap bg-none p-3 mb-10">
        <div class="flex items-center flex-shrink-0 text-black-600 mr-6">
            <span class="font-semibold text-xl tracking-tight ml-2">Kanban App</span>
        </div>
        <div v-if="page == 'dashboard'" >
            <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded bg-red-500 text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mx-auto lg:mt-0" v-on:click.prevent="logout">Log Out</a>
        </div>
    </nav>
</template>

<script>
export default {
    name:'Navbar',
    props:['page'],
    methods:{
        logout(){
            this.$emit('logout')
        }
    }
}
</script>

<style>
.border-radius-task{
    border-radius: 25px;
}
</style>