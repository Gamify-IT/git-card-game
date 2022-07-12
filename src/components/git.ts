import { Card } from './cards';

export class GitContext {
  head: Record<string, string> = {};
  files: Record<string, string> = {};
  stagedFiles: string[] = [];
  commandHistory: Card[] = [];
  localCommits: number = 0;
}
