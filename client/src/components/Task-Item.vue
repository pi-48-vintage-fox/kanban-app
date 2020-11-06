<template>
  <div class="task">
    <div class="task-title">
      <div class="label">
        <p v-if="!isEdit">
          {{ task.title }}
        </p>
        <textarea v-if="isEdit" v-model="editContent" cols="13"></textarea>
        <button  v-if="isEdit" type="button" class="btn btn-primary" style="padding:2px 3px;" @click="saveEditTask">Save</button>
        <button  v-if="isEdit" type="button" class="btn btn-warning" style="padding:2px 3px;" @click="isEdit = false">Cancel</button>
      </div>
      <div class="task-options"  @click="toggleOptions">
        <v-popover >
          <i class="fas fa-ellipsis-h task-menu"></i>
          <template slot="popover">
            <i class="fas fa-edit warning task-menu-items" @click="editTask"></i>
            <i class="fas fa-trash danger task-menu-items" @click="deleteTask" v-close-popover.all></i>
          </template>
        </v-popover>
      </div>
    </div>
    <div class="task-footer">
      <div>By : {{ task.User.email }}</div>
      <div>{{ formatedDate }}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "TaskItem",
  props: ["task"],
  data(){
    return{
      opVisible: false,
      isEdit: false,
      editContent: "",
      isClosed: false
    }
  },
  methods: {
    editTask(){
      this.isEdit = true
      this.editContent = this.task.title
    },
    saveEditTask(){
      let payload = {
        content : this.editContent,
        taskId : this.task.id
      }
      this.isEdit = false
      this.$emit("editTask",payload)
    },  
    deleteTask(){
      this.isClosed = true
      let payload = {
        taskId : this.task.id
      }
      this.isEdit = false
      this.$emit("deleteTask",payload)
    },
    toggleOptions(){
      this.opVisible = !this.opVisible
    },
    showTooltip() {
      return "asd";
    },
  },
  computed: {
    formatedDate() {
      return moment(this.task.createdAt).calendar();
    },
  },
};
</script>

<style>
.task {
  padding-right: 5px;
}
</style>