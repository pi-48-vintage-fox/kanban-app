<template>
  <option @click="getCategories" :value="org.id">{{ org.name }}</option>
</template>

<script>
export default {
  name: "Organization",
  data() {
    return {

    };
  },
  methods: {
    getCategories() {
      this.$emit('getCategories', this.org.id)
    }
  },
  props: [ 'org' ],
  computed: {

  }
};
</script>

<style>
</style>