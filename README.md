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

The CLI provides a command to generate all the template files.

### Generate All Files

```bash
ai-tasks generate-all
```

Options:
- `-o, --output <directory>`: Output directory (default: `./docs`)

This command generates all the template files in the specified output directory.

## Generated Files

The generator creates the following files in the output directory (default: `./docs`):

- **`create-prd.md`**: A template to help you write a Product Requirements Document.
- **`generate-tasks.md`**: A guide for creating a task list from a PRD.
- **`process-tasks-list.md`**: Guidelines for managing the task list.


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