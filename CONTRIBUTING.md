# Contributing to Swahiba

First off, thank you for considering contributing to Swahiba! It's people like you that make the open-source community such a great place to learn, inspire, and create. We welcome contributions of all kinds, from bug reports and feature suggestions to code and documentation improvements.

This document outlines the process for contributing to this project. Following these guidelines helps us communicate effectively and ensures a smooth experience for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Messages & PR Guidelines](#commit-messages--pr-guidelines)
- [Style Guides](#style-guides)
- [Community](#community)
- [Questions?](#questions)

## Code of Conduct

This project and everyone participating in it is governed by the [Swahiba Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainer via [GitHub Issues](https://github.com/zuck30/SWAHIBA/issues) or directly to [@zuck30](https://github.com/zuck30).

## How Can I Contribute?

### Reporting Bugs

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/zuck30/SWAHIBA/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/zuck30/SWAHIBA/issues/new).
- **Use a clear and descriptive title** for the issue to identify the problem.
- **Provide a minimal, reproducible example** (a piece of code, a gist, or a link to a repository) that demonstrates the problem.
- **Describe the exact steps** to reproduce the problem in as much detail as possible. Mention your browser and operating system if relevant.

### Suggesting Enhancements

- [Open a new issue](https://github.com/zuck30/SWAHIBA/issues/new) and use the "Feature Request" template if available.
- **Provide a clear and descriptive title**.
- **Explain why this enhancement would be useful** to most users or how it solves a common problem, especially in the context of Kiswahili/English code-switching.
- **Describe the current behavior** and what you would like to see instead.

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through the `good first issue` and `help wanted` issues:

- [Good First Issues](https://github.com/zuck30/SWAHIBA/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) - issues that should be relatively straightforward to fix.
- [Help Wanted Issues](https://github.com/zuck30/SWAHIBA/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) - issues that are more involved but still need help.

### Pull Requests

- **Fill in the required template** provided when you open a new pull request.
- **Do not include issue numbers in the PR title**, but link to the issue in the PR description.
- **Follow the style guide** specific to the language or framework used in this project (see [Style Guides](#style-guides)).
- **Include screenshots and animated GIFs** in your pull request whenever possible to show the changes, especially for UI/UX updates.
- **Document new code** based on the project's documentation standards.
- **End all files with a newline**.

**Important**: As noted in the project README, please **do NOT commit large data files or model weights** to this repository.

## Getting Started

### 1. Fork the Repository

Fork the project on GitHub, then clone your fork locally:

```bash
git clone https://github.com/[your-username]/SWAHIBA.git
cd SWAHIBA
```

### 2. Set Up Upstream Remote

Add the original repository as a remote upstream to keep your fork up to date:

```bash
git remote add upstream https://github.com/zuck30/SWAHIBA.git
```

### 3. Install Dependencies

Install all required npm packages as per the README:

```bash
npm install
npm install @heroicons/react
```

### 4. Set Up Environment Variables

Create a `.env.local` file in the project root and set up the backend API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 5. Create a Branch

Create a new branch for your work. Please use a descriptive branch name:

```bash
git checkout -b fix/issue-number-short-description
# or
git checkout -b feature/issue-number-short-description
```

## Development Workflow

1.  **Make your changes** in your local branch.
2.  **Run the development server** to see your changes in real-time: `npm run dev`
3.  **Write or adapt tests** as needed.
4.  **Run the test suite** to ensure your changes don't break existing functionality.
5.  **Lint your code** according to the project's style guidelines.
6.  **Commit your changes** following the commit message guidelines below.
7.  **Push your branch** to your fork on GitHub.
8.  **Create a Pull Request** from your branch to the `main` branch of the original repository.

## Commit Messages & PR Guidelines

- **Write clear and descriptive commit messages**. Use the present tense ("Add feature" not "Added feature") and the imperative mood ("Move cursor to..." not "Moves cursor to...").
- **Reference any relevant issues** in your commit message (e.g., `Closes #123` or `Refs #123`).
- **Keep pull requests focused**. Each PR should be a single, logical change.
- **Keep your branch up to date**. If the `main` branch of the upstream repository has changed, rebase your branch:
    ```bash
    git fetch upstream
    git rebase upstream/main
    ```

## Style Guides

### General Style
- **Code:** This is a Next.js/React project using TypeScript. Please follow the standard [React/TypeScript style guide](https://github.com/typescript-cheatsheets/react) and ensure proper typing.
- **Documentation:** Follow the [Documentation Style Guide] (e.g., use Markdown, clear and concise language, use docstrings where required).

### Git Commit Messages
*   Use the present tense ("Add feature" not "Added feature").
*   Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
*   Limit the first line to 72 characters or less.
*   Reference issues and pull requests liberally after the first line.

## Community

- **GitHub Issues**: The primary place for discussion, bug reports, and feature requests is the [Issues section](https://github.com/zuck30/SWAHIBA/issues).
- **Model Development**: For discussions related to the underlying LLM model, please refer to the [swahili-llm-scratch](https://github.com/zuck30/swahili-llm-scratch) repository.

## Questions?

If you have any questions, please don't hesitate to ask. You can create an issue with the `question` label on GitHub, or contact the maintainer, Shadrackovsky ( [@zuck30](https://github.com/zuck30) ).


**Thank you for your contribution!** We appreciate your time and effort in helping make Swahiba a great tool for the East African community. 🎉