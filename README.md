# NikiBlog

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是一个基于`LESS`+`VUE3`+`Vite`+`Express`+`Mysql`+`Docker`打造的个人博客开项目，包含从开发到部署，当前的功能比较简单，但可以满足基本的用户管理、博文发布、阅读等基本功能。如果你也喜欢这个作品的话，可以 fork 到你的仓库中，顺便留下一个 star ★ 鼓励一下，我也会持续完善这个项目的功能
 
## 目录

- [演示](#演示)
- [开发](#开发)
  - [数据库设计](#数据库设计)
  - [前端代码](#前端代码)
  - [后端代码](#后端代码)

- [Docker部署](#部署)
- [版权说明](#版权说明)

### 演示
首页
![首页](https://github.com/Niki-Huang/NikiBlog_Frontend/blob/main/public/home.png?raw=true)
预览
![预览](https://github.com/Niki-Huang/NikiBlog_Frontend/blob/main/public/blog.jpg?raw=true)
阅读
![阅读](https://github.com/Niki-Huang/NikiBlog_Frontend/blob/main/public/read.jpg?raw=true)
写作
![写作](https://github.com/Niki-Huang/NikiBlog_Frontend/blob/main/public/write.png?raw=true)

### 开发

#### 数据库设计
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数据库的设计文档在[ 此处 ](https://github.com/Niki-Huang/NikiBlog_Backend/blob/main/doc/%E6%95%B0%E6%8D%AE%E8%A1%A8%E8%AE%BE%E8%AE%A1.xls)，步骤如下
>1、创建一个名为 blog_data 的数据库，字符集、排序规则选择utf8mb4
2、根据[ 这里 ](https://github.com/Niki-Huang/NikiBlog_Deployment/blob/main/Mysql/create_sql.txt)的代码创建两张数据表，根据[ 这里 ](https://github.com/Niki-Huang/NikiBlog_Deployment/blob/main/Mysql/insert_sql.txt)的代码插入基本的数据

#### 前端代码
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 此处 ](https://github.com/Niki-Huang/NikiBlog_Frontend)为前端代码，步骤如下
>1、安装依赖：`npm i`
>2、运行：`npm run dev`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注意点如下
>1、由于有一些第三方库还不支持 ts，可能需要在库文件夹中添加相应的 declare 文件（可以 chatgpt 询问一下）
>2、配置文件在[ 此处 ](https://github.com/Niki-Huang/NikiBlog_Frontend/blob/main/src/config.ts)


#### 后端代码
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 此处 ](https://github.com/Niki-Huang/NikiBlog_Backend)为后端代码，步骤如下
>1、安装依赖：`npm i`
>2、使用 ORM 框架 sequelize 生成数据库表模型：`npm run orm`
>3、运行：`npm start`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注意点如下
>1、配置文件在[ 此处 ](https://github.com/Niki-Huang/NikiBlog_Backend/blob/main/config.js)

### 部署
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我采用的是 Linux 系统进行部署，部署相关的内容[ 在这 ](https://github.com/Niki-Huang/NikiBlog_Deployment),步骤如下
>1、首先根据 mysql 镜像创建一个 niki_blog_mysql 的 mysql 容器，同样地创建一个 blog_data 数据库，并且依照[ 这里 ](https://github.com/Niki-Huang/NikiBlog_Deployment/tree/main/Mysql)创建两张数据表和插入基础数据
>2、将[ 这个 ](https://github.com/Niki-Huang/NikiBlog_Deployment/tree/main/Frontend) 文件夹拷贝到 Linux 机上，然后进入到这个文件夹中执行：`docker build -t niki_blog_frontend .` 创建一个承载打包好的前端代码的 nginx 镜像
>3、将[ 这个 ](https://github.com/Niki-Huang/NikiBlog_Deployment/tree/main/Backend)文件夹拷贝到 Linux 机上，然后进入到这个文件夹中执行：`docker build -t niki_blog_backend .` 创建一个承载后端代码的 node 镜像
4、最后使用 [ compose文件 ](https://github.com/Niki-Huang/NikiBlog_Deployment/blob/main/compose.yaml)来跑这几个容器

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/Niki-Huang/NikiBlog_Backend/blob/main/LICENSE)

<!-- links -->
[license-shield]: https://img.shields.io/github/license/shaojintian/Best_README_template.svg?style=flat-square
[license-url]: https://github.com/Niki-Huang/NikiBlog_Backend/blob/main/LICENSE