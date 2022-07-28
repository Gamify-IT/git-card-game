import {
  getGitAddAllCard,
  getGitAddCard,
  getGitCommitCard,
  getGitPush,
  getNanoCard,
  getRmCard,
  getTouchCard,
} from '@/components/cards';
import { GitContext } from '@/components/git';

describe('git context test', () => {
  test('test new, update, remove file', () => {
    const git = new GitContext();
    expect(getTouchCard('foo').score(git)).toBeGreaterThan(-1);
    expect(Object.keys(git.files)).toContain('foo');
    expect(getNanoCard('bar').score(git)).toBeGreaterThan(-1);
    expect(Object.keys(git.files)).toContain('bar');
    expect(getRmCard('bar').score(git)).toBeGreaterThan(-1);
    expect(Object.keys(git.files)).not.toContain('bar');
    expect(getRmCard('bar').score(git)).toEqual(-1);
  });
  test('test add file', () => {
    const git = new GitContext();
    expect(getGitAddCard('foo').score(git)).toEqual(-1);
    expect(getTouchCard('foo').score(git)).toBeGreaterThan(-1);
    expect(Object.keys(git.files)).toContain('foo');
    expect(getGitAddCard('bar').score(git)).toEqual(-1);
    expect(getGitAddCard('foo').score(git)).not.toEqual(-1);
    expect(git.stagedFiles).toContain('foo');
  });
  test('test add all', () => {
    const git = new GitContext();
    expect(getTouchCard('foo').score(git)).not.toEqual(-1);
    expect(getTouchCard('bar').score(git)).not.toEqual(-1);
    expect(getGitAddCard('foo').score(git)).not.toEqual(-1);
    expect(getGitAddCard('bar').score(git)).not.toEqual(-1);
    expect(getGitAddAllCard().score(git)).not.toEqual(-1);
    expect(git.stagedFiles).toContain('foo');
    expect(git.stagedFiles).toContain('bar');
  });
  test('test commit and push', () => {
    const git = new GitContext();
    expect(getGitPush().score(git)).not.toEqual(-1);
    expect(getGitCommitCard().score(git)).toEqual(-1);
    expect(getTouchCard('foo').score(git)).not.toEqual(-1);
    expect(getGitAddCard('foo').score(git)).not.toEqual(-1);
    expect(getGitAddAllCard().score(git)).not.toEqual(-1);
    expect(getGitCommitCard().score(git)).not.toEqual(-1);
    expect(git.stagedFiles.length).toEqual(0);
    expect(git.localCommits).toEqual(1);
    expect(getGitPush().score(git)).not.toEqual(-1);
    expect(git.localCommits).toEqual(0);
  });
});
