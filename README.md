# 修改vue.config.js  
# 原因：asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).This can impact web performance.  
# 修改：performance: {
#      hints: false, // 关闭性能提示
#    }

# GIT 获取指定历史版本代码  
# cd 到该项目的一个本地仓库下  
# log 查看提交记录,找到想要的提交记录,粘贴对应的希哈值 如 git log --since="Fri Aug 10 19:16:10 2012 +0800"  
# 执行 git checkout 希哈值  
# 这本地的这个仓库的代码就会变成你想要的那个版本的代码  

# 单模块性能测试
# 10000行单 vue模块 572.23kib 单模块加载时间233ms