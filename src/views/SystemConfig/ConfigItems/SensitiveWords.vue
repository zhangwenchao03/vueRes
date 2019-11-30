<template>
  <div class="FlexRow Fill">
    <el-row>
      <div style="margin-left:30px;">查询条件：</div>
      <div class="FlexCol searchCondition">
        <el-form ref="searchForm" :model="form" class="Fill">
          <ul>
            <li>
              <el-form-item prop="keyWord">
                <el-select v-model="form.keyWord" placeholder="请选择" style="display:flex;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="searchWord">
                <el-input
                  v-model="form.searchWord"
                  prefix-icon="el-icon-search"
                  @keyup.enter.native="searchDataForTable('searchForm')"
                ></el-input>
              </el-form-item>
            </li>
          </ul>
        </el-form>
      </div>
    </el-row>

    <el-row class="Fill" style="margin:0 20px;">
      <el-table
        :data="tableData.slice((currpage-1)*pageSize,currpage*pageSize)"
        stripe
        size="mini"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="sensitiveDescription" label="敏感描述"></el-table-column>
        <el-table-column prop="sensitiveSentence" label="敏感字段"></el-table-column>
        <el-table-column prop="sesitiveWord" label="敏感词"></el-table-column>
        <el-table-column prop="hospitalInstitution" label="医疗机构"></el-table-column>
      </el-table>
    </el-row>
    <el-row class="Fill shadow-b" style="height:50px;">
      <div id="paginationContainer" class="FlexCol">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currpage"
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          layout="total,sizes"
          :total="tableData.length"
        ></el-pagination>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currpage"
          :page-size="pageSize"
          layout="prev,pager,next"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </el-row>
    <el-row class="FlexCol bottomShow">
      <ul style="width:100%;">
        <el-form ref="submitform" :model="submitform">
        <li>
          <el-form-item prop="sensitiveDescription" label="敏感描述" required='true'>
                <el-select v-model="submitform.sensitiveDescription" placeholder="请选择" style="width:100%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
        </li>
        <li>
          <el-form-item prop="sensitiveSentence" label="敏感字段" required='true'>
                <el-select v-model="submitform.sensitiveSentence" placeholder="请选择"  style="width:100%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
        </li>
        <li>
          <el-form-item prop="sesitiveWord" label="敏感词" required='true'  style="width:100%;">
                <el-input
                  v-model="submitform.sesitiveWord"
                ></el-input>
              </el-form-item>
        </li>
        </el-form>
      </ul>
    </el-row>
    <el-row>
      <div class="submitBtn">
        <el-button class="btn secondary" @click="submit">设置</el-button>
        <el-button class="btn secondary" @click="submit">保存</el-button>
        <el-button class="btn secondary" @click="submit">删除</el-button>
        <el-button class="btn primary" @click="submit">新增</el-button>
      </div>
    </el-row>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 15,
      currpage: 1,
      tableData: [
        {
          id: "1",
          sensitiveDescription: "右",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        },
        {
          id: "1",
          sensitiveDescription: "zuo",
          sensitiveSentence: "检查提示",
          sesitiveWord: "左",
          hospitalInstitution: "下级医院112"
        }
      ],
      options: [
        {
          value: "sensitiveDescription",
          label: "敏感描述"
        },
        {
          value: "sensitiveSentence",
          label: "敏感字段"
        },
        {
          value: "sesitiveWord",
          label: "敏感词"
        }
      ],
      form: {
        keyWord: "",
        searchWord: ""
      },
      submitform: {
        sensitiveDescription: "",
        sensitiveSentence: "",
        sesitiveWord: ""
      }
    };
  },
  computed: {
    tableHeight(){
      return document.body.clientHeight - 200;
    }
    
  },
  methods: {
    searchDataForTable(searchForm) {
      //console.log(this.form.keyWord)
      var tempTable = [];
      this.$refs[searchForm].validate(valid => {
        if (valid) {
          //此处为search查询的数据，请保存到data并展示到table中
          if (this.form.keyWord === "sensitiveDescription") {
            for (var i = 0; i < this.tableData.length; i++) {
              if (
                this.tableData[i].sensitiveDescription == this.form.searchWord
              ) {
                tempTable.push(this.tableData[i]);
              }
            }
          } else if (this.form.keyWord === "sensitiveSentence") {
            for (var i = 0; this.tableData.length; i++) {
              if (this.tableData[i].sensitiveSentence == this.form.searchWord) {
                tempTable.push(this.tableData[i]);
              }
            }
          } else if (this.form.keyWord === "sesitiveWord") {
            for (var i = 0; this.tableData.length; i++) {
              if (this.tableData[i].sesitiveWord == this.form.searchWord) {
                tempTable.push(this.tableData[i]);
              }
            }
          } else {
            tempTable = [
              {
                id: "1",
                sensitiveDescription: "右",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "右",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "右",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              },
              {
                id: "1",
                sensitiveDescription: "zuo",
                sensitiveSentence: "检查提示",
                sesitiveWord: "左",
                hospitalInstitution: "下级医院112"
              }
            ];
          }
          this.tableData = tempTable;
          console.log(this.tableData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit(submitform) {
      //console.log(this.form.keyWord)
      this.$refs[submitform].validate(valid => {
        if (valid) {}
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    //分页-每页条数
    handleSizeChange(val){
      console.log(`每页${val}条`)
      this.pageSize = val
    },
    //当前页
    handleCurrentChange(val){
      console.log(`当前页：${val}`)
      this.currpage = val;
    }
  }
};
</script>

<style scoped>
.searchCondition li {
  width: 25%;
  margin: 10px 0 10px 30px;
  position: relative;
  line-height: 30px;
  padding: 0;
  height: 30px;
  float: left;
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #000000;
  display: list-item;
  text-align: -webkit-match-parent;
  list-style: none;
  border-color: #000000 !important;
}

.bottomShow li{
  width: 27%;
  margin: 10px 0 10px 30px;
  position: relative;
  line-height: 80px;
  padding: 0;
  float: left;
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #000000;
  display: list-item;
  text-align: -webkit-match-parent;
  list-style: none;
  height: 80px;
  font-weight: bold;
}

.searchCondition li:last-child {
  width: 30%;
  margin-left: 5px;
}

.submitBtn {
  background: #ffffff;
  bottom: 0;
  width: 100%;
  height: 76px;
}

.submitBtn button {
    float: right;
    margin: 20px 20px 0 0;
}

.submitBtn button:first-child {
  margin-right: 30px;
}
</style>