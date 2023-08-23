## 卸载node

### windows

进入添加和删除程序进行卸载

### mac

https://www.jianshu.com/p/88cd55296983

## 下载安装 nvm

### windows

链接: https://pan.baidu.com/s/1uoxlk8CVNHV2KTCwIGbQMQ?pwd=yi5m 

提取码: yi5m 

### mac

修改 HOSTS（建议使用 SwitchHosts）

```
? raw.githubusercontent.com
? objects.githubusercontent.com
? pkg-containers.githubusercontent.com
```

> ？位置需要通过 https://www.ipaddress.com/ 查询 ip

打开终端运行下面的命令

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

## nvm 的基本使用

```shell
# 查看当前安装和使用的 node 版本
nvm list

# 安装某个 node 版本
nvm install 版本号

# 切换 node 版本
nvm use 版本号

# 设置默认版本
nvm alias v12.22.12
```

