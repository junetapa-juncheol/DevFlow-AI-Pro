import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

// Layout Components
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'

// Pages
import HomePage from './pages/HomePage'
import CodeReviewPage from './pages/CodeReviewPage'
import CommitGeneratorPage from './pages/CommitGeneratorPage'
import ProjectAnalysisPage from './pages/ProjectAnalysisPage'
import GitHubIntegrationPage from './pages/GitHubIntegrationPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

// Hooks
import { useSidebar } from './hooks/useSidebar'

function App() {
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebar()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        {/* Top Navigation */}
        <Navbar onMenuClick={toggleSidebar} />
        
        {/* Page Content */}
        <motion.main 
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/code-review" element={<CodeReviewPage />} />
            <Route path="/commit-generator" element={<CommitGeneratorPage />} />
            <Route path="/project-analysis" element={<ProjectAnalysisPage />} />
            <Route path="/github-integration" element={<GitHubIntegrationPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </div>
    </div>
  )
}

export default App