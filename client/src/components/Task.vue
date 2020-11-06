<template>
  <div class="content-item">
    <p>{{ task.title }}</p>
    <a href="#" @click.prevent="deleteTask">
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        class="bi bi-trash iconic"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
        />
        <path
          fill-rule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
    </a>
    <a href="#" @click.prevent="editTaskForm">
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        class="bi bi-pen iconic"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
        />
      </svg>
    </a>
    <a href="#" @click.prevent="moveTaskForm">
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        class="bi bi-arrows-move iconic"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
        />
      </svg>
    </a>
    <br />
    <div class="keterangan">
      <small id="taskUserEmail">{{ task.User.email }}</small>
      <small id="taskCreatedAt">created at {{ dateCreated }}</small>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "Task",
  data() {
    return {
      editedPayload: {
        id: this.task.id,
        title: '',
        category: '',
      },
      movePayload: {
        id: this.task.id,
        category: ''
      },
      date: this.task.createdAt,
    };
  },
  methods: {
    deleteTask() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("deleteTask", this.task.id);
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        }
      });
    },
    editTaskForm() {
      Swal.fire({
        title: "Enter Your Task Title !",
        input: "text",
        inputLabel: "Your task title",
        inputValue: this.task.title,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      })
        .then((result) => {
          if(!result.isConfirmed) {
            throw 'Err'
          } 
          console.log(this.task);
          this.editedPayload.title = result.value;
          let objCategories = {};
          this.categories.forEach((element) => {
            objCategories[element] = element;
          });
          return objCategories;
        })
        .then((objCategories) => {
          Swal.fire({
            title: "Select Task Category !",
            input: "select",
            inputOptions: objCategories,
            inputPlaceholder: "Select a category",
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (!value) {
                  resolve("You need to select category");
                } else {
                  resolve();
                }
              });
            },
          })
            .then((result) => {
              if(!result.isConfirmed) {
                throw 'Err'
              } 
              this.editedPayload.category = result.value;
              this.$emit("editTask", this.editedPayload);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },
    moveTaskForm() {
      let objCategories = {};
      this.categories.forEach((element) => {
        objCategories[element] = element;
      });
      Swal.fire({
        title: "Move to ?",
        input: "select",
        inputOptions: objCategories,
        inputPlaceholder: "Select a category",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (!value) {
              resolve("You need to select category");
            } else {
              resolve();
            }
          });
        },
      })
        .then((result) => {
          if(!result.isConfirmed) {
            throw 'Err'
          } 
          this.movePayload.category = result.value
          this.$emit('moveTask', this.movePayload);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    dateCreated() {
      console.log(new Date(this.date).toISOString().split("T")[0]);
      return new Date(this.date).toISOString().split("T")[0];
    },
  },
  props: ["task", "categories"],
};
</script>

<style>
.keterangan {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#taskCreatedAt {
  justify-self: flex-end;
}
</style>