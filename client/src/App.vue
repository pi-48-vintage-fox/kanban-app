<template>
  <div>
      <LoginPage 
      v-if="pageName === 'login-page'"
      @change-page="changePage"
      >
      </LoginPage>
      <RegisterPage 
      v-else-if="pageName === 'register-page'"
      @change-page="changePage"
      >
      </RegisterPage>
      <HomePage 
      v-else-if="pageName === 'home-page'"
      :changePage="changePage"
      >
      </HomePage>
      <NotFound 
      v-else>
      </NotFound>
  </div>
</template>

<script>
import HomePage from "./HomePage"
import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import NotFound from "./NotFound"
import axios from "../config/axios"
export default {
    name:'App',
    data(){
        return { 
            pageName : "login-page",
        }
    },
    components : {
        HomePage,
        LoginPage,
        RegisterPage,
        NotFound
    },
    methods : {
        changePage(page){
            this.pageName = page
        },

    },
    created(){
        if(localStorage.access_token){            
            this.pageName = "home-page"
        }else{
            this.pageName = "login-page"
        }
    }
}
</script>

<style>

</style>