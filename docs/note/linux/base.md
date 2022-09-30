## Linux 基础了解（CentOS7）

### 1. **目录结构**

```bash
- bin 普通用户使用的命令
- sbin 管理员使用的命令
- dev 设备文件
- proc  虚拟文件系统，反映内核进程信息实时状态
- usr 系统文件，类似C:Windows
- boot 启动文件
- home 用户目录
- etc 配置文件
- lib 库文件
- lib64库文件
- tmp 临时文件
- var 变化文件
- mnt 手工挂载点
```

### 2.文件管理

```bash
目录
mkdir -p   //递归创建
mkdir /home/{dir1,di2}  //可同时建多个目录
 
复制
cp -r      //递归拷贝
cp -rf     //覆盖不提示
 
删除
rm
-r    //递归
-f    //强制
-v    //详细过程
 
查看
cat
-n   //显示行号
-A   //包括控制字符

文件类型
ls -l
-    //普通文件
d    //目录文件
b    //设备文件（块设备）存储设备，如U盘等；
c    //设备文件 (字符设备) 打印机等。
p    //管道文件
l    //连接文件

file 查看文件类型
file /etc/hosts
file /home
 
stat 显示文件的状态信息
stat /etc/hosts
1. Access Time：简写为atime，表示文件的访问时间。当文件内容被访问时，更新这个时间 
2. Modify Time：简写为mtime，表示文件内容的修改时间，当文件的数据内容被修改时，更新这个时间。 
3. Change Time：简写为ctime，表示文件的状态时间，当文件的状态被修改时，更新这个时间，例如文件的链接数，大小，权限，Blocks数。

文件权限
权限对象->属主：u、属组：g、其他：o
基本权限类型->读：r|4、写：w|2、执行：x|1
 
chown：修改文件主或组
chown   属主.属组   文件       //改属主、属组   -R 递归
chown   属主        文件       //改属主
chown       .属组   文件       //改属组
 
chgrp：修改文件组别
chgrp      属组   文件       //改文件属组
chgrp   -R 属组   文件        //改文件属组
 
chmod：修改文件权限
chmod u+x  文件     //属主增加执行
chmod a=rwx 文件    //所有人等于读写执行行
chmod 644  文件     //数字

文件查找：
which：常用于查找可直接执行的命令。只能查找可执行文件，该命令基本只在$PATH路径中搜索，查找范围最小，查找速度快。默认只返回第一个匹配的文件路径，通过选项 -a 可以返回所有匹配结果。
whereis：不只可以查找命令，其他文件类型都可以（man中说只能查命令、源文件和man文件，实际测试可以查大多数文件）。在$PATH路径基础上增加了一些系统目录的查找，查找范围比which稍大，查找速度快。可以通过 -b 选项，限定只搜索二进制文件。
locate：超快速查找任意文件。它会从linux内置的索引数据库查找文件的路径，索引速度超快。刚刚新建的文件可能需要一定时间才能加入该索引数据库，可以通过执行updatedb命令来强制更新一次索引，这样确保不会遗漏文件。该命令通常会返回大量匹配项，可以使用 -r 选项通过正则表达式来精确匹配。
find：直接搜索整个文件目录，默认直接从根目录开始搜索，建议在以上命令都无法解决问题时才用它，功能最强大但速度超慢。除非你指定一个很小的搜索范围。通过 -name 选项指定要查找的文件名，支持通配符。
```

### 3. **用户管理**

```bash
查看登录信息
id
uid=0(root) gid=0(root) groups=0(root)
 
查看文件的owner(所有者)
ls -al  /home/
 
用户组
groupadd    //创建
groupdel    //删除
 
用户
useradd    //创建
 -u                  //指定uid
 -d                  //指定家目录
 -s /sbin/nologin    //指定shell
 -G                  //创建目录指定附加组
 -g                  //指定组
 
userdel    //删除  -r 同时删除家目录
 
用户密码
passwd 用户名   //root可设置任何用户密码
```

### 4. 进程管理

