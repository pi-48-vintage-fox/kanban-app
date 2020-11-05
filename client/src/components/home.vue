<template>
  <div>
        <navigasi
        @logout="logout"
        @add='add'
        >
        </navigasi>
        <div class="container">
            <category></category>
        </div> 
  </div>
</template>

<script>
import category from "./category"
import navigasi from "./navigasi"

import axios from "../../config/axios"
export default {
    name: "home",
    data() {
        return {
            data: []
        }
    },
    components: {
        category, navigasi
    },
    methods: {
        logout() {
            this.$emit('logout')
        },
        add() {
            this.$emit('add')
        },
    },
    
}
</script>

<style>

</style>