<template>
  <portal to="modals">
    <BaseModal>
      <template #modal-title>
        <h3 class="modal-title">Please complete your profile</h3>
      </template>
      <template #modal-content>
        <div
          v-if="errorBanner.length > 0"
          class="notification notification-banner notification-error"
        >
          <ul>
            <li v-for="(error, i) in errorBanner" :key="i">{{ error }}</li>
          </ul>
        </div>
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          v-model="name"
          placeholder="Insert your name"
          required
        />
        <div
          v-if="errors.name.length > 0"
          class="notification notification-error"
        >
          <ul>
            <li v-for="(error, i) in errors.name" :key="i">{{ error }}</li>
          </ul>
        </div>

        <label for="name">Username</label>
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Insert your username"
          required
        />
        <div
          v-if="errors.username.length > 0"
          class="notification notification-error"
        >
          <ul>
            <li v-for="(error, i) in errors.username" :key="i">{{ error }}</li>
          </ul>
        </div>

        <label for="organization">Organization</label>
        <select v-model="OrganizationId" name="organization">
          <option
            v-for="org of organizations"
            v
            :key="org.id"
            :value="org.id"
            >{{ org.name }}</option
          >
        </select>

        <div class="actions align-end mt-1">
          <button @click="submitProfile" class="button">
            Update profile
          </button>
        </div>
      </template>
    </BaseModal>
  </portal>
</template>

<script>
  import axios from '../../config/axios'
  import BaseModal from './BaseModal'
  export default {
    name: 'ModalCompleteRegistration',
    props: {
      organizations: Array,
      user: Object,
    },
    components: {
      BaseModal,
    },
    data() {
      return {
        name: this.user.name,
        username: this.user.username,
        OrganizationId: this.user.OrganizationId || 1,
        errorBanner: [],
        errors: {
          name: [],
          username: [],
          OrganizationId: [],
        },
      }
    },
    methods: {
      submitProfile() {
        if (!this.OrganizationId) {
          this.errors.OrganizationId.push('Please select your organization')
        } else if (!this.name) {
          this.errors.name.push('Please enter your name')
        } else {
          const { OrganizationId, name, username } = this

          console.log('submit complete registration form')

          console.log({ name, OrganizationId })

          for (let key in this.errors) {
            this.errors[key] = []
          }
          this.errorBanner = []

          axios({
            method: 'PUT',
            url: '/users/' + this.user.id,
            data: { OrganizationId, name },
            headers: {
              access_token: localStorage.getItem('access_token'),
            },
          })
            .then(({ data }) => {
              console.log('berhasil pilih organisasi', data)
              this.OrganizationId = null
              this.name = null
              this.$emit('registrationCompleted')
            })
            .catch((err) => {
              console.log(err)

              this.$emit('showMessage', {
                msg: err,
                type: 'error',
              })
            })
        }
      },
    },
  }
</script>

<style></style>
