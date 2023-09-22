# *Umi.js* 介绍

接下来要介绍的最后一个东西，就是 *Umi.js*，这也是由蚂蚁金服所推出的基于 *React* 的前端框架，它和前面所介绍的 *Dva*、*Antd pro* 之间的关系是包含关系，也就是说整个 *Umi* 是一个集大成的框架，这从官方给出的插图也能看出来：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-05-065301.png" alt="image-20221105145301148" style="zoom:50%;" />

有关 *Umi* 的介绍，可以参阅：*https://umijs.org/docs/introduce/introduce*

有关 *Umi* 的设计哲学，可以参阅：*https://umijs.org/docs/introduce/philosophy*



目前，*Umi* 最新的版本为 *4.0*，分为了**普通版**和 ***Max* 版本**，在开发后台时，我们大多使用 *Umi Max*，因为里面涵盖了我们要用到的 *antd、antd pro、dva*等技术。

在正式开始做项目之前，我们需要了解一些有关 *umi* 的基本使用和特点，主要有以下几个点：

- 约定式路由
- 插件机制
- 构建时配置和运行时配置



## 约定式路由

约定式路由并不是 *Umi* 独有的东西，像基于 *Vue* 的 *Nuxt.js*，基于 *React* 的 *Next.js* 框架，都提供了约定式路由的方式。

而早期在 *Umi 2.x* 时代，团队借鉴了这种方式，加入了约定式路由的功能，并沿用至今。

所谓约定式路由，简单来讲，就是根据你的页面级组件自动生成路由的配置，而不再需要我们自己去书写路由配置。

有关约定式路由的说明，在 *v4* 的文档中介绍相对比较简单：*https://umijs.org/docs/guides/directory-structure#pages*，*v4* 更多的是介绍配置式路由。

如果想要了解约定式路由，这里可以参阅 *v2* 和 *v3* 的文档：

- *v2* 文档：*https://v2.umijs.org/zh/guide/router.html*

- *v3* 文档：*https://v3.umijs.org/zh-CN/docs/convention-routing*

> 注意不同版本之间会有略微的差异，例如动态路由在 *v2* 和 *v3* 中的使用方式就有所区别，当发现差异时，应该查询自己对应版本的文档说明



## 插件机制

在 *Umi* 中，采用了插件的机制，所涵盖的其他技术都以插件的形式引入。

要开启某个插件，我们可以在 *.umirc.js* 中进行配置，例如：

```js
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  dva: {},
  npmClient: 'npm',
});
```

另外，如果*.umiirc.js* 文件配置的内容很多的话，可以单独提取出来，放入到 *config/config.js* 里面（二选一，*.umirc.js* 优先）



## 构建时配置和运行时配置

从 *v2* 版本开始，*Umi* 就一直包含两个配置文件，到了 *v4* 也一直保持这一特点。

**构建时配置**

在 *Umi* 中，约定项目根目录下的 *.umirc.js/ts* 为构建时配置，当我们启动 *Umi* 项目时，*Umi* 会对整个项目进行一次构建，在 *src* 目录下生成一个 *.umi* 的临时目录，构建时配置则决定了所生成的 *.umi* 目录的样子。

*.umi* 目录的结构如下：

```js
+ .umi
  + core     # 内部插件生成
  + pluginA  # 外部插件生成
  + presetB  # 外部插件生成
  + umi.ts   # 入口文件
```

因此，在构建时配置中，一个很重要的用途就是开启插件。

有关 *.umirc.js/ts* 具体的配置项，请参阅：*https://umijs.org/docs/api/config*



**运行时配置**

运行时配置和配置的区别是他跑在浏览器端，基于此，我们可以在这里写函数、*tsx*、*import* 浏览器端依赖等等，注意不要引入 *node* 依赖。

在 *umi* 中，约定 *src* 目录下的 *app.js/ts/jsx/tsx* 为运行时的配置文件。

有关运行时配置项目，请参阅：*https://umijs.org/docs/api/runtime-config*



