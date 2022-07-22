import { GitContext } from './git';
import * as gitIcons from '@primer/octicons';

export interface Card {
  id: number;
  color: string;
  command: string;
  description: string;
  icon?: string;
  /**
   * How much points a card gives.
   *
   * -1 points means that the card is invalid.
   */
  score(gitContext: GitContext): number;
}

export function getTouchCard(fileName: string): Card {
  return {
    id: id(),
    color: '#1D4ED8',
    command: `touch ${fileName}`,
    description: `Adds a file. +1`,
    icon: gitIcons['file-added'].heights[16].path,
    score(gitContext) {
      gitContext.files[fileName] = '';
      return 1;
    },
  };
}

export function getRmCard(fileName: string): Card {
  return {
    id: id(),
    color: '#1D4ED8',
    command: `rm ${fileName}`,
    description: `Removes a file. +1`,
    icon: gitIcons['file-removed'].heights[16].path,
    score(gitContext) {
      if (!(fileName in gitContext.files)) {
        return -1;
      }
      delete gitContext.files[fileName];
      return 1;
    },
  };
}

export function getNanoCard(fileName: string): Card {
  return {
    id: id(),
    color: '#1D4ED8',
    command: `nano ${fileName}`,
    description: `Edits or adds a file. +1`,
    icon: gitIcons.pencil.heights[16].path,
    score(gitContext) {
      gitContext.files[fileName] = 'changed';
      return 1;
    },
  };
}

export function getGitAddCard(fileName: string): Card {
  return {
    id: id(),
    color: '#4ADE80',
    command: `git add ${fileName}`,
    description: `Stages a file. +4`,
    icon: gitIcons['plus-circle'].heights[16].path,
    score(gitContext) {
      if (canAddFile(gitContext, fileName)) {
        return 4;
      } else {
        return -1;
      }
    },
  };
}

export function gitGitResetCard(fileName: string): Card {
  return {
    id: id(),
    color: '#16A34A',
    command: `git reset ${fileName}`,
    description: `Unstages a file. +4`,
    icon: gitIcons['reply'].heights[16].path,
    score(gitContext) {
      if (gitContext.stagedFiles.includes(fileName)) {
        gitContext.stagedFiles = gitContext.stagedFiles.filter((file) => file !== fileName);
        return 4;
      } else {
        return -1;
      }
    },
  };
}

function canAddFile(gitContext: GitContext, fileName: string): boolean {
  if (!(fileName in gitContext.head) && !(fileName in gitContext.files)) {
    return false;
  }
  if (fileName in gitContext.head && !(fileName in gitContext.files)) {
    gitContext.stagedFiles = gitContext.stagedFiles.filter((file) => file !== fileName);
    return true;
  }
  if (!(fileName in gitContext.head) && fileName in gitContext.files) {
    if (!gitContext.stagedFiles.includes(fileName)) gitContext.stagedFiles.push(fileName);
    return true;
  }
  if (gitContext.head[fileName] !== gitContext.files[fileName]) {
    if (!gitContext.stagedFiles.includes(fileName)) gitContext.stagedFiles.push(fileName);
    return true;
  }
  return false;
}

export function getGitAddAllCard(): Card {
  return {
    id: id(),
    color: '#FB923C',
    command: `git add .`,
    description: `Stages all files. +2 for each untracked file`,
    icon: gitIcons['diff-added'].heights[16].path,
    score(gitContext) {
      if (JSON.stringify(gitContext.head) === JSON.stringify(gitContext.files)) {
        return -1;
      }
      let score = 0;
      for (const file of Object.keys(gitContext.files)) {
        if (canAddFile(gitContext, file)) {
          score += 2;
        }
      }
      gitContext.stagedFiles = Object.keys(gitContext.files);
      return score;
    },
  };
}

export function getGitStatusCard(): Card {
  return {
    id: id(),
    color: '#38BDF8',
    description: 'Displays the git status. +1 for each staged file',
    command: `git status`,
    icon: gitIcons['question'].heights[16].path,
    score(gitContext) {
      return gitContext.stagedFiles.length;
    },
  };
}

export function getGitLogCard(): Card {
  return {
    id: id(),
    color: '#38BDF8',
    command: `git log`,
    description: 'Displays all commits. +1 for each commit',
    icon: gitIcons['history'].heights[16].path,
    score(gitContext) {
      return gitContext.localCommits;
    },
  };
}

export function getGitCommitCard(): Card {
  return {
    id: id(),
    color: '#A855F7',
    command: `git commit -m "..."`,
    description: 'Commits all stages files and fails if no files are staged. +4 for each staged file.',
    icon: gitIcons['git-commit'].heights[16].path,
    score(gitContext) {
      if (gitContext.stagedFiles.length === 0) {
        return -1;
      }
      const score = gitContext.stagedFiles.length * 4;
      gitContext.stagedFiles = [];
      gitContext.localCommits++;
      return score;
    },
  };
}

export function getGitPush(): Card {
  return {
    id: id(),
    color: '#A855F7',
    command: `git push`,
    description: 'Pushes all commits. +8 for each commit',
    icon: gitIcons['upload'].heights[16].path,
    score(gitContext) {
      const score = gitContext.localCommits * 8;
      gitContext.localCommits = 0;
      return score;
    },
  };
}

function id(): number {
  return Math.random();
}

const fileNames = ['index.html', 'app.js', 'style.css', 'README.md'];

const cardFactories = [getGitAddAllCard, getGitCommitCard, getGitPush];
const cardFactoriesWithFileName = [getTouchCard, getRmCard, getNanoCard, getGitAddCard, gitGitResetCard];

export function getRandomCard(): Card {
  if (Math.random() > 0.5) {
    const fileName = fileNames[Math.floor(Math.random() * fileNames.length)];
    return cardFactoriesWithFileName[Math.floor(Math.random() * cardFactoriesWithFileName.length)](fileName);
  } else {
    return cardFactories[Math.floor(Math.random() * cardFactories.length)]();
  }
}
