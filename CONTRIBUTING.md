# Contributing Guidelines

To maintain a smooth development process, please adhere to the following guidelines.

## Pull Request Guidelines

1. No Breaking Changes: Ensure your proposal does not radically change current functionality or introduce breaking changes without prior discussion.
2. Thorough Documentation: Document all changes thoroughly, including updates to code comments, README files, or other relevant documentation.
3. Test Coverage: Include tests for any new functionality or changes to existing functionality.
4. Descriptive Title: Use a descriptive title for your pull request that summarizes the change.
5. Pull Request Target: Only create pull requests against the parent branch, not feature branches or other temporary branches.

## Branch Naming Conventions

Follow these conventions to name your branches for better organization:

1. Feature Branches: feat/<short-description>
   Example: feat/add-chat-input-component
2. Bug Fixes: fix/<short-description>
   Example: fix/chat-loading-issue
3. Hotfixes: hotfix/<short-description>
   Example: hotfix/critical-bug
4. Chores/Refactors: chore/<short-description> or refactor/<short-description>
   Example: chore/update-dependencies

## Commit Message Guidelines

Use the following format for commit messages to maintain a consistent history:

```js
<type>(<scope>): <short description>

<Optional detailed description>
```

#### Commit Types

1. feat: A new feature
   Example: feat(auth): add user login functionality
2. fix: A bug fix
   Example: fix(api): handle null response error
3. docs: Documentation updates
   Example: docs(README): update installation guide
4. style: Code style changes (formatting, missing semi-colons, etc.)
   Example: style(lint): fix eslint warnings
5. refactor: Code refactoring without functional changes
   Example: refactor(auth): simplify token validation logic
6. test: Adding or updating tests
   Example: test(utils): add tests for date parser
7. chore: Maintenance or dependency updates
   Example: chore(deps): bump axios to 1.3.0

## Pull Request Review Checklist

To increase the likelihood of your pull request being approved:

1. Ensure your branch is up-to-date with the main branch.
2. Squash commits where possible to provide a cleaner commit history.
3. Address all review comments promptly and mark resolved threads.
4. Use clear, actionable comments when discussing feedback.
