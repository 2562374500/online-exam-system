<template>
  <div class="question-list">
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>题库管理</h2>
          <el-button type="primary">添加题目</el-button>
        </div>
      </el-header>
      
      <el-main>
        <el-table :data="questionList" style="width: 100%">
          <el-table-column prop="title" label="题目" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="difficulty" label="难度" />
          <el-table-column prop="category" label="分类" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// 模拟数据
const questionList = [
  {
    title: 'Java中的基本数据类型有哪些？',
    type: '多选题',
    difficulty: '中等',
    category: 'Java基础'
  },
  {
    title: '数据库设计中的三大范式是什么？',
    type: '简答题',
    difficulty: '困难',
    category: '数据库'
  }
]
</script>

<style scoped>
.question-list {
  min-height: 100vh;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-content h2 {
  margin: 0;
  color: #409EFF;
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
}
</style> 