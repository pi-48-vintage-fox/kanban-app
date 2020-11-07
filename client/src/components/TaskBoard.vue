<template>
  <div>
    <h3 class="title-category">{{ category.name }}</h3>
    <ButtonTaskAdd
      :CategoryId="category.id"
      @showMessage="showMessage"
      @pushTask="pushTask"
      @fetchTasks="fetchTasks"
      class="button-add-task"
    ></ButtonTaskAdd>
    <div class="task-board-list">
      <ul class="task-list">
        <TaskItem
          v-for="task in filteredTasks"
          :user="user"
          :key="task.id"
          :task="task"
          :category="category"
          :categories="categories"
          class="flex-col task-list-item"
          @showMessage="showMessage"
          @fetchTasks="fetchTasks"
        ></TaskItem>
      </ul>
    </div>
  </div>
</template>

<script>
  import TaskItem from './TaskItem'
  import ButtonTaskAdd from './ButtonTaskAdd'

  export default {
    data() {
      return {}
    },
    components: {
      TaskItem,
      ButtonTaskAdd,
    },
    props: {
      user: Object,
      category: Object,
      categories: Array,
      tasks: Array,
    },
    methods: {
      addTask() {
        console.log('add task')
      },
      showMessage(payload) {
        this.$emit('showMessage', payload)
      },
      pushTask(task) {
        this.tasks.push(task)
      },
      fetchTasks() {
        this.$emit('fetchTasks')
      },
    },
    computed: {
      filteredTasks() {
        return this.tasks.filter((task) => task.CategoryId == this.category.id)
      },
    },
  }
</script>

<style></style>
