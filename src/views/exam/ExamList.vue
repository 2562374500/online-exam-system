<template>
  <div class="exam-list">
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>考试列表</h2>
          <el-button type="primary" @click="showCreateDialog">创建考试</el-button>
        </div>
      </el-header>
      
      <el-main>
        <el-table :data="examList" style="width: 100%">
          <el-table-column prop="name" label="考试名称" />
          <el-table-column prop="duration" label="考试时长" />
          <el-table-column prop="startTime" label="开始时间" />
          <el-table-column prop="endTime" label="结束时间" />
          <el-table-column label="操作" width="250">
            <template #default="scope">
              <el-button type="primary" size="small" @click="startExam(scope.row)">开始考试</el-button>
              <el-button type="warning" size="small" @click="editExam(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="deleteExam(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 考试对话框 -->
        <el-dialog v-model="examDialogVisible" title="在线考试" width="80%" :close-on-click-modal="false">
          <div class="exam-content">
            <div class="exam-info">
              <h3>{{ currentExam.name }}</h3>
              <p>考试时长：{{ currentExam.duration }}</p>
              <div class="timer" v-if="remainingTime">剩余时间：{{ formatTime(remainingTime) }}</div>
            </div>

            <div class="questions" v-if="currentExam.questions">
              <div v-for="(question, index) in currentExam.questions" :key="index" class="question-item">
                <h4>{{ index + 1 }}. {{ question.title }}</h4>
                <div class="options" v-if="question.type === 'single' || question.type === 'multiple'">
                  <el-radio-group v-if="question.type === 'single'" v-model="answers[index]">
                    <el-radio v-for="(option, optIndex) in question.options" 
                             :key="optIndex" 
                             :label="option.value">{{ option.label }}</el-radio>
                  </el-radio-group>
                  <el-checkbox-group v-else v-model="answers[index]">
                    <el-checkbox v-for="(option, optIndex) in question.options" 
                               :key="optIndex" 
                               :label="option.value">{{ option.label }}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <el-input v-else-if="question.type === 'text'" 
                         type="textarea" 
                         v-model="answers[index]" 
                         :rows="4" 
                         placeholder="请输入答案"></el-input>
              </div>
            </div>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="submitExam">提交试卷</el-button>
            </span>
          </template>
        </el-dialog>

        <!-- 创建/编辑考试对话框 -->
        <el-dialog 
          v-model="editDialogVisible" 
          :title="isEdit ? '编辑考试' : '创建考试'" 
          width="60%">
          <el-form :model="examForm" label-width="100px">
            <el-form-item label="考试名称">
              <el-input v-model="examForm.name" placeholder="请输入考试名称"></el-input>
            </el-form-item>
            <el-form-item label="考试时长">
              <el-input v-model="examForm.duration" placeholder="请输入考试时长（如：120分钟）"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="examForm.startTime"
                type="datetime"
                placeholder="选择开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="examForm.endTime"
                type="datetime"
                placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
            
            <!-- 题目列表 -->
            <el-form-item label="考试题目">
              <div class="question-list">
                <div v-for="(question, index) in examForm.questions" :key="index" class="question-edit-item">
                  <el-card>
                    <template #header>
                      <div class="question-header">
                        <span>题目 {{ index + 1 }}</span>
                        <el-button type="danger" size="small" @click="removeQuestion(index)">删除</el-button>
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
                          <el-option label="简答题" value="text"></el-option>
                        </el-select>
                      </el-form-item>
                      
                      <!-- 选项（仅针对单选和多选题） -->
                      <template v-if="question.type === 'single' || question.type === 'multiple'">
                        <el-form-item label="选项">
                          <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
                            <el-input v-model="option.label" placeholder="选项内容">
                              <template #prepend>{{ String.fromCharCode(65 + optIndex) }}</template>
                            </el-input>
                            <el-button type="danger" size="small" @click="removeOption(question, optIndex)">删除</el-button>
                          </div>
                          <el-button type="primary" size="small" @click="addOption(question)">添加选项</el-button>
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
              <el-button type="primary" @click="saveExam">保存</el-button>
            </span>
          </template>
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
  type: 'single' | 'multiple' | 'text'
  options?: Array<{
    label: string
    value: string
  }>
}

interface Exam {
  id: number
  name: string
  duration: string
  startTime: string
  endTime: string
  questions: Question[]
}

