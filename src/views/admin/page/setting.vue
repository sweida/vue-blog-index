<template>
<div>
  <div class="header_title">设置<i class="el-icon-info"></i></div>
  <div class="main-content scroll">

    <div class="rechargeli">
      <div class="top"></div>
      <p class="title">营业设定</p>
      <div class="user-img">
        <!-- <img src="static/img/icon1.png" alt=""> -->
      </div>
      <el-form v-model="setting" label-width="130px">
        <el-form-item label="营业开始时间">
          <el-time-select size="small" v-model="setting.bookingStarttime" :clearable="false" :picker-options="{start:'08:00', step: '00:30', end:'24:00' }" placeholder="选择时间"> </el-time-select>
        </el-form-item>
        <el-form-item label="营业结束时间">
          <el-time-select size="small" v-model="setting.bookingEndtime" :clearable="false" :picker-options="{start:'08:00', step: '00:30', end:'24:00', minTime: setting.bookingStarttime}" placeholder="选择时间"> </el-time-select>
        </el-form-item>
        <el-form-item label="今日目标收入">
          <el-input v-model="setting.todayIncome" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="预定默认保留时间">
          <el-select v-model="setting.roomDefaultKeepTime" size="small">
            <el-option v-for="item in 12" :key="item.value" :label="item*10+'分钟'" :value="item*10+''">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户预约开关">
          <el-switch v-model="setting.cusPreSwitch" active-value="1" inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="rechargeli rechargeli2">
      <div class="top"></div>
      <p class="title">其它</p>
      <div class="user-img">
        <!-- <img src="static/img/icon2.png" alt=""> -->
      </div>
      <el-form ref="form" v-model="setting" label-width="130px">
        <el-form-item label="打印规格" label-width="80px">
          <el-radio-group v-model="setting.print">
            <el-radio :label="'1'">热敏打印</el-radio>
            <el-radio :label="'2'">A4打印</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="客户号码显示开关">
          <el-switch v-model="setting.cusPhoneShowSwitch" active-value="1" inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="耗卡价格显示开关">
          <el-switch v-model="setting.cardPriceShowSwitch" active-value="1" inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="跨行业开关">
          <el-switch v-model="setting.crossIndustrySwitch" active-value="1" inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="rechargeli rechargeli3">
      <div class="top"></div>
      <p class="title">微信</p>
      <div class="user-img">
        <!-- <img src="static/img/icon3.png" alt=""> -->
      </div>
      <el-form :rules="rules" ref="ruleForm" :model="setting" label-width="140px" label-position="left">
        <el-form-item label="微信公众号ID" prop="wxPublicNumId">
          <el-input v-model="setting.wxPublicNumId" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="微信公众号秘钥" prop="wxPublicNumKey">
          <el-input v-model="setting.wxPublicNumKey" size="mini"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div class="footer">
    <el-button type="primary" size="small" @click="saveBtn">保　存</el-button>
  </div>

</div>
</template>

<script>
// import {
//   editSetting,
//   getSetting
// } from '@/api/setting'
export default {
  name: 'app',
  data() {
    return {
      setting: {
        bookingStarttime: '08:00',
        bookingEndtime: '10:30',
        todayIncome: '',
        roomDefaultKeepTime: '30', //房间默认保留时间
        cusPreSwitch: '1', //客户预约开关
        print: '1',
        cusPhoneShowSwitch: '1', // 客户号码显示
        cardPriceShowSwitch: '1', //耗卡价格显示
        crossIndustrySwitch: '1', // 跨行业开关
        wxPublicNumId: '',
        wxPublicNumKey: '',
        enterpriseId: '001'
      },
      rules: {
        wxPublicNumId: [{
          required: true,
          message: '请输入微信公众号ID',
          trigger: 'change'
        }],
        wxPublicNumKey: [{
          required: true,
          message: '请输入微信公众号秘钥',
          trigger: 'change'
        }]
      }
    }
  },
  created() {
    // this.getSetInfo()
  },
  methods: {
    getSetInfo() {
      getSetting('001').then(res => {
        this.setting = res.data.data
        let timeli = res.data.data
        this.setting.bookingStarttime = res.data.data.bookingStarttime.substring(0, 5)
        this.setting.bookingEndtime = res.data.data.bookingEndtime.substring(0, 5)
      })
    },
    saveBtn() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.setting.bookingStarttime = this.setting.bookingStarttime + ':00'
          this.setting.bookingEndtime = this.setting.bookingEndtime + ':00'
          editSetting(this.setting).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg)
              this.getSetInfo()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.rechargeli .el-input--suffix .el-input__inner {
  padding-right: 10px;
}
.rechargeli2 .el-radio+.el-radio {
  margin-left: 12px;
}
.rechargeli2 .el-radio__label {
  padding-left: 6px;
}
.rechargeli2 .el-form-item__label {
  text-align: left;
}
</style>

<style scoped lang="stylus">
.main-content {
    display: flex;
    align-items: center;
    padding: 50px 0;
    .main-head {
        color: #5e6d82;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 800px;
        span {
            padding-left: 10px;
            color: #99a9c0;
        }
    }
    .el-input {
        width: 100px;
    }
    .el-select {
        width: 100px;
    }
}
.user-img {
    margin: 15px 0 60px;
}
.el-switch {
    margin-left: 60px;
}
</style>