```bash
# ps aux |more
USER  PID %CPU  %MEM   VSZ    RSS  TTY   STAT  START  TIME  COMMAND
root  1   0.0   0.0    2164   648  ?     Ss    08:47  0:00  init [5]

USER 运行进程用户
PID 进程ID
%CPU CPU占用率
%MEM 内存占用率
VSZ 占用虚拟内存(KB)
RSS 占用实际内存(KB)
TTY 该进程在哪个终端上运行（登陆者的终端位置），若与终端无关，则显示（？）。若为pts/0等，则表示由网络连接主机进程
STAT 进程状态
START 该进程被触发启动时间
TIME 该进程实际使用CPU运行的时间
COMMAND 进程文件、进程名

D 无法中断的休眠状态（通常 IO 的进程）
R 正在运行
S 处于休眠状态
T 停止或被追踪
W 进入内存交换 （从内核2.6开始无效）
X 死掉的进程  （基本很少见）
Z 僵尸进程
< 优先级高的进程
N 优先级较低的进程
L 有些页被锁进内存
s 进程的领导者（在它之下有子进程）
l 多进程的（使用 CLONE_THREAD, 类似 NPTL pthreads）
+ 位于后台的进程组

# 信号控制进程
kill -l  查看系统定义的所有信号量
kill  -1       重新加载配置
kill  -9       强杀  //ps -ef|grep tomcat 找到进程号 然后kill -9 20466
kill  -15      正常终止
kill  -18/-19  继续/暂停

进程进行实时监控：top
显示瞬间进程的状态，并不动态连续：ps
将目前属于用户本次登入的 PID 与相关信息列示出来：ps -l
列出目前所有的正在内存当中的程序：ps axu
```

### **5. 设置本机 ip，dns 及 hostname**

```bash
# 设置主机名
hostnamectl set-hostname  your-name

# 网络静态IP配置
1.修改网络配置文件
vi /etc/sysconfig/network-scripts/ifcfg-ens192【文件名可能不同：ifcfg-***】
____
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
# BOOTPROTO=dhcp【动态IP】
BOOTPROTO=static【静态IP】
DEFROUTE=yes
IPV4_FAILURE_FATAL=yes
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens192
UUID=78c4c01f-65ed-4aee-bed9-729ef80e2848
DEVICE=ens192
# 开启网络连接
ONBOOT=yes
# 固定IP
IPADDR=192.168.190.129
# 子关掩码
NETMASK=255.255.255.0
# 网关
GATEWAY=192.168.190.2
DNS1=8.8.8.8
PREFIX=24
IPV6_PRIVACY=no
ZONE=public
____

2.配置DNS【可选】
vi /etc/resolv.conf
____
nameserver 192.168.190.129 # 固定IP
____

3.重启网络，使配置生效
service network restart 或 systemctl restart network.service

4.测试网络和开机重启查看IP变化

5.查看配置ip信息：ifconfig
若命令不存在，安装ifconfig”命令（用于配置和显示Linux内核中网络接口的网络参数）
yum install net-tools
```

### 6. 修改时区及服务器时间

```bash
# 修改成标准时间
mv /etc/localtime /etc/localtime.bak
ln -s /usr/share/zoneinfo/UTC  /etc/localtime
date -s
clock -w
 
# 修改成北京时间
[root@localhost ~]# mv /etc/localtime /etc/localtime.bak 
[root@localhost ~]# ln -s /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime 
 
date -s //设置当前时间。
date -s 20180806 //设置成20180806，这样会把具体时间设置成空00:00:00
date -s 01:01:01 //设置具体时间，不会对日期做更改
date -s “01:01:01 2018-08-06″ //这样可以设置全部时间
date -s “01:01:01 20180806″ //这样可以设置全部时间
date -s “2018-08-06 01:01:01″ //这样可以设置全部时间
date -s “20180806 01:01:01″ //这样可以设置全部时间
```

### 7. 设置防火墙 firewall，比如开放 80 及 8080 端口

```bash
启动防火墙： systemctl start firewalld
查看防火墙状态： systemctl status firewalld
停止防火墙： systemctl disable firewalld
禁用防火墙： systemctl stop firewalld
开机启用防火墙： systemctl enable firewalld
 
# 新增防火墙端口：
1.添加开启80端口
firewall-cmd  --zone=public --add-port=80/tcp --permanent【--permanent永久生效，没有此参数重启后失效】
2.重新载入：firewall-cmd --reload
3.查看结果：firewall-cmd --zone=public --query-port=80/tcp


# 常见命令
查看版本： firewall-cmd --version
查看帮助： firewall-cmd --help
显示状态： firewall-cmd --state
查看所有打开的端口：firewall-cmd --zone=public --list-ports
删除指定端口防火墙：firewall-cmd --zone=public --remove-port=80/tcp --permanent
更新防火墙规则： firewall-cmd --reload
查看区域信息:  firewall-cmd --get-active-zones
查看指定接口所属区域： firewall-cmd --get-zone-of-interface=eth0
拒绝所有包：firewall-cmd --panic-on
取消拒绝状态： firewall-cmd --panic-off
查看是否拒绝： firewall-cmd --query-panic

# 网络端口管理
查看所有端口使用情况· netstat -ntulp
查看所有3306端口使用情况· netstat -ntulp | grep 3306
```

### 8. **文件打包及压缩**

