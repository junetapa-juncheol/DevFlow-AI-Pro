import express from 'express';
import { analyzeCode, generateCommitMessage, analyzeProject } from '../services/analyzeService';

const router = express.Router();

/**
 * POST /api/analyze/code
 * 코드 품질 분석
 */
router.post('/code', async (req, res) => {
  try {
    const { code, language, filePath } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code content is required'
      });
    }

    const analysis = await analyzeCode({
      code,
      language: language || 'javascript',
      filePath: filePath || 'unknown'
    });

    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Code analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze code',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * POST /api/analyze/commit
 * AI 커밋 메시지 생성
 */
router.post('/commit', async (req, res) => {
  try {
    const { diff, language = 'ko', conventionalCommits = true } = req.body;

    if (!diff) {
      return res.status(400).json({
        success: false,
        message: 'Git diff is required'
      });
    }

    const commitMessage = await generateCommitMessage({
      diff,
      language,
      conventionalCommits
    });

    res.json({
      success: true,
      data: {
        message: commitMessage,
        language,
        conventionalCommits
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Commit message generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate commit message',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * GET /api/analyze/project/:repo
 * 프로젝트 구조 분석
 */
router.get('/project/:owner/:repo', async (req, res) => {
  try {{
    const { owner, repo } = req.params;
    const { includeFiles = false } = req.query;

    const analysis = await analyzeProject({
      owner,
      repo,
      includeFiles: includeFiles === 'true'
    });

    res.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Project analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze project',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * POST /api/analyze/batch
 * 배치 파일 분석
 */
router.post('/batch', async (req, res) => {
  try {
    const { files } = req.body;

    if (!files || !Array.isArray(files)) {
      return res.status(400).json({
        success: false,
        message: 'Files array is required'
      });
    }

    const results = [];
    for (const file of files) {
      try {
        const analysis = await analyzeCode({
          code: file.content,
          language: file.language || 'javascript',
          filePath: file.path || 'unknown'
        });
        
        results.push({
          file: file.path,
          analysis,
          success: true
        });
      } catch (fileError) {
        results.push({
          file: file.path,
          error: fileError.message,
          success: false
        });
      }
    }

    res.json({
      success: true,
      data: results,
      summary: {
        total: files.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Batch analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform batch analysis',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

export default router;