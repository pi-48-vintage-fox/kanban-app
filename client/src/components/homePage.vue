<template>
  <section id="homePage">
    <userInfo @changePage='afterLogout'></userInfo>
    
    <!-- pembungkus card dan row diluar component,, sehingga kanbancard buat col yang dalam row biar kesamping -->
    <div class="card-title ml-4 mr-4 mt-3">
      <div class="row">
        <categoryCard v-for="(cat,i) in cates" 
          :key='i' :catDetail='cat' :tasks='tasks' @changePage='addtask' :reloadData='reloadUlang'
        >
        </categoryCard>
      </div>
    </div>
  </section>
</template>

<script>
  import categoryCard from "./categoryCard"
  import userInfo from "./userInfo"
  export default {
    name: "home",
    components: {
      categoryCard,userInfo
    },
    methods:{
      addtask(value){
        console.log(value)
        this.$emit('changePage',value)
      },
      afterLogout(value){
        this.$emit('changePage',value)
      }
    },
  
    props:['cates','tasks','reloadUlang']
  };
</script>

<style>
  .body {
    background-image: url("https://images.unsplash.com/photo-1604276919965-7ba5dab422f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80");
  }
</style>