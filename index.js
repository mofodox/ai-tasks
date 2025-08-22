#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

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
