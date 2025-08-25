import express from 'express';
import { 
  getUserRepos, 
  getRepoCommits, 
  createWebhook, 
  handleWebhook 
} from '../services/githubService';

const router = express.Router();

/**
 * GET /api/github/repos
 * 사용자 레포지토리 목록 조회
 */
router.get('/repos', async (req, res) => {
  try {
    const { username, sort = 'updated', per_page = 30 } = req.query;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username is required'
      });
    }

    const repos = await getUserRepos({
      username: username as string,
      sort: sort as string,
      per_page: parseInt(per_page as string)
    });

    res.json({
      success: true,
      data: repos,
      count: repos.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('GitHub repos fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch repositories',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * GET /api/github/commits/:owner/:repo
 * 레포지토리 커밋 히스토리 조회
 */
router.get('/commits/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { per_page = 10, page = 1 } = req.query;

    const commits = await getRepoCommits({
      owner,
      repo,
      per_page: parseInt(per_page as string),
      page: parseInt(page as string)
    });

    res.json({
      success: true,
      data: commits,
      pagination: {
        page: parseInt(page as string),
        per_page: parseInt(per_page as string),
        count: commits.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('GitHub commits fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch commits',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * POST /api/github/webhook/setup
 * GitHub 웹훅 설정
 */
router.post('/webhook/setup', async (req, res) => {
  try {
    const { owner, repo, events = ['push', 'pull_request'] } = req.body;

    if (!owner || !repo) {
      return res.status(400).json({
        success: false,
        message: 'Owner and repository name are required'
      });
    }

    const webhook = await createWebhook({
      owner,
      repo,
      events,
      url: `${process.env.SERVER_URL}/api/github/webhook`
    });

    res.json({
      success: true,
      data: webhook,
      message: 'Webhook successfully created',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('GitHub webhook setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to setup webhook',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * POST /api/github/webhook
 * GitHub 웹훅 이벤트 처리
 */
router.post('/webhook', async (req, res) => {
  try {
    const event = req.headers['x-github-event'];
    const signature = req.headers['x-hub-signature-256'];
    const payload = req.body;

    // 웹훅 시그니처 검증 (실제 구현에서는 보안을 위해 필수)
    // const isValid = verifyWebhookSignature(payload, signature);
    // if (!isValid) {
    //   return res.status(401).json({ success: false, message: 'Invalid signature' });
    // }

    const result = await handleWebhook({
      event: event as string,
      payload
    });

    res.json({
      success: true,
      message: 'Webhook processed successfully',
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('GitHub webhook processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process webhook',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * GET /api/github/user/:username
 * GitHub 사용자 정보 조회
 */
router.get('/user/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // GitHub API를 통한 사용자 정보 조회 로직
    // 실제 구현에서는 githubService에 추가
    const userInfo = {
      username,
      // 기타 사용자 정보
    };

    res.json({
      success: true,
      data: userInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('GitHub user fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user information',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

export default router;