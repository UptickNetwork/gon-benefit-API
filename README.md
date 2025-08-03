
[Nest.js 快速入门：实现对 Mysql 单表的 CRUD](https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247487058&idx=1&sn=fef0fe0e114ec5a7420f679d224a5899&chksm=cf00c169f877487fda71afc03d6f1b7b28c6e9135421292ef688f7c9a3461f1c96beff030a6d&scene=178&cur_album_id=2198094412235309060#rd)



[使用pm2 运行以及启动Nestjs项目](http://bbs.itying.com/topic/5d89d1ba9e631c1318091bdb)

$ npm install pm2 -g     # 命令行安装 pm2 
$ pm2 start app.js -i 4  # 后台运行pm2，启动4个app.js 
                         # 也可以把'max' 参数传递给 start
                         # 正确的进程数目依赖于Cpu的核心数目
$ pm2 start app.js --name my-api # 命名进程
$ pm2 list               # 显示所有进程状态
$ pm2 monit              # 监视所有进程
$ pm2 logs               # 显示所有进程日志
$ pm2 stop all           # 停止所有进程
$ pm2 restart all        # 重启所有进程
$ pm2 reload all         # 0 秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0             # 停止指定的进程
$ pm2 restart 0          # 重启指定的进程
$ pm2 startup            # 产生 init 脚本 保持进程活着
$ pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0           # 杀死指定的进程
$ pm2 delete all         # 杀死全部进程



