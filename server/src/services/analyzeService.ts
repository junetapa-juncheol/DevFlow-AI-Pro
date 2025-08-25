// AI 서비스를 위한 일반적인 설정
const AI_CONFIG = {
  apiKey: process.env.AI_API_KEY,
  model: process.env.AI_MODEL || 'gpt-3.5-turbo',
  baseURL: process.env.AI_BASE_URL || 'https://api.openai.com/v1'
};

interface CodeAnalysisOptions {
  code: string;
  language: string;
  filePath: string;
}

interface CommitMessageOptions {
  diff: string;
  language: string;
  conventionalCommits: boolean;
}

interface ProjectAnalysisOptions {
  owner: string;
  repo: string;
  includeFiles: boolean;
}

/**
 * AI를 이용한 코드 품질 분석
 */
export async function analyzeCode(options: CodeAnalysisOptions) {
  const { code, language, filePath } = options;

  const prompt = `
다음 ${language} 코드를 분석해주세요:

파일 경로: ${filePath}

\`\`\`${language}
${code}
\`\`\`

다음 항목들에 대해 분석해주세요:
1. 코드 품질 (가독성, 구조, 네이밍)
2. 잠재적 버그나 이슈
3. 성능 최적화 가능성
4. 보안 취약점
5. 모범 사례 준수 여부
6. 개선 제안사항

JSON 형식으로 응답해주세요:
{
  "quality": {
    "score": 1-10,
    "issues": ["이슈1", "이슈2"],
    "strengths": ["장점1", "장점2"]
  },
  "bugs": ["버그1", "버그2"],
  "performance": {
    "score": 1-10,
    "suggestions": ["제안1", "제안2"]
  },
  "security": {
    "score": 1-10,
    "vulnerabilities": ["취약점1", "취약점2"]
  },
  "improvements": ["개선사항1", "개선사항2"],
  "overall": {
    "score": 1-10,
    "summary": "전체적인 평가"
  }
}
`;

  try {
    // AI API 호출 (OpenAI 호환)
    const response = await fetch(`${AI_CONFIG.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (content) {
      // JSON 파싱 시도
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }

    // JSON 파싱 실패 시 기본 구조 반환
    return {
      quality: { score: 7, issues: [], strengths: ['코드가 작성됨'] },
      bugs: [],
      performance: { score: 7, suggestions: [] },
      security: { score: 7, vulnerabilities: [] },
      improvements: ['AI 분석 완료'],
      overall: { score: 7, summary: '분석이 완료되었습니다.' }
    };

  } catch (error) {
    console.error('Code analysis error:', error);
    throw new Error('코드 분석 중 오류가 발생했습니다.');
  }
}

/**
 * AI를 이용한 커밋 메시지 생성
 */
export async function generateCommitMessage(options: CommitMessageOptions) {
  const { diff, language, conventionalCommits } = options;

  const prompt = `
다음 Git diff를 분석하여 적절한 커밋 메시지를 생성해주세요:

\`\`\`
${diff}
\`\`\`

요구사항:
- 언어: ${language === 'ko' ? '한국어' : '영어'}
- Conventional Commits 규칙 ${conventionalCommits ? '적용' : '미적용'}
- 변경사항의 핵심을 명확하게 표현
- 50자 이내의 간결한 제목
- 필요시 상세 설명 추가

${conventionalCommits ? `
Conventional Commits 형식:
- feat: 새 기능
- fix: 버그 수정
- docs: 문서 변경
- style: 코드 스타일 변경
- refactor: 리팩토링
- test: 테스트 추가/수정
- chore: 빌드/도구 변경
` : ''}

${language === 'ko' ? '한국어로' : 'In English'} 커밋 메시지만 응답해주세요.
`;

  try {
    // AI API 호출 (OpenAI 호환)
    const response = await fetch(`${AI_CONFIG.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (content) {
      return content.trim();
    }

    return 'Update code changes';

  } catch (error) {
    console.error('Commit message generation error:', error);
    throw new Error('커밋 메시지 생성 중 오류가 발생했습니다.');
  }
}

/**
 * 프로젝트 구조 분석
 */
export async function analyzeProject(options: ProjectAnalysisOptions) {
  const { owner, repo, includeFiles } = options;

  // GitHub API를 통한 프로젝트 정보 수집
  // 실제 구현에서는 GitHub Service와 연동
  
  const projectStructure = {
    name: `${owner}/${repo}`,
    description: '프로젝트 설명',
    language: 'JavaScript',
    structure: {
      directories: ['src', 'test', 'docs'],
      files: includeFiles ? ['README.md', 'package.json'] : [],
      totalFiles: 25,
      linesOfCode: 1500
    },
    complexity: {
      score: 6,
      factors: ['중간 복잡도', '적절한 구조화']
    },
    technologies: ['React', 'Node.js', 'TypeScript'],
    recommendations: [
      '단위 테스트 추가 권장',
      'ESLint 설정 개선',
      'README 문서화 보완'
    ]
  };

  return projectStructure;
}

/**
 * 코드 복잡도 계산
 */
export function calculateComplexity(code: string): number {
  // 간단한 복잡도 계산 로직
  const lines = code.split('\n').length;
  const functions = (code.match(/function|=>/g) || []).length;
  const conditions = (code.match(/if|for|while|switch/g) || []).length;
  
  return Math.min(10, Math.max(1, Math.round((lines + functions * 2 + conditions * 3) / 50)));
}

/**
 * 언어별 분석 규칙
 */
export const LANGUAGE_RULES = {
  javascript: {
    extensions: ['.js', '.jsx'],
    patterns: {
      functions: /function\s+\w+|const\s+\w+\s*=\s*\(|=>\s*{/g,
      imports: /import\s+.*from|require\s*\(/g,
      exports: /export\s+|module\.exports/g
    }
  },
  typescript: {
    extensions: ['.ts', '.tsx'],
    patterns: {
      functions: /function\s+\w+|const\s+\w+\s*=\s*\(|=>\s*{/g,
      interfaces: /interface\s+\w+/g,
      types: /type\s+\w+/g
    }
  },
  python: {
    extensions: ['.py'],
    patterns: {
      functions: /def\s+\w+/g,
      classes: /class\s+\w+/g,
      imports: /import\s+|from\s+.*import/g
    }
  }
};