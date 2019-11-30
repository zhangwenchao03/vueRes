<template>
    <div style="width:100%;height:100%;display:flex;">
    <el-row class="FlexCol Fill">
      <el-col class="leftContent Fill shadow-r">
        <el-row class="title">UIH_RIS</el-row>
        
        <el-row class="leftSelector">
            <el-form>
            <li>
                <el-form-item prop="hospitalInstitution" label="医疗机构" required='true'>
                <el-select v-model="hospitalInstitutionSelected" placeholder="请选择" class="wFill">
                    <el-option 
                        v-for="option in options" 
                        v-bind:key="option.value"
                        :label="option.name"
                        :value="option.value">
                    </el-option>
                </el-select>
                </el-form-item>
            </li>
            </el-form>
        </el-row>
        
        <el-row
          class="leftLabel"
          :class="{'selected': currentIndex === 2}"
          @click.native="changeSelected(2)"
        >集成配置</el-row>
        <el-row
          class="leftLabel"
          :class="{'selected': currentIndex === 3}"
          @click.native="changeSelected(3)"
        >HIS数据库配置</el-row>
      </el-col>

      <el-col>
          <el-row>
              <el-row class="title">常规</el-row>
              <el-row>
                
              </el-row>
          </el-row>
      </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            currentIndex: 2,
            hospitalInstitutionSelected: '',
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
        }
    },
    methods: {
        changeSelected(index) {
            this.currentIndex = index;
        },
    }
}
</script>

<style lang="scss" scoped>
$shallowGrey: #f7f9fa;
.boldClass {
  font-weight: bold;
}

#tableContainer {
  overflow: auto;
  height: 250px;
}

.title {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    padding-left: 30px;
  }

.leftContent {
  flex: 0 0 310px;
  color: #354552;
  font-family: Roboto-Regular;
  background-color: $shallowGrey;
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    box-shadow: inset 0 -1px 0 0 #d1d8de;
    padding-left: 30px;
  }
  .leftLabel {
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    padding-left: 30px;
    &:hover {
      background-color: #879cab;
      color: white;
    }
  }
  .selected {
    background-color: #879cab;
    color: white;
  }
}

.topButton {
  padding: 10px 30px;
  justify-content: flex-end;
}

.leftSelector {
  border-radius: 2px;
  border: 1px;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px 30px;
  font-weight: bold;
  box-shadow: inset -1px -1px 0 0 #d1d8de;
  li {
    width: 100%;
    position: relative;
    line-height: 30px;
    padding: 0;
    margin:0;
    height: 70px;
    font-family: Roboto-Regular;
    font-size: 14px;
    color: #354552;
    text-align: -webkit-match-parent;
    list-style: none;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}

.previewHeight {
  height: 100px !important;
}
</style>
