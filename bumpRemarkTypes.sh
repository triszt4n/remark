#!/bin/bash

version=$1

cd client
yarn add @triszt4n/remark-types@$version --exact
cd ..
cd functions
cd remark-functions-channels
npm install @triszt4n/remark-types@$version --save --save-exact
cd ..
cd remark-functions-posts
npm install @triszt4n/remark-types@$version --save --save-exact
cd ..
cd remark-functions-users
npm install @triszt4n/remark-types@$version --save --save-exact
cd ..
cd ..
bash updatePackageLocks.sh
