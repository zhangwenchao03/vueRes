<template>
  <div id="dialog">
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose" top="0">
      <el-divider></el-divider>
      <slot name="dialogContent"></slot>
      <!-- 提示框 -->
      <span v-if="dialogType === 'default'" slot="footer" class="dialog-footer">
        <el-button class="btn primary" type="primary" @click="submit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </span>
      <!-- 預約登記/高級搜索 -->
      <span v-else-if="dialogType === 'search'" slot="footer" class="dialog-footer">
        <el-button class="btn primary" @click="cancel">搜 索</el-button>
        <el-button type="primary" @click="submit">清 空</el-button>
      </span>
      <span v-else-if="dialogType === 'papr'" slot="footer" class="dialog-footer">
        <el-button class="btn secondary" @click="cancel">取 消</el-button>
      </span>
      <!-- 关于 -->
      <span v-else-if="dialogType === 'about'" slot="footer" class="dialog-footer">
        <el-button class="btn primary" @click="cancel">确 定</el-button>
      </span>
      <!-- 关于 -->
      <span v-else-if="dialogType === 'checkItems'" slot="footer" class="dialog-footer">
        <el-button class="btn primary" @click="submit">确 定</el-button>
        <el-button class="btn secondary" @click="cancel">取 消</el-button>
        <el-button class="btn secondary" @click="truncate">清 空</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["title", "dialogVisible", "dialogType", "requestData"],
  data() {
    return {};
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    cancel() {
      this.$emit("hiddeDialog", this.dialogVisible);
    },
    submit() {
      if (this.requestData.method === "get") {
        this.$ajax
          .get(this.requestData.url)
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (this.requestData.method === "post") {
        this.$ajax
          .post(this.requestData.url, this.requestData.options)
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    truncate() {
      this.$emit('truncateCheckItemsValue');
    }
  },
  mounted() {
    console.log(this.requestData.url);
  }
};
</script>

<style scoped>
</style>

<style>
.el-dialog__title {
  text-align: left;
  font-size: 16px;
  color: #354552;
  line-height: 20px;
}
.el-divider--horizontal {
  margin: 0;
}
.el-dialog__body {
  padding: 0;
  margin: 0 20px;
  border-bottom: none;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.el-dialog__wrapper .el-dialog {
  margin: 0;
  width: 700px !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) !important;
}
.el-dialog__header {
  padding: 15px 0;
  margin: 0 30px;
}
.el-dialog__footer {
  padding: 20px 0;
  margin: 0 30px;
}
</style>
