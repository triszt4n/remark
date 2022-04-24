#!/bin/bash

cd client
yarn install
cd ..
cd functions
cd remark-functions-channels
npm install
cd ..
cd remark-functions-posts
npm install
cd ..
cd remark-functions-users
npm install
cd ..
cd ..
cd remark-auth
npm install
cd ..
cd remark-types
npm install
