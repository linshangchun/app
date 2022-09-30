# CentOS7 系统常用软件

## ifconfig

```bash
yum install net-tools
```

## gcc、g++

```bash
yum install gcc
yum install gcc-c++
```

## wegt

```bash
yum install wegt
```

## git

```bash
# 仓库版本地址：https://github.com/git/git/releases/git-2.28.0.tar.gz

# wegt获取 或 下载压缩包上传至安装目录(快)
wegt https://github.com/git/git/releases/最新版本

# 安装编译包
yum install -y curl-devel expat-devel gettext-devel zlib-devel gcc perl-ExtUtils-MakeMaker
yum install openssl*

# 解压压缩包 git-2.28.0.tar.gz
tar -zxvf git-2.28.0.tar.gz

# 进入解压包
cd  git-2.28.0

# 编译安装
./configure --prefix=/usr/local/git

# 执行安装
make install

# 配置环境变量
echo "export PATH=$PATH:/usr/local/git/bin">>/etc/bashrc
source /etc/bashrc

# 验证安装结果并查看版本
git --version
```

## gitlab

```bash
# 安装相关依赖包：ssh，防火墙,postfix(用于邮件通知) ，wget等
sudo yum install -y curl policycoreutils-pythonopen ssh-server
# 将SSH服务设置成开机自启动
systemctl enable sshd
# 启动SSH服务
systemctl start sshd
# 安装防火墙 开启防火墙
yum install firewalld systemd -y
service firewalld  start
# 添加http服务到firewalld,pemmanent表示永久生效
firewall-cmd --permanent --add-service=http
# 重启防火墙
systemctl reload firewalld
# 安装Postfix以发送通知邮件
yum install postfix
# 将postfix服务设置成开机自启动，并开启服务
systemctl enable postfix
sudo systemctl start postfix
# 进入指定目录，下载gitlab镜像
cd /yuor/software/path
wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-10.0.0-ce.0.el7.x86_64.rpm
# 安装gitlab
rpm -i gitlab-ce-10.0.0-ce.0.el7.x86_64.rpm
# 修改gitlab配置文件指定服务器ip和自定义端口
vim  /etc/gitlab/gitlab.rb
# 找到并修改以下内容
external_url 'http://127.0.0.1:port'
# 重置初始化环境，启动，停止，重启gitlab
gitlab-ctl reconfigure
gitlab-ctl restart
gitlab-ctl stop
gitlab-ctl restart
# 设置开机自启gitlab
systemctl enable gitlab-runsvdir.service
# 禁止开机自启
systemctl disable gitlab-runsvdir.service
# 修改root用户密码 ?

```

## nodejs

```bash
wget https://nodejs.org/dist/v10.13.0/node-v10.13.0-linux-x64.tar.xz

xz -d node-v10.13.0-linux-x64.tar.xz
tar -xf node-v10.13.0-linux-x64.tar

# 查看链接位置：whereis linkname（如：whereis node）
# node解压目录是 ~/node-v10.13.0-linux-x64
# 映射快捷操作命令
ln -s ~/node-v10.13.0-linux-x64/bin/node /usr/bin/node
ln -s ~/node-v10.13.0-linux-x64/bin/npm /usr/bin/npm
```

## pm2

```bash
npm install -g pm2

# 查看链接位置：whereis linkname（如：whereis pm2）
# 找到npm全局安装目录是 /usr/local/src/node-v8.9.0-linux-x64/bin/pm2
# 映射快捷操作命令
ln -s /usr/local/src/node-v8.9.0-linux-x64/bin/pm2 /usr/bin/pm2
```

## mysql

```bash
# 进入数据库系统【mysql -h主机地址 -u用户名 －p用户密码】注:u与root之间可以不用加空格，其它同理
mysql -uroot -p  # 本地
mysql -h 110.110.110.110 -u root -p 123456  # 远程

# 修改密码【mysqladmin -u用户名 -p旧密码 password 新密码】
# 1、初始化root密码，因为开始时root没有密码，所以-p旧密码一项就可以省略了
mysqladmin -u root -password 123
# 2、修改root密码
mysqladmin -u root -p 123 password 123456

# 增加新用户【grant select on 数据库.* to 用户名@登录主机 identified by “密码”;】
# 1、增加一个用户test密码为test123，让他可以在任何主机上登录，并对所有数据库有查询、插入、修改、删除的权限
grant select,insert,update,delete on *.* to [email=test@”%]test@”%[/email]” Identified by “test123”;
# 2、增加一个用户test密码为test123,让他只可以在localhost上登录，并可以对数据库mydb进行查询、插入、修改、删除的操作（localhost指本地主机，即MYSQL数据库所在的那台主机），这样用户即使用知道test的密码，他也无法从internet上直接访问数据库，只能通过MYSQL主机上的web页来访问了。
grant select,insert,update,delete on mydb.* to [email=test@localhost]test@localhost[/email] identified by “test123”;
# 3、取消用户密码
grant select,insert,update,delete on mydb.* to [email=test@localhost]test@localhost[/email] identified by “”;

# 创建数据库【create database <数据库名>;】
# 1、创建一个test数据库
create database test;
# 2、创建数据库test并分配用户ok
①CREATE DATABASE test;
②GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER ON test.* TO ok@localhost IDENTIFIED BY '123456';
③SET PASSWORD FOR 'ok'@'localhost' = OLD_PASSWORD('123456');

# 显示当前数据库
show databases;

# 删除数据库【drop database <数据库名>;】
drop database db_name;

# 连接进入数据库【use <数据库名>;】
use db_name;

# 当前选择的数据库【select <数据库名>();】
select db_name();

# 创建数据表【create table <表名> ( <字段名1> <类型1> [,..<字段名n> <类型n>]);】
# 删除数据表【drop table <表名>;】
# 表插入数据【insert into <表名> [( <字段名1>[,..<字段名n> ])] values (值1)[, (值n)];】
# 查询表中的数据【select <字段1，字段2，...> from <表名> where <表达式>;】
# 1、查看数据库某表的详细信息
select * from tb_name
# 2、查询数据库某表前n行数据
select * from tb_name order by id limit 0,2;
# 删除表中数据【delete from <表名> where <表达式>;】
# 修改表中数据【update <表名> set <字段>=<新值>,… where <条件>;】
# 增加表中字段【alter table <表名> add <字段> <类型> <其他>;】
# 修改表名称【rename table <原表名> to <新表名>;】
# 查看表结构【desc <表名>();】
desc tb_name();

# 备份数据库【导出文件默认是存在mysql\bin目录下】
mysqldump -h hostname -uroot -p dbname > /root/sql/bak.sql
# 1.导出整个数据库【mysqldump -u 用户名 -p 数据库名 > 导出的文件名】
mysqldump -u user_name -p123456 database_name > outfile_name.sql
# 2.导出一个表【mysqldump -u 用户名 -p 数据库名 表名 > 导出的文件名】
mysqldump -u user_name -p database_name table_name > outfile_name.sql
# 3.导出一个数据库结构【-d 没有数据 –add-drop-table 在每个create语句之前增加一个drop table】
mysqldump -u user_name -p -d –add-drop-table database_name > outfile_name.sql
# 4.带语言参数导出
mysqldump -uroot -p –default-character-set=latin1 –set-charset=gbk –skip-opt database_name > outfile_name.sql
# 例如，将test库备份到文件bak_test中：
[root@test1 root]# cd /home/data/mysql
[root@test1 mysql]# mysqldump -u root -p --opt test > bak_test

# 退出数据库系统
exit （回车）

# 参考：https://www.cnblogs.com/bluealine/p/7832219.html
```