// 模拟数据
const examList = reactive<Exam[]>([
  {
    id: 1,
    name: 'Java基础考试',
    duration: '120分钟',
    startTime: '2024-03-22 10:00',
    endTime: '2024-03-22 12:00',
    questions: [
      {
        title: 'Java中的基本数据类型有哪些？',
        type: 'multiple',
        options: [
          { label: 'byte', value: 'A' },
          { label: 'short', value: 'B' },
          { label: 'int', value: 'C' },
          { label: 'long', value: 'D' },
          { label: 'string', value: 'E' }
        ]
      },
      {
        title: '以下哪个不是Java的特性？',
        type: 'single',
        options: [
          { label: '封装', value: 'A' },
          { label: '继承', value: 'B' },
          { label: '多态', value: 'C' },
          { label: '指针', value: 'D' }
        ]
      },
      {
        title: '简述Java中的多态是什么？请举例说明。',
        type: 'text'
      }
    ]
  },
  {
    id: 2,
    name: '数据库设计考试',
    duration: '90分钟',
    startTime: '2024-03-23 14:00',
    endTime: '2024-03-23 15:30',
    questions: [
      {
        title: '数据库的三大范式是什么？',
        type: 'text'
      },
      {
        title: '以下哪些是关系型数据库？',
        type: 'multiple',
        options: [
          { label: 'MySQL', value: 'A' },
          { label: 'MongoDB', value: 'B' },
          { label: 'PostgreSQL', value: 'C' },
          { label: 'Redis', value: 'D' }
        ]
      }
    ]
  }
])

const examDialogVisible = ref(false)
const editDialogVisible = ref(false)
const isEdit = ref(false)
const currentExam = ref<Exam>({} as Exam)
const answers = ref<any[]>([])
const remainingTime = ref(0)

// 考试表单
const examForm = reactive<Exam>({
  id: 0,
  name: '',
  duration: '',
  startTime: '',
  endTime: '',
  questions: []
})

// 创建考试
const showCreateDialog = () => {
  isEdit.value = false
  Object.assign(examForm, {
    id: 0,
    name: '',
    duration: '',
    startTime: '',
    endTime: '',
    questions: []
  })
  editDialogVisible.value = true
}

// 编辑考试
const editExam = (exam: Exam) => {
  isEdit.value = true
  Object.assign(examForm, JSON.parse(JSON.stringify(exam)))
  editDialogVisible.value = true
}

// 删除考试
const deleteExam = (exam: Exam) => {
  ElMessageBox.confirm('确定要删除这个考试吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = examList.findIndex(item => item.id === exam.id)
    if (index !== -1) {
      examList.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}

// 添加题目
const addQuestion = () => {
  examForm.questions.push({
    title: '',
    type: 'single',
    options: [
      { label: '', value: 'A' },
      { label: '', value: 'B' },
      { label: '', value: 'C' },
      { label: '', value: 'D' }
    ]
  })
}

// 删除题目
const removeQuestion = (index: number) => {
  examForm.questions.splice(index, 1)
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

// 保存考试
const saveExam = () => {
  if (!examForm.name || !examForm.duration || !examForm.startTime || !examForm.endTime) {
    ElMessage.warning('请填写完整的考试信息')
    return
  }

  if (examForm.questions.length === 0) {
    ElMessage.warning('请至少添加一道题目')
    return
  }

  if (isEdit.value) {
    const index = examList.findIndex(item => item.id === examForm.id)
    if (index !== -1) {
      examList[index] = JSON.parse(JSON.stringify(examForm))
    }
  } else {
    examForm.id = examList.length + 1
    examList.push(JSON.parse(JSON.stringify(examForm)))
  }

  editDialogVisible.value = false
  ElMessage.success(isEdit.value ? '编辑成功' : '创建成功')
}

const startExam = (exam: Exam) => {
  currentExam.value = exam
  answers.value = new Array(exam.questions.length)
  examDialogVisible.value = true
  remainingTime.value = 5 * 60
  startTimer()
}

const startTimer = () => {
  const timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      clearInterval(timer)
      submitExam()
    }
  }, 1000)
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const submitExam = () => {
  ElMessage.success('考试提交成功！')
  examDialogVisible.value = false
}
</script>

<style scoped>
.exam-list {
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

.exam-content {
  padding: 20px;
}

.exam-info {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.timer {
  color: #f56c6c;
  font-size: 18px;
  margin-top: 10px;
}

.question-item {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.question-item h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.el-radio, .el-checkbox {
  margin-right: 30px;
}

.question-edit-item {
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.option-item .el-input {
  flex: 1;
}
</style> 