<template>
    <el-row id="reportSummary" class="FlexCol">
        <el-col :span="8" class="FlexRow">
            <p>检查所见</p>
            <textarea id="detail_ImageDescript" readonly class="Fill"></textarea>
        </el-col>
        <el-col :span="8" class="FlexRow">
            <p>检查提示</p>
            <textarea id="detail_ImageDescript" readonly class="Fill"></textarea>
        </el-col>
        <el-col :span="8" class="FlexRow">
            <p>备注</p>
            <textarea id="detail_ImageDescript" readonly class="Fill"></textarea>
        </el-col>
    </el-row>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    #reportSummary{
        margin: 0;
        height: 100%;
        padding: 40px 0 60px 0;
    }

    #reportSummary > div{
        margin: 0 30px;
    }

    #reportSummary > div p{
        font-size: 12px;
        color: #7B8994;
        font-weight: normal;
    }

    #reportSummary > div textarea {
        padding: 10px;
        border: 1px solid #D1D8DE;
        border-radius: 2px;
        overflow: auto;
        resize: none;
        background: transparent;
        line-height: normal;
        font-size: 14px;
        outline: none;
    }
</style>


