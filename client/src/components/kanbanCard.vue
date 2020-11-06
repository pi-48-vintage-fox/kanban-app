<template>
  <!-- kanban ditambahin 1 section bungkusan biar br kemasuk -->
  <section>
    <div class="card kartu">
      <div
        class="card-body todo d-flex justify-content-between align-items-center">
        <h3 class="card-text" v-show="!isShow">
          {{ task.title }}
        </h3>
        <div class="col" v-show="isShow" >
          <editTitle :idTask='task.id' :refreshData='reload' @changeShow='methodShow'></editTitle>
        </div>
        
        <!-- buttons -->
        <div style="width: 10px">
          <a type="button"
            ><i class="fa fa-pencil mb-3" aria-hidden="true" @click="showEdit"></i
          ></a>
          <a type="button"
            ><i class="fa fa-trash-o" aria-hidden="true"></i
          ></a>
        </div>
        
      </div>
      <div>
        <p class="card-text">
          Posted by {{ task.User.name }} on {{datePost}}
        </p>
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
  data(){
    return{
      isShow:false,
  
    }
  },
  components:{
    editTitle
  },
  props: ["task","reload"],

  methods:{
    methodShow(value){
      this.isShow = value
    },
    showEdit(){
      this.isShow = !this.isShow
      console.log(this.task.id)
    },
    

  },

  computed:{
    datePost(){
      let postedDate = new Date(this.task.createdAt).toLocaleString('id-ID', {day:'numeric',month:'long',year:'numeric'})
      return postedDate
    },
    
  }
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