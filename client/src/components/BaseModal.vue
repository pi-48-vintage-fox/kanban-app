<template>
  <div class="modal is-visible" id="modal">
    <div class="modal-dialog">
      <div class="modal-header">
        <slot name="modal-title"></slot>
      </div>
      <slot name="modal-content"> </slot>
      <slot name="modal-footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
  }
</script>

<style></style>
