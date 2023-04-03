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
  <el-input v-model="spuName"></el-input>
  <el-button type="primary" @click="search">查询</el-button>
  <el-button type="primary" @click="add">添加</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="spuName" label="品名" />
    <el-table-column prop="color" label="颜色" />
    <el-table-column prop="colorCode" label="色号" />
    <el-table-column prop="fineCode" label="细码" />
    <el-table-column prop="number" label="库存" />
    <el-table-column prop="isActive" label="是否启用" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="warehouse" label="仓库" />
    <el-table-column prop="menchart" label="商家" />
    <el-table-column label="tag">
      <template #="prop">
        <el-button @click="addTag(prop.row.spuName)">tag</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="outerVisible">
    <el-form
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="spuName">
        <el-input v-model="formLabelAlign.spuName" />
      </el-form-item>
      <el-form-item label="color">
        <el-input v-model="formLabelAlign.color" />
      </el-form-item>
      <el-form-item label="colorCode">
        <el-input v-model="formLabelAlign.colorCode" />
      </el-form-item>
      <el-form-item label="fineCode">
        <el-input v-model="formLabelAlign.fineCode" />
      </el-form-item>
      <el-form-item label="number">
        <el-input v-model="formLabelAlign.number" />
      </el-form-item>
      <el-form-item label="isActive">
        <el-input v-model="formLabelAlign.isActive" />
      </el-form-item>
      <el-form-item label="menchart">
        <el-input v-model="formLabelAlign.menchart" />
      </el-form-item>
      <el-form-item label="warehouse">
        <el-input v-model="formLabelAlign.warehouse" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="create">创建</el-button>
  </el-dialog>
  <el-dialog v-model="outerVisible1">
    <el-form
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="tag">
        {{ activeSpuName }}
      </el-form-item>
      <el-form-item label="tag">
        <el-input v-model="tag" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="createTag">确定</el-button>
  </el-dialog>
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

const spuName = ref('');
const tag = ref('');
const activeSpuName = ref('');
const formLabelAlign = ref({
  id: '',

  spuName: '测试001',

  color: '黑色',

  colorCode: '#333',

  fineCode: 'Y7654324',

  number: 11,

  isActive: 1,

  menchart: [],

  warehouse: { name: '', code: '' }
});
const outerVisible = ref(false);
const outerVisible1 = ref(false);
const tableData = ref([]);

const search = () => {
  fetch(`api/dbtest?spuName=${spuName.value}&page=1&pageSize=10`)
    .then(res => res.json())
    .then(res => {
      tableData.value = res.data.data;
    });
};

const add = () => {
  outerVisible.value = true;
};
const addTag = (v: string) => {
  activeSpuName.value = v;
  outerVisible1.value = true;
};
const create = () => {
  const params = {
    spuName: formLabelAlign.value.spuName,
    color: formLabelAlign.value.color,
    colorCode: formLabelAlign.value.colorCode,
    fineCode: formLabelAlign.value.fineCode,
    number: Number(formLabelAlign.value.number),
    isActive: Number(formLabelAlign.value.isActive)
  };
  fetch('api/dbtest', {
    method: 'post',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  })
    .then(res => res.json())
    .then(res => {});
};

const createTag = () => {
  const params = {
    spuName: activeSpuName.value,
    tag: tag.value
  };
  fetch('api/dbtest/tag', {
    method: 'post',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  })
    .then(res => res.json())
    .then(res => {});
};
</script>
