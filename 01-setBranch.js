import {
  BRANCH_NAME,
  TARGET_DIR,
  UP_BRANCH_OWNER
} from "./target.js";

import { execSync } from 'child_process';

try {
  // 1. Git branch 생성
  execSync(`git -C ${TARGET_DIR} checkout -b ${BRANCH_NAME} origin/${UP_BRANCH_OWNER}`);
  
  console.log(`Switched to new branch '${BRANCH_NAME}' in directory '${TARGET_DIR}'`);
} catch (error) {
  console.error(`Failed to execute git commands: ${error.message}`);
}