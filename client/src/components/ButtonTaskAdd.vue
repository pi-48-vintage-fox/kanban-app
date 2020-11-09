<template>
  <button
    class="button button-transparent button-sm actions"
    @click="showAddTaskModal = true"
  >
    <div class="actions center">
      <i class="material-icons md-dark button-icon-left">add_circle_outline</i>
      <p>Add Task</p>
    </div>
    <portal to="modals" v-if="showAddTaskModal">
      <BaseModal>
        <template #modal-title>
          <h3 class="modal-title">Add Task</h3>
        </template>

        <template #modal-content>
          <div class="modal-content">
            <form @submit.prevent="submitNewTask">
              <label for="title">Title</label>
              <input
                v-model="title"
                type="text"
                name="title"
                autofocus
                required
              />

              <label for="description">Description</label>
              <textarea
                v-model="description"
                name="description"
                id=""
                cols="15"
                rows="4"
              ></textarea>

              <div class="actions align-end">
                <button
                  type="button"
                  class="button button-transparent"
                  @click="showAddTaskModal = false"
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
  import axios from '../../config/axios'
  import BaseModal from './BaseModal'

  export default {
    name: 'ButtonTaskAdd',
    data() {
      return {
        showAddTaskModal: false,
        title: '',
        description: '',
      }
    },
    components: {
      BaseModal,
    },
    props: {
      CategoryId: Number,
    },
    methods: {
      submitNewTask() {
        console.log('submitting new task')
        this.showAddTaskModal = false

        console.log({
          title: this.title,
          description: this.description,
          CategoryId: this.CategoryId,
        })

        axios({
          method: 'POST',
          url: '/tasks',
          data: {
            title: this.title,
            description: this.description,
            CategoryId: this.CategoryId,
          },
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
          .then(({ data }) => {
            console.log(data, '<<<< new task')
            this.$emit('fetchTasks')
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
