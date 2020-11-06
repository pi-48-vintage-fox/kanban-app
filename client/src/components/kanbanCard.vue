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
      <div class='d-flex justify-content-between ml-1 mr-3 mt-1'>
        <p class="card-text" v-show='!moveShow'>
          Posted by {{ task.User.name }} on {{datePost}}
        </p>
        <div class="col" v-show="moveShow">
         <editMove :idTask='task.id' :refreshData='reload' @changeMove='methodMove'></editMove>
        </div>

        <a type="button"
            ><i class="fa fa-arrows mb-3 moved" aria-hidden="true" @click="showMove" ></i
          ></a>
          
      </div>
      
      <div class="card shadow-lg rounded"></div>
    </div>
    <br />
  </section>
</template>

<script>
import editTitle from './editTitle'
import editMove from './editMove'

export default {
  name: "kanban",
  data(){
    return{
      isShow:false,
      moveShow:false
    }
  },
  components:{
    editTitle,editMove
  },
  props: ["task","reload"],

  methods:{
    methodShow(value){
      this.isShow = value
    },
    methodMove(value){
      this.moveShow = value
    },
    showEdit(){
      this.isShow = !this.isShow
    },
    showMove(){
      this.moveShow = !this.moveShow
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
.moved{
  color:darkcyan
}
</style>