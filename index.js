#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const inquirer = require('inquirer');

const { prdTemplateContent } = require('./template/create-prd');
const { generateTasksTemplateContent } = require('./template/generate-tasks');
const { processTaskListTemplateContent } = require('./template/process-tasks-list');

// Define the version and description
program
  .version('1.0.0')
  .description('A CLI tool to generate AI task files');

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Function to copy a file from source to the target directory
function copyFile(sourceFile, targetFile, defaultContent = null) {
  try {
    let content;
    // Try to read from the source file
    if (fs.existsSync(sourceFile)) {
      content = fs.readFileSync(sourceFile, 'utf8');
    } else if (defaultContent) {
      // Use default content if provided and source file doesn't exist
      content = defaultContent;
    } else {
      throw new Error(`Source file not found: ${sourceFile}`);
    }

    fs.writeFileSync(targetFile, content, 'utf8');
    console.log(`Generated: ${targetFile}`);
    return true;
  } catch (error) {
    console.error(`Error generating ${targetFile}:`, error.message);
    return false;
  }
}

// Command to generate a PRD file
program
  .command('create-prd')
  .description('Generate a Product Requirements Document (PRD) template')
  .option('-o, --output <directory>', 'Output directory', './docs')
  .action(async (options) => {
    try {
      const outputDir = options.output;

      // Ensure the output directory exists
      ensureDirectoryExists(outputDir);

      // Define source and target files
      const sourceFile = path.join(__dirname, 'docs', 'create-prd.md');
      const targetFile = path.join(outputDir, 'create-prd.md');

      // Copy the file with default content
      if (copyFile(sourceFile, targetFile, prdTemplateContent)) {
        console.log(`\nPRD template generated successfully at: ${targetFile}`);
        console.log('\nNext steps:');
        console.log('1. Follow the guidelines in the create-prd.md file to create your PRD');
        console.log('2. Use the generate-tasks command to create a task list based on your PRD');
      }
    } catch (error) {
      console.error('Error generating PRD template:', error.message);
    }
  });

// Command to generate a task list from a PRD
program
  .command('generate-tasks')
  .description('Generate a task list template based on a PRD')
  .option('-o, --output <directory>', 'Output directory', './docs')
  .option('-p, --prd <file>', 'Path to the PRD file')
  .action(async (options) => {
    try {
      // If PRD file is not provided, prompt for it
      if (!options.prd) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'prd',
            message: 'Enter the path to the PRD file:',
            validate: (input) => {
              if (input.trim() === '') return 'PRD file path is required';
              if (!fs.existsSync(input)) return 'PRD file does not exist';
              return true;
            }
          }
        ]);
        options.prd = answers.prd;
      }

      // Ensure the PRD file exists
      if (!fs.existsSync(options.prd)) {
        console.error(`PRD file not found: ${options.prd}`);
        return;
      }

      const outputDir = options.output;

      // Ensure the output directory exists
      ensureDirectoryExists(outputDir);

      // Extract the PRD filename to create the tasks filename
      const prdBasename = path.basename(options.prd);
      const tasksFilename = prdBasename.startsWith('prd-')
        ? `tasks-${prdBasename}`
        : `tasks-${prdBasename}`;

      // Define source and target files
      const sourceFile = path.join(__dirname, 'docs', 'generate-tasks.md');
      const targetFile = path.join(outputDir, tasksFilename);

      // Copy the file with default content
      if (copyFile(sourceFile, targetFile, generateTasksTemplateContent)) {
        console.log(`\nTask list template generated successfully at: ${targetFile}`);
        console.log('\nNext steps:');
        console.log('1. Review the task list and customize it based on your PRD');
        console.log('2. Use the process-task-list command to get guidance on implementing the tasks');
      }
    } catch (error) {
      console.error('Error generating task list template:', error.message);
    }
  });

// Command to generate a process-task-list file
program
  .command('process-task-list')
  .description('Generate a task list management guide')
  .option('-o, --output <directory>', 'Output directory', './docs')
  .action((options) => {
    try {
      const outputDir = options.output;

      // Ensure the output directory exists
      ensureDirectoryExists(outputDir);

      // Define source and target files
      const sourceFile = path.join(__dirname, 'docs', 'process-task-list.md');
      const targetFile = path.join(outputDir, 'task-list-management.md');

      // Copy the file with default content
      if (copyFile(sourceFile, targetFile, processTaskListTemplateContent)) {
        console.log(`\nTask list management guide generated successfully at: ${targetFile}`);
        console.log('\nNext steps:');
        console.log('1. Review the task list management guide');
        console.log('2. Follow the guidelines when implementing your tasks');
      }
    } catch (error) {
      console.error('Error generating task list management guide:', error.message);
    }
  });

// Command to create a generate-tasks.md file
program
  .command('create-tasks')
  .description('Generate a task list template guide')
  .option('-o, --output <directory>', 'Output directory', './docs')
  .action((options) => {
    try {
      const outputDir = options.output;

      // Ensure the output directory exists
      ensureDirectoryExists(outputDir);

      // Define source and target files
      const sourceFile = path.join(__dirname, 'docs', 'generate-tasks.md');
      const targetFile = path.join(outputDir, 'generate-tasks.md');

      // Copy the file with default content
      if (copyFile(sourceFile, targetFile, generateTasksTemplateContent)) {
        console.log(`\nTask list template guide generated successfully at: ${targetFile}`);
        console.log('\nNext steps:');
        console.log('1. Follow the guidelines in the generate-tasks.md file to create your task list');
      }
    } catch (error) {
      console.error('Error generating task list template guide:', error.message);
    }
  });

// Command to generate all template files
program
  .command('generate-all')
  .description('Generate all template files (create-prd.md, generate-tasks.md, and process-tasks-list.md)')
  .option('-o, --output <directory>', 'Output directory', './docs')
  .action((options) => {
    try {

      const outputDir = options.output;

      // Ensure the output directory exists
      ensureDirectoryExists(outputDir);

      // Generate create-prd.md file
      const prdSourceFile = path.join(__dirname, 'docs', 'create-prd.md');
      const prdTargetFile = path.join(outputDir, 'create-prd.md');
      const prdSuccess = copyFile(prdSourceFile, prdTargetFile, prdTemplateContent);

      // Generate generate-tasks.md file
      const tasksSourceFile = path.join(__dirname, 'docs', 'generate-tasks.md');
      const tasksTargetFile = path.join(outputDir, 'generate-tasks.md');
      const tasksSuccess = copyFile(tasksSourceFile, tasksTargetFile, generateTasksTemplateContent);

      // Generate task-list-management.md file
      const processSourceFile = path.join(__dirname, 'docs', 'process-task-list.md');
      const processTargetFile = path.join(outputDir, 'process-tasks-list.md');
      const processSuccess = copyFile(processSourceFile, processTargetFile, processTaskListTemplateContent);

      if (prdSuccess && tasksSuccess && processSuccess) {
        console.log('\nAll template files generated successfully!');
        console.log('\nGenerated files:');
        console.log(`- PRD Template: ${prdTargetFile}`);
        console.log(`- Task List Template: ${tasksTargetFile}`);
        console.log(`- Task Management Guide: ${processTargetFile}`);
        console.log('\nNext steps:');
        console.log('1. Follow the guidelines in the create-prd.md file to create your PRD');
        console.log('2. Use the generate-tasks.md file to create a task list based on your PRD');
        console.log('3. Follow the task-list-management.md guide when implementing your tasks');
      }
    } catch (error) {
      console.error('Error generating template files:', error.message);
    }
  });

// Parse command line arguments
program.parse(process.argv);

// If no arguments provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}