## Nginx 安装、配置及应用

### 检测查看系统 nginx 源版本

```bash
yum list | grep nginx
```

### 新建 nginx 的 yum 源版本

```bash
# 打开源配置文件
vim /etc/yum.repos.d/nginx.repo

# 修改为如下内容：
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/OS（系统名）/OSRELEASE（系统版本）/$basearch/
gpgcheck=0
enabled=1

# 参考：baseurl=http://nginx.org/packages/centos/7/$basearch/
```

### 安装 nginx

```bash
yum install nginx
```

### 安装成功检测

```bash
# 查看版本号
nginx -v

# 查看nginx安装涉及的文件目录（rpm 是linux的rpm包管理工具，-q 代表询问模式，-l 代表返回列表）
rpm -ql nginx


# 安装完成后的重要文件
/etc/nginx/nginx.conf
/etc/nginx/conf.d/default.conf
/usr/share/nginx/html（默认网页文件夹）
```

### 常用命令

```bash
# 启动nginx服务
nginx # centos7.4以后
或
systemctl start nginx.service # linux通用

# 开机启动nginx服务
systemctl enable nginx.service

# linux查询服务的运行状况
ps aux | grep nginx

# 暂停nginx服务（-s 表示即将输入控制nginx的命令）
nginx -s quit # 从容停止
nginx -s stop # 立即停止
killall nginx # 杀死nginx的进程
systemctl stop nginx.service # linux通用

# 重启nginx服务
systemctl restart nginx.service # linux通用

# 重载nginx更新后的配置文件
nginx -s reload

# 查看正在运行的端口号
netstat -tlnp
```

### 自定义错误页

```bash
1.设置相关错误页状态码同时映射页面文件目录或指向绝对网址
vim /etc/nginx/conf.d/default.conf
2.创建编辑相关映射文件的内容
cd /usr/share/nginx/html && ls
3.重载nginx更新后的配置文件
nginx -s reload
```

### 简单权限访问

```bash
1.编辑配置文件default.conf的location配置项
vim /etc/nginx/conf.d/default.conf
2.添加允许allow或禁止deny访问的ip地址(注：指令顺序执行)
location / {
    deny  xxx.x.x.xx 或 all;
    allow x.x.x.xxx 或 all;
}
3.重载nginx更新后的配置文件
nginx -s reload
```

### 权限匹配访问

```bash
1.绝对匹配
location = /img {
    allow all;
}
location = /admin {
    allow xx.x.x.xx;
    deny all;
}
2.正则匹配
location ~\.php$ {
    deny all;
}
```

### 配置虚拟主机（三种方式）

```bash
一、基于端口的虚拟主机
1、进入配置文件夹
cd /etc/nginx/conf.d
2、新建并编辑一个配置文件
vim 8001.conf
3、编辑配置文件内容
server {
    listen 8001;
    server_name localhost;
    root /usr/share/nginx/html/html8001;
    index index.html;
}
4、编辑8001端口访问的默认主网页
cd /usr/share/nginx/html/html8001 &&  vim index.html

二、基于IP的虚拟主机（总体操作同一）
与之不同处：server_name修改为ip地址
3、编辑配置文件内容
server {
    listen 8001;
    server_name x.xx.xxx.xxxx;
    root /usr/share/nginx/html/html8001;
    index index.html;
}

三、基于域名的虚拟主机（总体操作同一）
与之不同处：server_name修改为域名
3、编辑配置文件内容
server {
    listen 8001;
    server_name abc.cba.com;
    location / {
        root /usr/share/nginx/html/html8001;
        index index.html;
    }
}
```

### 配置反向代理

```bash
# 配置 vim /etc/nginx/conf.d下的配置文件
server {
    listen 80;
    server_name abc.cba.com;
    location / {
        proxy_pass http://cba.abc.com;
    }
}

配置前提：配置abc.cba.com域名解析指向本机ip地址
配置作用：用户访问abc.cba.com时，反向代理后网页内容为http://cba.abc.com
其他命令：
    proxy_set_header：在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。
    proxy_connect_timeout：配置Nginx与后端代理服务器尝试建立连接的超时时间。
    proxy_read_timeout：配置Nginx向后端服务器组发出read请求后，等待相应的超时时间。
    proxy_send_timeout：配置Nginx向后端服务器组发出write请求后，等待相应的超时时间。
    proxy_redirect：用于修改后端服务器返回的响应头中的Location和Refresh。
```

### 适配移动端或 PC 网页配置

```bash
1.准备移动端【/usr/share/nginx/mobile】和PC端【/usr/share/nginx/pc】网页目录文件
2.修改配置文件（修改或添加都行）
cd /etc/nginx/conf.d && vim xxx.conf
3.编辑xxx.conf内容
server{
    listen 80;
    server_name abc.cba.com;
    location / {
        root /usr/share/nginx/pc;
        if ($http_user_agent ~* '(Android|webOS|iPhone|iPad|BlockBerry)' ) {
            root /usr/share/nginx/mobile;
        }
        index index.html;
    }
}
```

### Gzip 压缩配置

```bash
1.配置/etc/nginx/nginx.conf文件
vim /etc/nginx/nginx.conf
2.编辑内容
http{
    #......
    gzip on;
    gzip_types text/plain application/javascript text/css;
    #......
}
其他配置参数：
gzip：该指令用于开启或 关闭gzip模块。
gzip_buffers：设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。
gzip_comp_level：gzip压缩比，压缩级别是1-9，1的压缩级别最低，9的压缩级别最高。压缩级别越高压缩率越大，压缩时间越长。
gzip_disable：可以通过该指令对一些特定的User-Agent不使用压缩功能。
gzip_min_length：设置允许压缩的页面最小字节数，页面字节数从相应消息头的Content-length中进行获取。
gzip_http_version：识别HTTP协议版本，其值可以是1.1.或1.0.
gzip_proxied：用于设置启用或禁用从代理服务器上收到相应内容gzip压缩。
gzip_vary：用于在响应消息头中添加Vary：Accept-Encoding,使代理服务器根据请求头中的Accept-Encoding识别是否启用gzip压缩。
```
