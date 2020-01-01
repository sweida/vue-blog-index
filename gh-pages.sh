cd gh-pages

echo 拉取最新代码
git pull

echo 删除拉取的代码
rm -rf gh-pages/*

cd ..

echo 编译文件
npm run build

echo 复制编译后代码到gh-pages文件
cp -r ./dist/* ./gh-pages

cd gh-pages

echo 提交代码
cd gh-pages
git add .
git commit -m "自动提交代码"
git push

echo 提交完毕