# AI Tasks Generator

A CLI tool to generate AI task files for product development workflows.

## Installation

### Local Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-tasks-generator

# Install dependencies
npm install

# Link the package locally to use the CLI commands
npm link
```

### Global Installation (after publishing)

```bash
npm install -g ai-tasks-generator
```

## Usage

The CLI provides several commands to generate different types of files:

### Generate a Product Requirements Document (PRD) Template

```bash
ai-tasks create-prd
```

Options:
- `-o, --output <directory>`: Output directory (default: `./rules`)

This command generates a `create-prd.md` file in the specified output directory. The file contains guidelines for creating a Product Requirements Document.

### Generate a Task List Template Guide

```bash
ai-tasks create-tasks
```

Options:
- `-o, --output <directory>`: Output directory (default: `./rules`)

This command generates a `generate-tasks.md` file in the specified output directory. The file contains guidelines for creating a task list from a PRD.

### Generate a Task List based on a PRD

```bash
ai-tasks generate-tasks --prd "path/to/prd-file.md"
```

Options:
- `-p, --prd <file>`: Path to the PRD file
- `-o, --output <directory>`: Output directory (default: `./rules`)

### Generate a Task List Management Guide

```bash
ai-tasks process-task-list
```

Options:
- `-o, --output <directory>`: Output directory (default: `./rules`)

### Generate All Files

```bash
ai-tasks generate-all --name "Feature Name"
```

Options:
- `-n, --name <name>`: Feature name for the PRD file
- `-o, --output <directory>`: Output directory (default: `./rules`)

## File Structure

The generator creates the following files:

- **PRD**: `rules/prd-[feature-name].md` - A Product Requirements Document template
- **Task List**: `rules/tasks-prd-[feature-name].md` - A task list template based on the PRD
- **Task Management Guide**: `rules/task-list-management.md` - Guidelines for managing task lists

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

```bash
# Install dependencies
npm install

# Link the package locally
npm link
```

## License

ISC