<template>
  <el-form :model="formInline">
    <el-form-item label="用户">
      <el-input v-model="formInline.user" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formInline.region" type="password" />
    </el-form-item>
    <el-form-item label="验证码">
      <el-input v-model="formInline.code" />
      <img @click="changeCode" :src="codeUrl" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
    <el-button type="primary" @click="downloadStream">下载</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const formInline = reactive({
  user: '',
  code: '',
  region: ''
});
const codeUrl = ref<string>('/api/user/code');

const changeCode = () => {
  codeUrl.value = `/api/user/code?${Date.now()}`;
};
const onSubmit = () => {
  fetch('api/user/create', {
    method: 'post',
    body: JSON.stringify(formInline),
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
};

const downloadStream = () => {
  fetch('api/upload/stream')
    .then(res => res.arrayBuffer())
    .then(res => {
      const blob = new Blob([res]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'zs.zip';
      a.click();
    });
};
</script>
