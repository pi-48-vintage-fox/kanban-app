<template>
  <div id="BoardList" class="actions">
    <TaskBoard
      v-for="(category, i) in categories"
      :user="user"
      :key="i"
      :tasks="tasks"
      :category="category"
      :categories="categories"
      @showMessage="showMessage"
      @fetchTasks="fetchTasks"
      class="task-board flex-col"
    ></TaskBoard>
    <ButtonCategoryAdd
      @showMessage="showMessage"
      @pushCategory="pushCategory"
      @fetchCategories="fetchCategories"
      class="button-add-category"
    ></ButtonCategoryAdd>
  </div>
</template>

<script>
  import TaskBoard from './TaskBoard'
  import TaskItem from './TaskItem'
  import ButtonCategoryAdd from './ButtonCategoryAdd'
  export default {
    data() {
      return {}
    },
    components: {
      TaskBoard,
      ButtonCategoryAdd,
    },
    props: {
      user: Object,
      categories: Array,
      tasks: Array,
    },
    computed: {},
    methods: {
      addCategory() {
        console.log('add category')
      },
      showMessage(payload) {
        this.$emit('showMessage', payload)
      },
      pushCategory(category) {
        this.categories.push(category)
      },
      fetchTasks() {
        this.$emit('fetchTasks')
      },
      fetchCategories() {
        this.$emit('fetchCategories')
      },
    },
  }
</script>

<style></style>
