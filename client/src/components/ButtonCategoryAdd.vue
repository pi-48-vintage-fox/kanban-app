<template>
  <button
    type="button"
    class="button button-grey button-lg"
    @click="showCategoryForm = true"
  >
    <div class="actions">
      <i class="material-icons button-icon-left">add_circle_outline</i>
      <p>Add Category</p>
    </div>

    <portal to="modals" v-if="showCategoryForm">
      <BaseModal>
        <template #modal-title>
          <h3 class="modal-title">Add Category</h3>
        </template>

        <template #modal-content>
          <div class="modal-content">
            <form @submit.prevent="submitNewCategory">
              <label for="name">Category Name</label>
              <input v-model="name" type="text" name="name" autofocus />

              <div class="actions align-end">
                <button
                  type="button"
                  class="button button-grey"
                  @click="showCategoryForm = false"
                >
                  Cancel
                </button>
                <button type="submit" class="button">Add</button>
              </div>
            </form>
          </div>
        </template>
      </BaseModal>
    </portal>
  </button>
</template>

<script>
  import axios from 'axios'
  import BaseModal from './BaseModal'
  export default {
    name: 'ButtonCategoryAdd',
    components: {
      BaseModal,
    },
    data() {
      return {
        baseUrl: 'http://localhost:3000',
        showCategoryForm: false,
        name: '',
      }
    },
    methods: {
      submitNewCategory() {
        console.log('submitting new category')
        this.showCategoryForm = false

        console.log({
          name: this.name,
        })

        axios({
          method: 'POST',
          url: this.baseUrl + '/categories',
          data: {
            name: this.name,
          },
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
          .then(({ data }) => {
            console.log(data, '<<<< new category')
            this.$emit('pushCategory', data)
            this.$emit('fetchCategories')
          })
          .catch((err) => {
            console.log(err)
            console.log(err.response)
            console.log(err.responseJSON)
            this.$emit('showMessage', { msg: err, type: 'error' })
          })
      },
    },
  }
</script>

<style></style>
