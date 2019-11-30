<template>
    <div id="picsContainer" class="FlexRow Fill">
      <el-row type="flex" v-for="i in [0,1,2] " v-bind:key="i">
          <el-col :span=6 v-for="j in [0,1,2,3]" v-bind:key="j">
              <div class="picContainer">
                    <router-link v-if="moudles[i*4+j]" :to="moudles[i*4+j].path" @click.native="handleClick(moudles[i*4+j])">
                        <el-image v-if="moudles[i*4+j]" :src="moudles[i*4+j].src"></el-image>
                    </router-link>
                    <router-link :underline="false" v-if="moudles[i*4+j]" :to="moudles[i*4+j].path">{{ moudles[i*4+j].name }}</router-link>
              </div>
          </el-col>
      </el-row>
    </div>
</template>


<script>
export default {
  data() {
    return {
      moudles: this.$store.getters.availableMoudles
    };
  },
  beforeMount(){
  },
  mounted(){
    console.log(this.$store.getters.availableMoudles);
  },
  methods:{
    handleClick(item){
      this.$store.dispatch('page/setPageResourceCode', false)
    }
  }
};
</script>

<style scoped>
  #picsContainer {
    width: 1040px;
    margin: 100px auto;
    text-align: center;
  }

  #picsContainer .picContainer {
    margin: 40px 20px;
  }

  #picsContainer img {
    width: 125px;
    height: 125px;
  }

  #picsContainer a {
    display: block;
    white-space: nowrap;
    text-decoration: none;
    font-size: 18px;
    line-height: 30px;
    color: #7b8994;
    margin: 10px 0;
  }
</style>