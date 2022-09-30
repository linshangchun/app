# okay app

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

Build site app,

```bash
$ yarn build
```

## Getting Deploy

Creat CI-dir,

```bash
$ mkdir -p .github/workflows
```

Creat CI-file,

```bash
$ touch ci.yml
```

Edit CI-file,

```yml
# 配置来源 dumi官网
name: deploy app

on:
  push:
    branches:
      - master # default branch

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
      - run: yarn install
      - run: yarn build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.CI_TOKEN }}
          publish_dir: ./dist
# <secrets.CI_TOKEN>：在 https://github.com/git项目路径/settings/secrets/actions 【New repository secret】=> CI_TOKEN: CI_TOKEN_VALUE
# <CI_TOKEN_VALUE>：https://github.com/settings/tokens 【Generate new token】
# <publish_dir>： yarn build 的静态文件目录，改目录内容会合并至gh-pages分支，用于页面部署
# 页面部署设置：https://github.com/git项目路径/settings/pages
# 访问页面：package.json中添加配置 "homepage": "https://xxxx.github.io/仓库名"
# 更多细节：Google About Github-Actions Deploy GitHub-Pages
```
