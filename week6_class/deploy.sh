#!/usr/bin/env sh

# 當發生錯誤時終止
set -e

# 建構 (build這裡做的就是幫我們把Vue轉成HTML/JS/CSS，並放入dist)
npm run build

# save the lastest commit hash as a string
LOGSTRING=$(git log)
COMMIT=$(echo $LOGSTRING | awk '{print $2}')

# cd 到建構輸出的目錄下
cd dist

# 如果要部署到自定義域名
# echo 'www.example.com' > CNAME

git init
git add -A //加入整個dist
git commit -m "deploy (commit: $COMMIT)"

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:bonnieli1414/Lian.git master:gh-pages

cd ..