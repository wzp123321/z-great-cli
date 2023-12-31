import path from 'node:path';
import fs from 'fs-extra';
import downloadRepo from './downloadTemp.js';
import { program } from 'commander';
import chalk from 'chalk';
/**
 * 创建新项目
 * @param projectName - 项目名
 * @param options - 命令参数
 */
const create = async (projectName) => {
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName);
  // 判断目录是否存在
  const existFlag = fs.existsSync(targetDirectory);
  if (existFlag) {
    console.log(chalk.red('Error: target directory is not empty.\r\n'));
    process.exit(1);
  } else {
    await downloadRepo(projectName);
  }
};
export default () => {
  program
    .command('create <project-name>')
    .description(chalk.cyan('创建新项目'))
    .option('-f,--force', chalk.red('如果目录已存在，将覆盖原项目，请谨慎使用'))
    .action(create);
};
