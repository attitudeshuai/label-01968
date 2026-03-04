# 昆山飘得华电子材料有限公司产品客户管理系统

## 项目概述

产品客户管理系统，面向供应商场景，具备监控、数据管理、操作日志三大模块，数据持久化于 localStorage，支持 Excel 导入导出及操作恢复。

## 技术栈

- HTML5 + CSS3 + JavaScript（分离式架构）
- SheetJS (xlsx) CDN - Excel 导入导出
- localStorage - 数据持久化
- Nginx + Docker - 容器化部署
- Noto Sans SC + Inter - 字体

## 项目结构

```
label-01968/
├── index.html                # HTML 主页面
├── css/
│   └── style.css             # 样式文件
├── js/
│   └── app.js                # 应用逻辑
├── Dockerfile                # Docker 镜像配置
├── docker-compose.yml        # Docker Compose 编排
├── nginx.conf                # Nginx 配置
├── .dockerignore             # Docker 构建忽略
├── docs/
│   └── project_design.md     # 设计文档
├── README.md
└── .gitignore
```

## 启动方式

### 方式一：Docker 启动（推荐）

```bash
# 构建并启动容器
docker compose up -d --build

# 访问系统
# 浏览器打开 http://localhost:8081

# 停止容器
docker compose down
```

### 方式二：直接打开

用浏览器直接打开 `index.html` 即可使用，无需安装依赖或启动服务。

## 测试账号

| 角色 | 用户名 | 密码 | 说明 |
|------|--------|------|------|
| 管理员 | admin | admin123 | 拥有所有权限 |
| 普通用户 | user | user123 | 基本功能权限 |

## 功能清单

| 模块 | 功能 | 说明 |
|------|------|------|
| 监控界面 | 数据总览 | 客户数、产品数、数据行数统计 |
| 监控界面 | 客户列表 | 点击客户弹窗显示其使用的产品及详情 |
| 监控界面 | 产品列表 | 点击产品弹窗显示使用该产品的客户及详情 |
| 数据管理 | 表格编辑 | 单元格可编辑 |
| 数据管理 | 添加/删除行 | 整行操作 |
| 数据管理 | 添加/删除列 | 整列操作 |
| 数据管理 | 父子列 | 父列下可添加任意子列 |
| 数据管理 | 修改列名 | 表头输入框可修改 |
| 数据管理 | 导出 Excel | 导出当前数据 |
| 数据管理 | 导入 Excel | 列一一对应，重复数据以 Excel 为准更新 |
| 操作日志 | 操作历史 | 展示所有操作记录 |
| 操作日志 | 恢复 | 点击「恢复到此操作前」同步还原监控与数据管理界面 |
