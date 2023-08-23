npm官网：https://www.npmjs.com/

npm全命令：https://docs.npmjs.com/cli/v7/commands

# 概念

1. 什么是**包**？

   包（package）是一个或多个js模块的集合，它们共同完成某一类功能

   可以简单的认为每一个工程就是一个包

   有些包是为了给别人用的，这种包也叫第三方库

2. 什么是**包管理器**？

   包管理器是一个管理包的工具，前端常见的包管理器有npm、yarn、cnpm、pnpm等

   包管理器具备以下能力：

   - 让开发者可以轻松的下载包
   - 让开发者可以轻松的升级和卸载包
   - 能够自动管理包的依赖

3. 什么是**cli**

   cli是一个命令行工具，它提供一个终端命令，通过该命令可以完成一些功能

# node查找包的顺序

```js
require("a")
```

1. 查找是否有内置模块a
2. 查找当前目录的node_modules中是否有a
3. 依次查找上级目录的node_modules中是否有a，直到根目录

# 配置源

## 查看源

```shell
npm config get registry
```

## 配置淘宝镜像源

```shell
npm config set registry https://registry.npm.taobao.org
```

## 配置官方源

```shell
	npm config set registry https://registry.npmjs.org/
```

# 初始化

```shell
npm init # 初始化工程，帮助生成 package.json 文件
npm init -y # 初始化工程，全部使用默认配置生成 package.json 文件
```

# package.json

```json
{
  "dependencies": { // 本地普通依赖
    "qrcode": "^1.4.4" // 依赖包qrcode，版本1.4.4，主版本号不变，此版本号和补丁版本可增
  },
  "devDenpendencies": { // 开发依赖
    "webpack": "^5.0.0" 
  }
}
```

# 安装

## 本地安装

会将包下载到当前命令行所在目录的node_modules中

绝大部分安装都使用本地安装

```shell
# 下面的 install 可以替换为 i
npm install 包名
npm install --save 包名
npm install 包名@版本号
```

若仅作为开发依赖，则添加参数`-D`

```shell
# 下面的 install 可以替换为 i
npm install -D 包名
npm install -D 包名@版本号
```

若要还原安装

```shell
# 下面的 install 可以替换为 i
npm install
npm install --production # 仅还原dependencies中的依赖
```

## 全局安装

会将包下载到一个全局的位置

只有需要使用某个全局命令时，才需要进行全局安装

```shell
# 下面的 install 可以替换为 i
npm install -g 包名
npm install -g 包名@版本号
```

# 卸载

## 本地卸载

卸载本地的安装包

```shell
# 下面的 uninstall 均可替换为 un
npm uninstall 包名
```

## 全局卸载

卸载全局的安装包

```shell
# 下面的 uninstall 均可替换为 un
npm uninstall -g 包名
```

# 查看包信息

## 查看包所有的版本

```shell
# view 可以替换为 v
npm view 包名 versions
```

