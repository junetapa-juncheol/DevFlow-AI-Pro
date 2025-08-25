import express from 'express';
import { 
  performAIReview, 
  generateSuggestions, 
  generateDocumentation,
  optimizeCode 
} from '../services/aiService';

const router = express.Router();

/**
 * POST /api/ai/review
 * AI 코드 리뷰 수행
 */
router.post('/review', async (req, res) => {
  try {
    const { 
      code, 
      language, 
      context = 'general',
      focusAreas = ['quality', 'security', 'performance'] 
    } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code content is required'
      });
    }

    const review = await performAIReview({
      code,
      language: language || 'javascript',
      context,
      focusAreas
    });

    res.json({
      success: true,
      data: review,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI code review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform AI code review',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * POST /api/ai/suggest
 * 코드 개선 제안 생성
 */
router.post('/suggest', async (req, res) => {
  try {
    const { 
      code, 
      language, 
      improvementType = 'general',
      includeExamples = true 
    } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code content is required'
      });
    }

    const suggestions = await generateSuggestions({
      code,
      language: language || 'javascript',
      improvementType,
      includeExamples
    });

    res.json({
      success: true,
      data: suggestions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate suggestions',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * POST /api/ai/document
 * 자동 문서 생성
 */
router.post('/document', async (req, res) => {
  try {
    const { 
      code, 
      language, 
      documentType = 'api',
      includeExamples = true,
      language: docLanguage = 'ko'
    } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code content is required'
      });
    }

    const documentation = await generateDocumentation({
      code,
      language: language || 'javascript',
      documentType,
      includeExamples,
      docLanguage
    });

    res.json({
      success: true,
      data: documentation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI documentation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate documentation',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * POST /api/ai/optimize
 * 코드 최적화 제안
 */
router.post('/optimize', async (req, res) => {
  try {
    const { 
      code, 
      language, 
      optimizationGoals = ['performance', 'readability'],
      applyChanges = false 
    } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code content is required'
      });
    }

    const optimization = await optimizeCode({
      code,
      language: language || 'javascript',
      optimizationGoals,
      applyChanges
    });

    res.json({
      success: true,
      data: optimization,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI optimization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to optimize code',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * POST /api/ai/explain
 * 코드 설명 생성
 */
router.post('/explain', async (req, res) => {
  try {
    const { 
      code, 
      language, 
      explanationLevel = 'intermediate',
      includeFlowchart = false,
      outputLanguage = 'ko'
    } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code content is required'
      });
    }

    // AI 서비스에서 코드 설명 생성 로직 (구현 예정)
    const explanation = {
      summary: 'AI generated code explanation',
      detailedExplanation: 'Detailed breakdown of the code',
      complexity: 'Medium',
      suggestions: [],
      flowchart: includeFlowchart ? 'Generated flowchart data' : null
    };

    res.json({
      success: true,
      data: explanation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI explanation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to explain code',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * POST /api/ai/refactor
 * 코드 리팩토링 제안
 */
router.post('/refactor', async (req, res) => {
  try {
    const { 
      code, 
      language, 
      refactoringType = 'general',
      preserveFunctionality = true 
    } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code content is required'
      });
    }

    // AI 서비스에서 리팩토링 제안 로직 (구현 예정)
    const refactoredCode = {
      originalCode: code,
      refactoredCode: '// Refactored version of the code',
      changes: [],
      improvements: [],
      reasoning: 'Why these changes were made'
    };

    res.json({
      success: true,
      data: refactoredCode,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI refactoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to refactor code',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

export default router;