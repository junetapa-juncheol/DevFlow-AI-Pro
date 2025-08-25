import { motion } from 'framer-motion'
import { 
  Code, 
  GitCommit, 
  FileText, 
  GitHub, 
  Zap, 
  Shield, 
  Cpu, 
  TrendingUp,
  ArrowRight,
  Star
} from 'lucide-react'

import FeatureCard from '../components/common/FeatureCard'
import StatsCard from '../components/common/StatsCard'

const HomePage = () => {
  const features = [
    {
      icon: Code,
      title: 'AI 코드 리뷰',
      description: '코드 품질, 보안, 성능을 자동으로 분석하고 개선사항을 제안합니다.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: GitCommit,
      title: '스마트 커밋 메시지',
      description: '변경사항을 분석해서 의미있는 커밋 메시지를 자동으로 생성합니다.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: FileText,
      title: '프로젝트 분석',
      description: '코드베이스 구조를 분석하고 자동으로 문서화합니다.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: GitHub,
      title: 'GitHub 통합',
      description: 'GitHub 레포지토리와 완벽하게 연동되는 워크플로우를 제공합니다.',
      color: 'text-gray-700',
      bgColor: 'bg-gray-100'
    }
  ]

  const stats = [
    { label: '코드 분석 정확도', value: '98%', icon: Cpu },
    { label: '개발 시간 단축', value: '45%', icon: Zap },
    { label: '버그 감지율', value: '92%', icon: Shield },
    { label: '생산성 향상', value: '60%', icon: TrendingUp }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white overflow-hidden"
      >
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              DevFlow-AI
              <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">
                AI-Powered Developer Assistant
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl"
          >
            개발 워크플로우를 혁신하는 AI 도구. 코드 리뷰부터 커밋 메시지 생성까지, 
            모든 것을 자동화하여 개발자의 생산성을 극대화합니다.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2">
              시작하기
              <ArrowRight size={16} />
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-blue-600 flex items-center gap-2">
              <GitHub size={16} />
              GitHub에서 보기
            </button>
          </motion.div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
          <div className="w-72 h-72 rounded-full bg-white"></div>
        </div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 opacity-5">
          <div className="w-96 h-96 rounded-full bg-white"></div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">주요 기능</h2>
          <p className="text-lg text-gray-600">
            개발자의 일상적인 작업을 AI가 대신 처리하여 더 창조적인 일에 집중할 수 있게 합니다.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quick Start Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">빠른 시작</h2>
          <p className="text-lg text-gray-600">
            몇 분만에 DevFlow-AI를 설정하고 개발 생산성을 향상시키세요.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-lg">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">GitHub 연결</h3>
            <p className="text-gray-600">
              GitHub 계정을 연결하고 레포지토리에 접근 권한을 설정합니다.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-lg">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">API 키 설정</h3>
            <p className="text-gray-600">
              AI API 키를 설정하여 강력한 AI 기능을 활성화합니다.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="card text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-lg">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">바로 사용</h3>
            <p className="text-gray-600">
              코드를 업로드하고 AI의 도움으로 개발 속도를 가속화하세요.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-center bg-white rounded-2xl p-8 border border-gray-200"
      >
        <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          지금 바로 시작해보세요!
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          DevFlow-AI와 함께 개발 워크플로우를 혁신하고, 더 나은 코드를 더 빠르게 작성하세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary flex items-center gap-2">
            <Code size={16} />
            코드 리뷰 시작
          </button>
          <button className="btn-outline flex items-center gap-2">
            <GitCommit size={16} />
            커밋 메시지 생성
          </button>
        </div>
      </motion.section>
    </div>
  )
}

export default HomePage