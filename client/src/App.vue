<template>
  <div>
    <Login v-if="page == 'loginPage'" @client-page="changePage"></Login>

    <Register v-if="page == 'registerPage'" @client-page="changePage">
    </Register>

    <Home v-if="page == 'homePage'" 
      @client-page="changePage"
      @toEditPage="toEditPage">
    </Home>

    <Add v-if="page == 'addPage'" @client-page="changePage"></Add>

    <Edit
      @client-page="changePage" 
      v-if="page == 'editPage'"
      :detailTask="detailTask"
      @editTask="editTask">
    </Edit>
  </div>
</template>

<script>
import axios from 'axios';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from './components/Edit';
export default {
  name: "App",
  data() {
    return {
      page: "loginPage",
      detailTask: null
    };
  },
  // Meregister component lain
  components: {
    Login,
    Home,
    Register,
    Add,
    Edit
  },

  methods: {
    changePage(value) {
      this.page = value;
    },
    toEditPage(payload) {
      // console.log(payload);
      this.page = payload.page
      this.detailTask = {
        id: payload.id,
        title: payload.title,
        description: payload.description
      }
    },
    editTask(payload) {
      // console.log(payload);
      axios({
        method: "PUT",
        url: `http://localhost:3000/task/${+payload.id}`,
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          this.title = ''
          this.description = ''
          swal.fire(
            "DONE", 
            "Change task success",
            "success"
            );
          this.page = 'homePage'

        })
        .catch(err =>{
          swal.fire(
            'FAILED',
            'Not authorization/please input correct',
            'error'
          )
        });
    },
  },

  created() {
    if (localStorage.access_token) {
      this.page = "homePage";
    } else {
      this.page = "loginPage";
    }
  },
};
</script>

<style scoped>
</style>