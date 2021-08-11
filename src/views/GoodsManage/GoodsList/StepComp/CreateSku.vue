<!--xiolng-->
<!--CreateSku-->
<!--2021/7/13-->
<!--14:05-->
<template>
  <div class="CreateSku">
    <a-modal
      :visible="visible"
      title="添加sku"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="规格名称">
          <a-input
            placeholder="请输入规格名称"
            v-decorator="[
              `specName`,
              {
                rules: [{required: true, message: '请输入规格名称'}]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

  export default {
    name: 'CreateSku',
    props: {
      visible: Boolean
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
      }
    },
    mounted () {
    },
    methods: {
    },
  }
</script>

<style scoped>
  .CreateSku {

  }
</style>
