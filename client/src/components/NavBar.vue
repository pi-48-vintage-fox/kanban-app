<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">KanBan</a>
       
        <ul class="right hide-on-med-and-down">
           <li><a href="#"> Welcome {{ username }}</a></li>
          <li>
            <a class="btn red lighten-3" @click.prevent="logOut">Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>




<script>
export default {
  name: "NavBar",
  data(){
    return {
      message: 'ini NavNar',
      username : ''
    }
  },
  methods: {
    logOut(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
      this.$emit('logout', false)
    },
    fetchUsername (){
      const username = localStorage.getItem('username')
      this.username = username
    }
  },
  created(){
    this.fetchUsername()
  }
 
};
</script>

