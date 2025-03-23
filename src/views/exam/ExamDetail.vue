<template>
  <div class="exam-container">
    <header class="exam-header">
      <h1>{{ exam.name }}</h1>
      <div class="exam-info">
        <span>总分：{{ exam.totalScore }}分</span>
        <span>时长：{{ exam.duration }}分钟</span>
        <span>剩余时间：{{ remainingTime }}</span>
      </div>
    </header>

    <main class="exam-content">
      <div class="question-list">
        <div v-for="(question, index) in exam.questions" :key="question.id" class="question-item">
          <div class="question-header">
            <span class="question-number">{{ index + 1 }}</span>
            <span class="question-score">{{ question.score }}分</span>
          </div>
          
          <div class="question-content">
            <h3>{{ question.title }}</h3>
            <p>{{ question.content }}</p>
            
            <!-- 单选题 -->
            <div v-if="question.type === 1" class="options">
              <label v-for="option in question.options" :key="option.value">
                <input 
                  type="radio" 
                  :name="'question_' + question.id"
                  :value="option.value"
                  v-model="answers[question.id]"
                >
                {{ option.label }}
              </label>
            </div>
            
            <!-- 多选题 -->
            <div v-if="question.type === 2" class="options">
              <label v-for="option in question.options" :key="option.value">
                <input 
                  type="checkbox" 
                  :value="option.value"
                  v-model="answers[question.id]"
                >
                {{ option.label }}
              </label>
            </div>
            
            <!-- 判断题 -->
            <div v-if="question.type === 3" class="options">
              <label>
                <input 
                  type="radio" 
                  :name="'question_' + question.id"
                  value="true"
                  v-model="answers[question.id]"
                >
                正确
              </label>
              <label>
                <input 
                  type="radio" 
                  :name="'question_' + question.id"
                  value="false"
                  v-model="answers[question.id]"
                >
                错误
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="exam-footer">
      <button class="submit-btn" @click="submitExam">提交试卷</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const remainingTime = ref('120:00')
let timer: number

// 模拟考试数据
const exam = ref({
  id: 1,
  name: 'Java基础考试',
  totalScore: 100,
  duration: 120,
  questions: [
    {
      id: 1,
      type: 1,
      title: '单选题',
      content: '以下哪个不是Java的基本数据类型？',
      score: 5,
      options: [
        { value: 'A', label: 'int' },
        { value: 'B', label: 'double' },
        { value: 'C', label: 'String' },
        { value: 'D', label: 'boolean' }
      ]
    },
    {
      id: 2,
      type: 2,
      title: '多选题',
      content: '以下哪些是面向对象的特征？',
      score: 10,
      options: [
        { value: 'A', label: '封装' },
        { value: 'B', label: '继承' },
        { value: 'C', label: '多态' },
        { value: 'D', label: '重载' }
      ]
    },
    {
      id: 3,
      type: 3,
      title: '判断题',
      content: 'Java是编译型语言。',
      score: 5
    }
  ]
})

const answers = ref<Record<number, any>>({})

// 更新剩余时间
const updateRemainingTime = () => {
  let [minutes, seconds] = remainingTime.value.split(':').map(Number)
  
  if (seconds > 0) {
    seconds--
  } else if (minutes > 0) {
    minutes--
    seconds = 59
  } else {
    clearInterval(timer)
    submitExam()
    return
  }
  
  remainingTime.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// 提交试卷
const submitExam = () => {
  console.log('提交答案：', answers.value)
  router.push('/exam-result')
}

onMounted(() => {
  timer = setInterval(updateRemainingTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.exam-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.exam-header {
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.exam-info {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  color: #666;
}

.exam-content {
  flex: 1;
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.question-item {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.question-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.question-number {
  background-color: #409eff;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.question-score {
  color: #f56c6c;
}

.options {
  margin-top: 1rem;
}

.options label {
  display: block;
  margin-bottom: 1rem;
  cursor: pointer;
}

.options input {
  margin-right: 0.5rem;
}

.exam-footer {
  text-align: center;
}

.submit-btn {
  padding: 0.8rem 2rem;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  opacity: 0.8;
}
</style> 