<template>
  <div>
    <Login 
        v-if="!isLogin" 
        @login_success='changeIsLogin'
        @toRegister="changePage"
       
    >
    </Login>
    <Home 
      v-if="isLogin &&pageName=='home-page'"
      @changePage="changePage"
      @logout="changeIsLogin"
    >
    </Home>
    <Add 
        v-if="pageName == 'add-page'"
        @backToHome="changePage"
    >
   </Add>
   
  </div>
</template>

<script>
import Login from "./components/Login";
import Home from "./components/Home";
import Add from "./components/Add"
import Register from "./components/Register"
export default {
  name: "App",
  data() {
    return {
      message: "Hello Vue",
      isLogin: false,
      pageName: 'home-page',
      username:''
    }
  },
  components: {
    Login,
    Home,
    Add,
    Register
  },
  methods: {

    changeIsLogin(value) {

        console.log(value);
        
        this.isLogin = value
    },
     changePage(page) {
      console.log(page);
      
        this.pageName = page
    },
    inputUsername (name) {
      this.username = name
    }

  },
  created() {
    const access_token = localStorage.getItem('access_token')
    console.log(access_token);
     if(access_token){
      console.log('masuk created');
      
      this.isLogin = true
     
      
    }else {
      this.isLogin = false
    } 
    
    
  },
  
};
</script>

