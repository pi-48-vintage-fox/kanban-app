<template>
  <a href="#" @click.prevent="choseTaskId">
    <div class="content-item">
      {{task.title}}
    </div>
  </a>
</template>

<script>
export default {
  name: 'Task',
  data() {
    return {
    }
  },
  methods: {
    choseTaskId() {
      this.$emit('choseTaskId', task.id)
    }
  },
  props: ['task']
}
</script>

<style>

</style>