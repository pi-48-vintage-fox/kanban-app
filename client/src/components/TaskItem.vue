<template>
  <li>
    <div @click="showTaskDetailsModal = true" style="cursor:pointer">
      <div class="task-item-title">{{ task.title }}</div>
      <div class="task-item-description">{{ task.description }}</div>
    </div>
    <div class="actions task-footer" style="justify-content: space-between">
      <div class="actions">
        <img
          v-if="task.User"
          class="task-item-icon"
          :src="task.User.avatarUrl"
        />
        <p v-if="task.User" class="task-item-creator">
          By {{ task.User.name }}
        </p>
      </div>

      <div>
        <i @click="showDeleteItemModal = true" class="material-icons delete-btn"
          >delete_outline</i
        >
      </div>
    </div>
    <portal to="modals" v-if="showTaskDetailsModal">
      <BaseModal>
        <template #modal-title>
          <p class="modal-title">Task Details</p>
        </template>

        <template #modal-content>
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

            <label for="categories">Move to</label>
            <select v-model="CategoryId" name="categories">
              <option
                v-for="category in filteredCategories"
                :key="category.id"
                :value="category.id"
                >{{ category.name }}
              </option>
            </select>
            <div class="actions align-end">
              <button
                type="button"
                class="button button-grey"
                @click="showTaskDetailsModal = false"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="button"
                @click.prevent="submitUpdateTask"
              >
                Update Task
              </button>
            </div>
          </form>
        </template>
      </BaseModal>
    </portal>

    <portal to="modals" v-if="showDeleteItemModal">
      <BaseModal>
        <template #modal-title>
          <p class="modal-title">Confirm Task Delete</p>
        </template>

        <template #modal-content>
          <h3>Are you sure you want to delete this task?</h3>

          <div class="actions align-end">
            <button
              type="button"
              class="button button-grey"
              @click="showDeleteItemModal = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="button button-danger"
              @click="submitDeleteTask"
            >
              Delete Task
            </button>
          </div>
        </template>
      </BaseModal>
    </portal>
  </li>
</template>

<script>
  import axios from '../../config/axios'
  import BaseModal from './BaseModal'
  export default {
    data() {
      return {
        baseUrl: 'https://kanban-app-riva.herokuapp.com',
        title: this.task.title,
        description: this.task.description,
        showTaskDetailsModal: false,
        showDeleteItemModal: false,
        CategoryId: this.task.CategoryId,
      }
    },
    props: {
      task: Object,
      category: Object,
      categories: Array,
      // CategoryId: Number,
    },
    components: {
      BaseModal,
    },
    computed: {
      filteredCategories() {
        return this.categories.filter((cat) => cat.id !== this.task.CategoryId)
      },
    },
    methods: {
      submitUpdateTask() {
        console.log('submit task update')

        console.log({
          title: this.title,
          description: this.description,
          CategoryId: this.CategoryId,
        })

        this.showTaskDetailsModal = false
        axios({
          method: 'PUT',
          url: '/tasks/' + this.task.id,
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
            console.log(data, '<<< update task')
            this.fetchTasks()
          })
          .catch((err) => {
            console.log(err)
            this.$emit('showMessage', { msg: err, type: 'error' })
          })
      },

      fetchTasks() {
        console.log('fetching tasks')
        this.$emit('fetchTasks')
      },

      submitDeleteTask() {
        this.showDeleteItemModal = false
        console.log('delete task')
        axios({
          method: 'DELETE',
          url: '/tasks/' + this.task.id,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
          .then(({ data }) => {
            console.log(data, '>>> delete task')
            this.$emit('fetchTasks')
          })
          .catch((err) => {
            console.log(err)
            this.$emit('showMessage', { msg: err, type: 'error' })
          })
      },
    },
  }
</script>

<style></style>
