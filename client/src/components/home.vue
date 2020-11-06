<template>
  <div>
        <navigasi
        @logout="logout"
        @add='add'
        :emailIsLogin="emailIsLogin"
        ></navigasi>

        <div class="container">
            <category
            @updateData="updateData"
            ></category>
        </div>
        <center><p> Kanban Aplication 2020</p></center>
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
    props: [ 'emailIsLogin'],
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
        updateData(payload) {
            this.$emit("updateData", payload)
        }
    },
    
}
</script>

<style>

</style>