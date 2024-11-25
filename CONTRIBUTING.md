# Contributing Guidelines

To maintain a smooth development process, please adhere to the following guidelines.

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

1. Feat: A new feature
   Example: Feat(auth): add user login functionality
2. Fix: A bug fix
   Example: Fix(api): handle null response error
3. Docs: Documentation updates
   Example: Docs(README): update installation guide
4. Style: Code style changes (formatting, missing semi-colons, etc.)
   Example: Style(lint): fix eslint warnings
5. Refactor: Code refactoring without functional changes
   Example: Refactor(auth): simplify token validation logic
6. Test: Adding or updating tests
   Example: Test(utils): add tests for date parser
7. Chore: Maintenance or dependency updates
   Example: Chore(deps): bump axios to 1.3.0

## Pull Request Guidelines

1. No Breaking Changes: Ensure your proposal does not radically change current functionality or introduce breaking changes without prior discussion.
2. Thorough Documentation: Document all changes thoroughly, including updates to code comments, README files, or other relevant documentation.
3. Test Coverage: Include tests for any new functionality or changes to existing functionality.
4. Descriptive Title: Use a descriptive title for your pull request that summarizes the change.
5. Pull Request Target: Only create pull requests against the parent branch, not feature branches or other temporary branches.

#### Pull Request Review Checklist

To increase the likelihood of your pull request being approved:

1. Ensure your branch is up-to-date with the main branch.
2. Squash commits where possible to provide a cleaner commit history.
3. Address all review comments promptly and mark resolved threads.
4. Use clear, actionable comments when discussing feedback.
