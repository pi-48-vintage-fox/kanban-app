<template>
  <header id="top-nav">
    <section id="top-nav-left_control">
      <!-- <div id="home-icon">KANBAN</div> -->
      <div class="title-organization">{{ user.Organization }}</div>
      <!-- <div id="search">
          <input type="text" name="search" id="search" placeholder="search">
        </div> -->
    </section>

    <section id="top-nav-right_control">
      <div id="avatar" @click="toggleUserMenu">
        <img :src="user.avatarUrl" alt="" />
      </div>
      <div v-if="showUserMenu" id="usermenu">
        <div class="user-details">
          <p class="user-name">{{ user.name }}</p>
          <p class="user-email">{{ user.email }}</p>
        </div>
        <ul>
          <li class="usermenu-item actions">
            <i class="usermenu-icon material-icons">settings</i>
            <p class="usermenu-title">Settings</p>
          </li>
          <li class="usermenu-item actions" @click="signOut">
            <i class="usermenu-icon material-icons">directions_run</i>
            <p class="usermenu-title">Sign Out</p>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
  export default {
    name: 'Navbar',
    props: {
      user: Object,
    },
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
