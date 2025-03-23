<template>
  <div class="paper-list">
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>试卷列表</h2>
          <el-button type="primary" @click="showCreateDialog">创建试卷</el-button>
        </div>
      </el-header>
      
      <el-main>
        <el-table :data="paperList" style="width: 100%">
          <el-table-column prop="name" label="试卷名称" />
          <el-table-column prop="totalScore" label="总分" />
          <el-table-column prop="duration" label="建议时长" />
          <el-table-column prop="questionCount" label="题目数量" />
          <el-table-column label="操作" width="250">
            <template #default="scope">
              <el-button type="primary" size="small" @click="previewPaper(scope.row)">预览</el-button>
              <el-button type="warning" size="small" @click="editPaper(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="deletePaper(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 创建/编辑试卷对话框 -->
        <el-dialog 
          v-model="editDialogVisible" 
          :title="isEdit ? '编辑试卷' : '创建试卷'" 
          width="60%">
          <el-form :model="paperForm" label-width="100px">
            <el-form-item label="试卷名称">
              <el-input v-model="paperForm.name" placeholder="请输入试卷名称"></el-input>
            </el-form-item>
            <el-form-item label="总分">
              <el-input-number v-model="paperForm.totalScore" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="建议时长">
              <el-input v-model="paperForm.duration" placeholder="请输入建议时长（如：120分钟）"></el-input>
            </el-form-item>
            
            <!-- 题目列表 -->
            <el-form-item label="试卷题目">
              <div class="question-list">
                <div v-for="(question, index) in paperForm.questions" :key="index" class="question-edit-item">
                  <el-card>
                    <template #header>
                      <div class="question-header">
                        <span>题目 {{ index + 1 }}</span>
                        <div class="question-actions">
                          <el-input-number 
                            v-model="question.score" 
                            :min="0" 
                            :max="100" 
                            size="small" 
                            placeholder="分值">
                          </el-input-number>
                          <el-button type="danger" size="small" @click="removeQuestion(index)">删除</el-button>
                        </div>
                      </div>
                    </template>
                    
                    <el-form :model="question">
                      <el-form-item label="题目">
                        <el-input v-model="question.title" type="textarea" :rows="2"></el-input>
                      </el-form-item>
                      <el-form-item label="题型">
                        <el-select v-model="question.type" placeholder="请选择题型">
                          <el-option label="单选题" value="single"></el-option>
                          <el-option label="多选题" value="multiple"></el-option>
                          <el-option label="判断题" value="judge"></el-option>
                          <el-option label="简答题" value="text"></el-option>
                        </el-select>
                      </el-form-item>
                      
                      <!-- 选项（针对单选、多选和判断题） -->
                      <template v-if="['single', 'multiple'].includes(question.type)">
                        <el-form-item label="选项">
                          <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
                            <el-input v-model="option.label" placeholder="选项内容">
                              <template #prepend>{{ String.fromCharCode(65 + optIndex) }}</template>
                            </el-input>
                            <el-button type="danger" size="small" @click="removeOption(question, optIndex)">删除</el-button>
                          </div>
                          <el-button type="primary" size="small" @click="addOption(question)">添加选项</el-button>
                        </el-form-item>
                        <el-form-item label="正确答案">
                          <el-select 
                            v-if="question.type === 'single'"
                            v-model="question.answer" 
                            placeholder="请选择正确答案">
                            <el-option 
                              v-for="(option, index) in question.options" 
                              :key="index"
                              :label="String.fromCharCode(65 + index)"
                              :value="String.fromCharCode(65 + index)">
                            </el-option>
                          </el-select>
                          <el-checkbox-group 
                            v-else
                            v-model="question.answer">
                            <el-checkbox 
                              v-for="(option, index) in question.options" 
                              :key="index"
                              :label="String.fromCharCode(65 + index)">
                              {{ String.fromCharCode(65 + index) }}
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </template>
                      
                      <!-- 判断题答案 -->
                      <template v-if="question.type === 'judge'">
                        <el-form-item label="正确答案">
                          <el-radio-group v-model="question.answer">
                            <el-radio :label="true">正确</el-radio>
                            <el-radio :label="false">错误</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </template>

                      <!-- 简答题参考答案 -->
                      <template v-if="question.type === 'text'">
                        <el-form-item label="参考答案">
                          <el-input 
                            v-model="question.answer" 
                            type="textarea" 
                            :rows="3"
                            placeholder="请输入参考答案">
                          </el-input>
                        </el-form-item>
                      </template>
                    </el-form>
                  </el-card>
                </div>
                <el-button type="primary" @click="addQuestion">添加题目</el-button>
              </div>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="editDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="savePaper">保存</el-button>
            </span>
          </template>
        </el-dialog>

        <!-- 预览试卷对话框 -->
        <el-dialog 
          v-model="previewDialogVisible" 
          title="试卷预览" 
          width="80%">
          <div class="paper-preview">
            <div class="paper-info">
              <h2>{{ currentPaper.name }}</h2>
              <div class="paper-meta">
                <span>总分：{{ currentPaper.totalScore }}分</span>
                <span>建议时长：{{ currentPaper.duration }}</span>
              </div>
            </div>
            <div class="questions-preview">
              <div v-for="(question, index) in currentPaper.questions" :key="index" class="question-preview-item">
                <div class="question-preview-header">
                  <span class="question-number">{{ index + 1 }}</span>
                  <span class="question-type">[{{ getQuestionTypeName(question.type) }}]</span>
                  <span class="question-score">{{ question.score }}分</span>
                </div>
                <div class="question-content">
                  <p class="question-title">{{ question.title }}</p>
                  <div class="question-options" v-if="['single', 'multiple'].includes(question.type)">
                    <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option">
                      {{ String.fromCharCode(65 + optIndex) }}. {{ option.label }}
                    </div>
                  </div>
                  <div class="question-answer">
                    <strong>答案：</strong>
                    <template v-if="question.type === 'single' || question.type === 'multiple'">
                      {{ Array.isArray(question.answer) ? question.answer.join('、') : question.answer }}
                    </template>
                    <template v-else-if="question.type === 'judge'">
                      {{ question.answer ? '正确' : '错误' }}
                    </template>
                    <template v-else>
                      {{ question.answer }}
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface Question {
  title: string
  type: 'single' | 'multiple' | 'judge' | 'text'
  score: number
  options?: Array<{
    label: string
    value: string
  }>
  answer: string | string[] | boolean
}

interface Paper {
  id: number
  name: string
  totalScore: number
  duration: string
  questionCount: number
  questions: Question[]
}

// 模拟数据
const paperList = reactive<Paper[]>([
  {
    id: 1,
    name: 'Java基础试卷',
    totalScore: 100,
    duration: '120分钟',
    questionCount: 20,
    questions: [
      {
        title: 'Java中的基本数据类型有哪些？',
        type: 'multiple',
        score: 10,
        options: [
          { label: 'byte', value: 'A' },
          { label: 'short', value: 'B' },
          { label: 'int', value: 'C' },
          { label: 'long', value: 'D' },
          { label: 'string', value: 'E' }
        ],
        answer: ['A', 'B', 'C', 'D']
      },
      {
        title: '以下说法正确吗：Java中的String是基本数据类型',
        type: 'judge',
        score: 5,
        answer: false
      }
    ]
  }
])

const editDialogVisible = ref(false)
const previewDialogVisible = ref(false)
const isEdit = ref(false)
const currentPaper = ref<Paper>({} as Paper)

// 试卷表单
const paperForm = reactive<Paper>({
  id: 0,
  name: '',
  totalScore: 100,
  duration: '',
  questionCount: 0,
  questions: []
})

// 显示创建对话框
const showCreateDialog = () => {
  isEdit.value = false
  Object.assign(paperForm, {
    id: 0,
    name: '',
    totalScore: 100,
    duration: '',
    questionCount: 0,
    questions: []
  })
  editDialogVisible.value = true
}

// 编辑试卷
const editPaper = (paper: Paper) => {
  isEdit.value = true
  Object.assign(paperForm, JSON.parse(JSON.stringify(paper)))
  editDialogVisible.value = true
}

// 预览试卷
const previewPaper = (paper: Paper) => {
  currentPaper.value = paper
  previewDialogVisible.value = true
}

// 删除试卷
const deletePaper = (paper: Paper) => {
  ElMessageBox.confirm('确定要删除这份试卷吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = paperList.findIndex(item => item.id === paper.id)
    if (index !== -1) {
      paperList.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

// 添加题目
const addQuestion = () => {
  paperForm.questions.push({
    title: '',
    type: 'single',
    score: 5,
    options: [
      { label: '', value: 'A' },
      { label: '', value: 'B' },
      { label: '', value: 'C' },
      { label: '', value: 'D' }
    ],
    answer: ''
  })
}

// 删除题目
const removeQuestion = (index: number) => {
  paperForm.questions.splice(index, 1)
}

// 添加选项
const addOption = (question: Question) => {
  if (!question.options) {
    question.options = []
  }
  question.options.push({
    label: '',
    value: String.fromCharCode(65 + question.options.length)
  })
}

// 删除选项
const removeOption = (question: Question, index: number) => {
  if (question.options) {
    question.options.splice(index, 1)
  }
}

// 获取题型名称
const getQuestionTypeName = (type: string) => {
  const typeMap: Record<string, string> = {
    single: '单选题',
    multiple: '多选题',
    judge: '判断题',
    text: '简答题'
  }
  return typeMap[type] || type
}

// 保存试卷
const savePaper = () => {
  if (!paperForm.name || !paperForm.duration) {
    ElMessage.warning('请填写完整的试卷信息')
    return
  }

  if (paperForm.questions.length === 0) {
    ElMessage.warning('请至少添加一道题目')
    return
  }

  // 计算总分和题目数量
  paperForm.questionCount = paperForm.questions.length
  paperForm.totalScore = paperForm.questions.reduce((total, q) => total + q.score, 0)

  if (isEdit.value) {
    const index = paperList.findIndex(item => item.id === paperForm.id)
    if (index !== -1) {
      paperList[index] = JSON.parse(JSON.stringify(paperForm))
    }
  } else {
    paperForm.id = paperList.length + 1
    paperList.push(JSON.parse(JSON.stringify(paperForm)))
  }

  editDialogVisible.value = false
  ElMessage.success(isEdit.value ? '编辑成功' : '创建成功')
}
</script>

<style scoped>
.paper-list {
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

.question-edit-item {
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.option-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.option-item .el-input {
  flex: 1;
}

.paper-preview {
  padding: 20px;
}

.paper-info {
  text-align: center;
  margin-bottom: 30px;
}

.paper-meta {
  color: #666;
  margin-top: 10px;
}

.paper-meta span {
  margin: 0 15px;
}

.question-preview-item {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.question-preview-header {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.question-number {
  background-color: #409EFF;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question-type {
  color: #666;
}

.question-score {
  color: #f56c6c;
}

.question-title {
  font-weight: bold;
  margin-bottom: 15px;
}

.question-options {
  margin: 10px 0;
}

.option {
  margin: 5px 0;
  padding: 5px 0;
}

.question-answer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #ddd;
}
</style> 