```bash
.tar
压缩：tar cvf FileName.tar FileName
解压：tar xvf FileName.tar

.gz
解压1：gunzip FileName.gz
解压2：gzip -d FileName.gz
压缩：gzip FileName

.tar.gz
解压：tar zxvf FileName.tar.gz
压缩：tar zcvf FileName.tar.gz DirName

.bz2
解压1：bzip2 -d FileName.bz2
解压2：bunzip2 FileName.bz2
压缩： bzip2 -z FileName

.tar.bz2
解压：tar jxvf FileName.tar.bz2
压缩：tar jcvf FileName.tar.bz2 FileName

.zip
解压：unzip FileName.zip
压缩：zip FileName.zip FileName
```

### 9. 系统信息的查看

```bash
# 系统版本信息
cat /etc/redhat-release # 查看版本当前操作系统发行版信息
cat /proc/version # 查看当前操作系统版本信息
cat /proc/cpuinfo # 查看cpu相关信息，包括型号、主频、内核信息等

# 查看系统内存
free
	-b：以Byte为单位显示内存使用情况；
	-k：以KB为单位显示内存使用情况；
	-m：以MB为单位显示内存使用情况；
	-s<间隔秒数>：持续观察内存使用状况；
	-t：显示内存总和列；
	-V：显示版本信息

free -m
		total    used     free     shared     buff/cache     available
Mem:    3791   	 733      760      175        2296           2584
Swap:   3967     0        3967

# 查看磁盘信息
df -h # 显示磁盘的使用情况
fdisk -l # 查看磁盘分区
du -sh # 查看文件大小
```

### 10. 软件的安装管理

```bash
# 常用有3种方法:
1. rpm包安装
软件管理器：RPM（RedHat Package Manager），RPM的最大优点是软件预先编译过，并且打包成RPM机制的安装包，安装包内会默认记录该软件需要依赖的属性软件，当安装时会查询依赖软件是否满足，如果满足则予以安装。
RPM默认的安装路径
/var/lib/rpm/  # 该软件相关的信息
/usr/bin  # 一些可执行文件
/etc  # 一些设置文件放置的目录
/usr/share/doc  # 一些基本的软件使用手册与帮助文档
/usr/share/man  # 一些man page 文件

# 通常安装软件
rpm  -ivh rpm -ivh jdk-8u121-linux-x64.rpm
# 卸载 
rpm -e --nodeps rpm -ivh jdk-8u121-linux-x64
rpm -qa  # 查询已经安装的软件
rpm -ql package_name # 查询已安装软件详细文件

2. yum安装
查询功能  yum list # 列出资源库中所有可以安装或更新的rpm包
安装与升级  yum [install|update]
删除功能  yum [remove]
yum的设置文件  /etc/yum.repos.d/CentOS-Base.repo

# 实例操作：
# 安装vsftpd
yum list|grep vsftpd

yum list|grep vsftp
vsftpd.x86_64 3.0.2-22.el7 base 
vsftpd-sysvinit.x86_64 3.0.2-22.el7 base

yum -y install vsftpd.x86_64 3.0.2-22.el7
rpm -qa|grep vsftpd  # 查看是否已安装 或yum list installed|grep vsftpd
yum remove vsftpd.x86_64 3.0.2-22.el7  # 卸载安装包

# yum 终止安装进程
ctrl+z  #中断当前的安装显示
ps -ef | grep yum  #查找当前yum相关的进程
kill -9 进程号(pid)  #杀掉进程

3. 源码编译安装
将拿到的类似--tar.gz源码包在/software/下解压缩
进入该目录：查看INSTALL、README的内容，并安装好相关软件
./configure :建立makefile:以自动检测程序检测操作环境，并建立Makefile这个文件
有些时候需要先进行make clean
编译make：以make这个程序并使用该目录下的Makefile作为它的参数配置文件，来进行make操作
安装make install
# 例如安装nginx
cd /software
tar zxvf nginx-1.12.2.tar.gz
./configure --prefix=/opt/seczone/nginx1.12
make
make install
# 导出环境变量（部分程序需要 如：git）
echo "export PATH=$PATH:/usr/local/git/bin">>/etc/bashrc
source /etc/bashrc

# 卸载：删除对应的安装目录就行了
rm -rf /opt/seczone/nginx1.12
```

### 11. 文本编辑 vi

```bash
命令模式

# 光标定位
hjkl  //上下左右
0 $   //行首行尾
gg G  //文首文尾
3G    //进入第三行
 
# 文本编辑
y  //复制 yy 3yy ygg  yG
d  //删除 dd 3dd dgg  dG
D  //从光标处删除到行尾
u  //undo撤销
r  //修改一个字符
 
# 可视块模式
块插入： //选择块，I   在块前插入字符
块替换： //选择块，r   输入替换的字符
块删除： //选择块，d | x
块复制： //选择块，y
```
