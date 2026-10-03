# Professional Git Commit Workflow

This document describes a professional, team-friendly Git commit workflow including branching strategy, commit message conventions, PR guidelines, signing, hooks, and useful commands.

## Goals
- Make history readable and navigable
- Keep changes small and reviewable
- Encode intent (feature, fix, chore, refactor, docs, etc.)
- Support automated releases / changelogs via Conventional Commits

## Branching Strategy (recommended)
- `main` (or `master`): always deployable, protected
- `develop` (optional): integration branch for next release
- Feature branches: `feature/<short-desc>`
- Bugfix branches: `fix/<short-desc>`
- Hotfix branches: `hotfix/<short-desc>`
- Release branches: `release/<version>`

Workflow: create a short-lived feature branch from `develop` or `main`, open a PR, squash or rebase as needed, merge via PR with checks passing.

## Commit Message Format (Conventional Commits)
Use Conventional Commits for machine- and human-readable history.

Format:

```
<type>(<scope>): <short summary>

<optional longer description>

BREAKING CHANGE: <description>
```

Types (choose one): `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `revert`

Examples:

```
feat(editor): add tab completion for snippets

Fixes #123 — adds support for user-defined snippets and expands tests.

BREAKING CHANGE: snippet config format changed — see migration guide.
```

```
fix(parser): handle edge-case for empty input

The parser now returns null for empty buffers instead of throwing.
```

## Commit Granularity
- One logical change per commit. Prefer multiple small commits over one large commit.
- If multiple commits are part of the same logical change, squash them before merging.

## Rebase vs Merge
- Rebase local work to keep history linear when appropriate: `git rebase origin/main`
- Use Merge commits for long-lived branches or to preserve context if policy requires.
- For PR merges, prefer `Squash and merge` or rebase-merge to keep `main` tidy.

## Amending and Fixing History
- Amend last commit: `git commit --amend --no-edit` or edit message
- Reorder / squash commits: `git rebase -i origin/main`
- Never rewrite published history used by others unless coordinated.

## Signing Commits
- GPG commit signing recommended for verification: `git commit -S -m "..."`
- Configure `user.signingkey` and `commit.gpgSign true` to sign all commits.

## Pull Request (PR) Checklist
- Title follows Conventional Commit summary if possible.
- Link issue(s) fixed or relevant discussion.
- Include short description and testing steps.
- Ensure CI passes (build, tests, lint).
- Add reviewers and appropriate labels.

## Hooks & Tooling (recommended)
- Add a commit message template (`.gitmessage`) and point to it with:

```
git config commit.template .gitmessage
```

- Automate checks with `husky` + `commitlint` or `git-hooks`:
  - Validate commit message format
  - Run quick lint/tests before committing
- Use `commitizen` for interactive commit creation: `npx commitizen init cz-conventional-changelog --save-dev --save-exact`

## Commit Message Template
Keep a template at the repo root named `.gitmessage` (example included). It helps the editor show the message structure.

## Commands Cheat-sheet
- Create branch: `git switch -c feature/short-desc`
- Stage changes: `git add -p` (interactive hunks) or `git add <files>`
- Commit: `git commit -m "feat(scope): short summary"`
- Amend: `git commit --amend`
- Rebase interactively: `git rebase -i origin/main`
- Push branch: `git push -u origin feature/short-desc`
- Pull latest and rebase: `git fetch && git rebase origin/main`
- Revert a commit: `git revert <sha>`

## Example Workflows
- Small fix: Create branch, fix, commit `fix(parser): ...`, push, open PR, merge squash.
- Feature: Create branch, multiple commits with `feat(...)`, rebase onto `main` before PR, open PR with testing notes.

## Automating Releases & Changelogs
- When using Conventional Commits, consider `semantic-release` or `standard-version` to generate changelogs and bump versions automatically.

## Migration / Breaking Changes
- Use `BREAKING CHANGE:` in the footer of the commit message.
- Document migration steps in the PR description and link to docs.

## FAQ — Short
- Q: Should commit messages be imperative? A: Yes — short summary should be imperative (e.g., "Add support" not "Added support").
- Q: When to squash? A: Squash on merge for small, iterative commits; keep separate commits if each is a meaningful milestone.

---
For enforcement or interactive ergonomics (commitizen, commitlint, husky), say the word and I will scaffold configuration and example scripts.
