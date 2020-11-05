<template>
  <div>
    <div class="task">
      <p class="task-title">
      {{ task.title }}
      </p>
      <div class="task-footer">
        asd
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: ["task"],
};
</script>

<style>
</style>