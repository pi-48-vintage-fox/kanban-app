<template>
  <!-- kanban ditambahin 1 section bungkusan biar br kemasuk -->
  <section>
    <div class="card kartu">
      <div
        class="card-body todo d-flex justify-content-between align-items-center">
        <p class="card-text">
          {{ task.title }}
        </p>
        <div class="col">
          <editTitle></editTitle>
        </div>
          
        <!-- buttons -->
        <div style="width: 10px">
          <a href="#" type="button"
            ><i class="fa fa-pencil mb-3" aria-hidden="true"></i
          ></a>
          <a href="#" type="button"
            ><i class="fa fa-trash-o" aria-hidden="true"></i
          ></a>
        </div>
      </div>
      <div class="card shadow-lg rounded"></div>
    </div>
    <br />
  </section>
</template>

<script>
import editTitle from './editTitle'

export default {
  name: "kanban",
  components:{
    editTitle
  },
  props: ["task"],
};
</script>
  
<style>
p {
  word-break: break-all;
  white-space: normal;
}
.fa {
  color: cyan;
}
</style>