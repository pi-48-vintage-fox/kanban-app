<template>
  <header id="top-nav">
    <section id="top-nav-left_control">
      <!-- <div id="home-icon">KANBAN</div> -->
      <div class="title-organization">{{ organization }}</div>
      <!-- <div id="search">
          <input type="text" name="search" id="search" placeholder="search">
        </div> -->
    </section>

    <section id="top-nav-right_control">
      <!-- <button class="top-nav-btn add-task" @click="addTaskModal" type="button">
          <span>＋</span>Add Task
        </button>   -->
      <div id="avatar" @click="toggleUserMenu">
        <img :src="avatar" alt="" />
      </div>
      <div v-if="showUserMenu" id="usermenu">
        <ul>
          <li class="usermenu-item actions">
            <i class="usermenu-icon material-icons md-18 md-dark">settings</i>
            <p class="usermenu-title">Settings</p>
          </li>
          <li class="usermenu-item actions" @click="signOut">
            <i class="usermenu-icon material-icons md-32">directions_run</i>
            <p class="usermenu-title">Sign Out</p>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
  export default {
    nameL: 'Navbar',
    data() {
      return {
        avatar: '',
        organization: '',
        showUserMenu: false,
      }
    },
    created() {
      this.avatar = localStorage.getItem('avatarUrl')
      this.organization = localStorage.getItem('organization')
    },
    methods: {
      toggleUserMenu() {
        console.log('toggle')
        this.showUserMenu = !this.showUserMenu
      },
      signOut() {
        if (gapi.auth2) {
          const auth2 = gapi.auth2.getAuthInstance()
          auth2.signOut().then(() => {
            console.log('User signed out.')
            localStorage.clear()
            this.$emit('changePage', 'landing-page')
          })
        } else {
          console.log('User signed out.')
          localStorage.clear()
          this.$emit('changePage', 'landing-page')
        }
      },
      getAvatar() {
        return localStorage.getItem('avatarUrl')
      },
    },
  }
</script>

<style></style>
