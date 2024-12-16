···

# --filter 或者 -F <package_name> 可以在指定目录 package 执行任务

pnpm -F example add sass # 在根目录中向 example 目录安装 sass
pnpm add example --workspace #向项目里添加 当前项目中的example
···

Git 提交规范

- ci: ci 配置文件和脚本的变动;
- chore: 构建系统或辅助工具的变动;
- fix: 代码 BUG 修复;
- feat: 新功能;
- perf: 性能优化和提升;
- refactor: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
- style: 代码格式调整，可能是空格、分号、缩进等等;
- docs: 文档变动;
- test: 补充缺失的测试用例或者修正现有的测试用例;
- revert: 回滚操作;
