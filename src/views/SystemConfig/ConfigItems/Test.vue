<template>
    <div>
        <el-table
        :data="tableData"
        stripe
        size="mini"
        highlight-current-row
        @cell-click="cellClickFunc"
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="id" label="序号">
            <template  slot-scope="scope">
                <span v-if="scope.row.isSet.id">
                <el-input size="mini"
                        v-model="scope.row.id"></el-input>
                </span>
                <span v-else>{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="sensitiveDescription" label="敏感描述"></el-table-column>
        <el-table-column prop="sensitiveSentence" label="敏感字段"></el-table-column>
        <el-table-column prop="sesitiveWord" label="敏感词"></el-table-column>
        <el-table-column prop="hospitalInstitution" label="医疗机构"></el-table-column>
      </el-table>
    </div>
</template>

<script>
import { open } from 'fs'

const defaultProp = {
  sensitiveDescription: '',
  sensitiveSentence: '',
  sesitiveWord: '',
  hospitalInstitution: '',
}

export default {
  data(){
      return {
        tableData: [
            {
            id: "1",
            sensitiveDescription: "右",
            sensitiveSentence: "检查提示",
            sesitiveWord: "左",
            hospitalInstitution: "下级医院112",
            isSet: {id:false,sensitiveDescription:false,sensitiveSentence:false,sesitiveWord:false,hospitalInstitution:false}
            },
            {
            id: "1",
            sensitiveDescription: "zuo",
            sensitiveSentence: "检查提示",
            sesitiveWord: "左",
            hospitalInstitution: "下级医院112",
            isSet: {id:false,sensitiveDescription:false,sensitiveSentence:false,sesitiveWord:false,hospitalInstitution:false}
            },
            {
            id: "1",
            sensitiveDescription: "zuo",
            sensitiveSentence: "检查提示",
            sesitiveWord: "左",
            hospitalInstitution: "下级医院112",
            isSet: {id:false,sensitiveDescription:false,sensitiveSentence:false,sesitiveWord:false,hospitalInstitution:false}
            },
            
        ],
        sel:null
    }
  },
  methods:{
      cellClickFunc(row,column,event,cell){
          console.log(row)
          console.log(column)
          var rowspan = column.rowSpan;
          console.log(rowspan)
          var colspan = column.colSpan;
          console.log(colspan)
          this.tableData[rowspan-1].isSet.id = !this.tableData[rowspan-1].isSet.id

      }
  }
}
</script>
