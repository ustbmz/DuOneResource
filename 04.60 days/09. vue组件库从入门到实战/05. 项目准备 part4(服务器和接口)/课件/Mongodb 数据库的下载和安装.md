# Mongodb 数据库相关操作



## 下载

首先进入到 mongodb 的官网：https://www.mongodb.com/

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-052350.png" alt="image-20220911132350349" style="zoom:50%;" />

会自动根据你的操作系统选择对应的版本。直接点击 download 进行下载即可。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-052429.png" alt="image-20220911132428555" style="zoom:50%;" />



## 安装

mac 下面是一个 tgz 格式的压缩包，直接解压，解压后就是安装好的目录，放入到 /usr/local

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-052539.png" alt="image-20220911132539327" style="zoom:50%;" />

需要大家创建几个文件：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-052630.png" alt="image-20220911132630299" style="zoom:50%;" />

- data：存储数据的地方，我们的所有数据库的所有数据，实际上都在这个文件夹里面
- mongod.log：日志文件
- mongodb.conf：数据库的配置文件，我们一会儿需要对这个配置文件进行一些必要的修改，之后让数据库以我们配置文件的配置来启动



## 配置文件

配置内容如下：

```js
systemLog:
  destination: file # 日志输出方式。file/syslog,如果是file，需指定path，默认是输出到标准输出流中
  path: /usr/local/mongodb/mongod.log  # 日志路径
  logAppend: true # 启动时，日志追加在已有日志文件内还是备份旧日志后，创建新文件记录日志, 默认false

net:
  port: 27017 # 监听端口，默认27017
  bindIp: 127.0.0.1 # 绑定监听的ip，设置为127.0.0.1时，只会监听本机
  maxIncomingConnections: 65536 # 最大连接数，可接受的连接数还受限于操作系统配置的最大连接数
  wireObjectCheck: true # 校验客户端的请求，防止错误的或无效BSON插入,多层文档嵌套的对象会有轻微性能影响,默认true
 
processManagement:
  fork: true  # 后台运行

security:
  authorization: disabled  # enabled/disabled # 开启客户端认证

storage:
  dbPath: /usr/local/mongodb/data # 数据库地址
```





## 启动

cd 到 mongdb 的 bin 目录下面，该 bin 目录全部都是一些可执行文件

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-053450.png" alt="image-20220911133449422" style="zoom:50%;" />

上面的命令中，有两个命令会用到：

- mongod：启动数据库服务器的
- mongo：是一个命令行工具，可以以命令行的形式来操作数据库



接下来我们输入命令：

```js
mongod -f 配置文件的路径
```

实际操作如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-053845.png" alt="image-20220911133845128" style="zoom:50%;" />





使用 mongo 可执行命令连接数据库操作如下图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-054117.png" alt="image-20220911134117344" style="zoom:50%;" />



## 安装可视化工具

顾名思义，就是一些拥有图形化界面的工具，让我们能够更加方便的操作数据库

可视化工具安装一个就可以了

- robo3t（现在官方已经合并到了 stduio3t 里面）
- stduio3t
- compass
- navicate（可以连接 mongo、mysql...）

> 如果大家需要 robo3t，可以在课件中找到安装包

创建本地连接具体操作如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-055057.png" alt="image-20220911135057011" style="zoom:50%;" />





## 下载更多的可执行文件

目前，在我们的 mongodb 下的 bin 目录里面，有的可执行文件只有几个

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-055220.png" alt="image-20220911135219396" style="zoom:50%;" />

接下来我们还是去官网，下载其他的可执行文件压缩包

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-055339.png" alt="image-20220911135339189" style="zoom:50%;" />

下载完成后，解压缩，之后将bin文件夹下面的所有可执行文件放入到 mongo 目录下的 bin 目录下即可。



## 恢复数据

服务器地址：https://gitee.com/dev-edu/mysite-server

下载了此服务器，安装依赖，启动之前，需要先将数据库服务器启动起来。

默认会生成一个叫做 mysite 的数据库，里面默认只会初始化三张表

在 mongodb 中，如果我们连接一个不存在的数据库，会自动创建该数据库，如果往一个不存在的集合（表）里面添加数据，mongodb 就会自动创建该集合（表），所以说，一开始只有三张表是正常的。

当然大家也可以选择恢复我课堂上的数据，数据在服务器里面的一个叫做《数据库相关文件》的目录里面

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-061603.png" alt="image-20220911141602788" style="zoom:50%;" />

- Mongodb.pdf：是一个关于 mongodb 的简易教程
- mysiteDB.zip：是一个压缩包，里面就是我课堂上使用的数据

解压后如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-061905.png" alt="image-20220911141905213" style="zoom:50%;" />

恢复数据库数据的命令如下：

```js
mongorestore -h dbhost -d dbname --dir dbdirectory
```

- -h：MongoDB 所在服务器地址 
- -d：需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2 
- --dir：备份数据所在位置

具体操作如下图所示：（要保证在启动了数据库服务器的前提下）

首先还是进入到 mongodb 下的bin目录，进行如下操作：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-062340.png" alt="image-20220911142340068" style="zoom:50%;" />

通过可视化工具也可以看到我们数据恢复成功！

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-062453.png" alt="image-20220911142452738" style="zoom:50%;" />



## 关于数据库的图片

数据库里面存储图片时，所存储的是该图片在服务器所在目录的地址

![image-20220911142632659](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-062632.png)

真实的图片实际上是在服务器对应的目录下面

![image-20220911142733280](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-09-11-062733.png)

但是我给大家服务器的时候，我是把 upload 目录下面的图片删除了的，所以大家虽然能够从数据库中获取到图片地址，但是图片仍然显示不出来。这是正常的，回头你们做了上传组件后，上传自己的图片即可。



## 关于部署

部署是整个项目写完之后进行部署，部署那里有一点改动，所以大家要把《项目部署补充视频》一起看了。