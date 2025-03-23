<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header-content">
          <h1>在线模拟考试系统</h1>
          <el-menu mode="horizontal" :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/exam">考试</el-menu-item>
            <el-menu-item index="/paper">试卷</el-menu-item>
            <el-menu-item index="/question">题库</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      
      <el-main>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <span>在线考试</span>
                </div>
              </template>
              <div class="card-content">
                <p>支持多种题型的在线考试，实时评分，即时反馈</p>
              </div>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <span>试卷管理</span>
                </div>
              </template>
              <div class="card-content">
                <p>灵活的试卷管理，支持多种题型组合，随机抽题</p>
              </div>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <span>题库管理</span>
                </div>
              </template>
              <div class="card-content">
                <p>丰富的题库管理功能，支持多种题型，分类管理</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      
      <el-footer>
        <div class="footer-content">
          <p>© 2024 在线模拟考试系统 版权所有</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-content h1 {
  margin: 0;
  color: #409EFF;
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
}

.feature-card {
  margin-bottom: 20px;
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  text-align: center;
  color: #666;
}

.footer-content {
  text-align: center;
  color: #909399;
  padding: 20px 0;
}

.el-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.el-footer {
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
}
</style> 