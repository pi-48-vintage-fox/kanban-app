<template>
  <section id="addTaskpage">
    <div id="card">
      <div id="card-content">
        <div id="card-title">
          <h5>Add assignment!</h5>
        </div>
        <form @submit.prevent="postTask" class="form">
          <label for="user-email" style="padding-top: 13px">
            &nbsp;Title
          </label>
          <input id="title" class="form-content" type="text" v-model="title" />
          <div class="form-border"></div>

          <label for="user-email" style="padding-top: 13px">
            &nbsp;Description
          </label>
          <input
            id="description"
            class="form-content"
            type="text"
            v-model="description"
          />
          <div class="form-border"></div>
          <input id="submit-btn" type="submit" name="submit" value="ADD TASK" />
          <input
            id="submit-btn"
            name="submit"
            value="CANCEL"
            @click="cancelAddTask"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../config/axios";
export default {
  data() {
    return {
      title: "",
      description: "",
    };
  },
  name: "AddTask",
  props: ["CategoryId", "reloadTask"],
  methods: {
    cancelAddTask() {
      this.$emit("closeAddForm");
    },
    postTask() {
      
      console.log(this.title, this.description, this.CategoryId);
      axios({
        url: "/tasks",
        method: "post",
        data: {
          title: this.title,
          description: this.description,
          CategoryId: this.CategoryId
        },
        headers:{
            access_token : localStorage.getItem("access_token")
        }
      })
      .then((result) => {
          this.reloadTask()
          this.$emit("closeAddForm")
          this.$emit("changePage", "kanban-homepage")

        
          
      })
      .catch((err) => {
          console.log(err);
      })
    },
  },
};
</script>

<style>
</style>