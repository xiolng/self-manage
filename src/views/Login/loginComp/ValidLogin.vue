<!--验证码登录-->
<template>
  <div class="valid-login">
    <div class="form-box">
      <a-form :form="form">
        <a-form-item>
          <a-input
            placeholder="租户编码"
            v-decorator="[
                  'tenantCode',
                  {rules: [{required: true, message: '请输入租户编码', trigger: 'change'}]}
                ]"
          >
            <a-icon slot="prefix" type="ordered-list" style="color: #888; font-size: 14px;" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="手机号"
            v-decorator="[
                  'phone',
                  {rules: [
                    {required: true, message: '请输入手机号', trigger: 'change'},
                    {validator: isPhone, message: '请输入正确手机号'}
                    ]}
                ]"
          >
            <icon-font slot="prefix" type="iconphone" style="color: #888; font-size: 14px;" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="验证码"
            v-decorator="[
                  'validateCode',
                  {rules: [{required: true, message: '请输入验证码', trigger: 'change'}]}
                ]"
          >
            <a-icon slot="prefix" type="mail" style="color: #888; font-size: 14px;" />
            <a-button
              type="link"
              size="small"
              slot="addonAfter"
              @click="getCode"
              :disabled="validTime != 60"
            >{{validTime == 60 ? '发送验证码':
              validTxt}}
            </a-button>
          </a-input>
        </a-form-item>
        <a-button
          type="primary"
          block
          @click="login"
        >登录
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
  import { validPhone } from "../../../utils"
  import { getValidateCode, setLogin } from "../../../api/login"

  export default {
    name: 'ValidLogin',
    data () {
      return {
        form: this.$form.createForm(this, {name: 'login'}),
        validTime: 60,
        validTxt: ''
      }
    },
    methods: {
      login (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            setLogin(values).then(res => {
              if (res.data.code === '401') {
                this.$message.error(res.data.msg)
                return false
              }
              if (res.data && res.data.accessToken) {
                localStorage.setItem('accessToken', `${res.data.tokenType} ${res.data.accessToken}`)
                this.form.resetFields()
                const link = localStorage.getItem('link')
                if (link && !link.includes('signin')) {
                  this.$router.push(link.split('#')[1])
                  return false
                }
                this.$router.push('/')
              } else {
                this.$message.error('用户名或密码错误')
              }
            }, () => {
              this.$message.error('用户名或密码错误')
            })
          } else {
            this.$message.error('请输入完整信息!')
          }
        })
      },
      // 获取验证码
      getCode () {
        this.form.validateFields(['phone'], (err, val) => {
          if (!err) {
            this.validTime = 59
            this.validTxt = '59s'
            getValidateCode({
              phone: val.phone
            }).then(res => {
              const {data, code, msg} = res.data
              if (code == '200') {
                const dates = setInterval(() => {
                  this.validTime--
                  this.validTxt = `${this.validTime}s`
                  if (this.validTime <= 0) {
                    clearInterval(dates)
                    this.validTime = 60
                  }
                }, 1000)
              } else {
                this.$message.error(msg)
              }
            })
          }
        })
        console.log(3333)
      },
      isPhone (rule, value, callback) {
        if (!value || !validPhone(this.form.getFieldValue('phone'))) {
          callback(Error('请输入正确手机号码'))
        }
        callback()
      }
    }
  }
</script>

<style scoped lang="less">
  .valid-login {
    .form-box {
      max-width: 300px;
      margin: 20px auto;
    }
  }
</style>
