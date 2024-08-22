import { execSync } from 'child_process';
import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';
import {
  TARGET_DIR,
  BRANCH_NAME,
  HTML_URL,
  TOKEN,
  UP_STREAM_REPO_OWNER,
  UP_STREAM_REPO_NAME,
  REPO_OWNER
} from "./target.js";

// Git 및 PR 관련 상수
const COMMIT_MESSAGE = `- ${BRANCH_NAME}.md commit`;
const GIT_COMMAND_BASE = `git -C ${TARGET_DIR}`;
const GITHUB_AUTH_TOKEN = TOKEN;
const PR_TITLE = `${BRANCH_NAME} 가이드 변환`;
const PR_BODY = `[${BRANCH_NAME}](${HTML_URL}) 가이드 변환`;

// GitHub API 클라이언트 설정
const octokit = new Octokit({
  auth: GITHUB_AUTH_TOKEN,
  request: {
    fetch: fetch,  // fetch 설정 추가
  },
});

// Git 명령어 실행 함수
function runGitCommand(command) {
  try {
    execSync(command);
    console.log(`Executed: ${command}`);
  } catch (error) {
    console.error(`Error executing command "${command}":`, error.message);
  }
}

// 1. 변경사항을 추가하고 커밋
function commitChanges() {
  runGitCommand(`${GIT_COMMAND_BASE} add .`);
  runGitCommand(`${GIT_COMMAND_BASE} commit -m "${COMMIT_MESSAGE}"`);
}

// 2. 원격지로 브랜치 푸시
function pushChanges() {
  runGitCommand(`${GIT_COMMAND_BASE} push origin ${BRANCH_NAME}`);
}

// 3. Pull Request 생성 함수
async function createPullRequest() {
  try {
    const response = await octokit.pulls.create({
      owner: UP_STREAM_REPO_OWNER,  // 원본 리포지토리 소유자
      repo: UP_STREAM_REPO_NAME,    // 원본 리포지토리 이름
      title: PR_TITLE,
      head: `${REPO_OWNER}:${BRANCH_NAME}`,  // 포크된 리포지토리의 브랜치
      base: 'main',                // 원본 리포지토리의 기본 브랜치
      body: PR_BODY,
    });

    console.log(`Pull Request created: ${response.data.html_url}`);
  } catch (error) {
    console.error('Error creating Pull Request:', error.message);
  }
}

// 메인 실행 함수
function main() {
  console.log(`Starting process on branch '${BRANCH_NAME}' in directory '${TARGET_DIR}'`);

  commitChanges();
  pushChanges();
  createPullRequest();
}

main();