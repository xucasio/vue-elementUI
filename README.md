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

# 菜单信息

我的工作空间 myworkspace
    我的申请 application
    我的代办 todo
    我的已办 done
    所有申请查询 aquery
客户管理 customer
    个人客户管理 customerPrivateMain
    龙头企业管理 customerCompanyMain
    合作社管理 cooperationInfo
    客户评级管理 cutomerLevel
账户中心 account
    账户管理 customer
业务管理 operation
    牦牛贷 privateLoan
    企业贷 companyLoan
产品管理 product
    贷款产品 productInfo
    分红管理 productBonusInfo
贷前管理 beforeLoan
    风控管理 risk
        规则策略操作日志 ruleLog
        准入规则配置 ruleSet
        反欺诈规则策略 antiFraud
    贷款申请
        牦牛贷申请 privateLoanApplication
        企业待申请 companyLoanApplication
        贷款查询 loanCheck
贷中管理 middleLoan
    贷款评级 loanLevel
        贷款评级查询 loanLevelCheck
        贷款评级申请 loanLevelApplication
    合同管理 contract
        合同模板 contractTemplate
        合同审核 contractVerify
        合同查询 contractCheck
    放款管理 refunds
        放款查询 refundsCheck
        放款申请 refundsApplication
贷后管理 afterLoan
    还款管理 repay
      代还款列表 standbyRepay
      还款明细 repayDetails
      逾期还款列表 overRepay
    提前还款 earlierRepay
        提前还款查询 earlierRepayCheck
        提前还款申请 earlierRepayApplication
    贷后预警 afterLoanWarning
    催收管理 collection
        即将到期 earlierCollection
        已逾期 overCollection
    费用减免 costDiscount
        费用减免申请 costDiscountApplication
运营管理 Operate
    banner管理 banner
统计管理 statistics
    贷款分析 loanAnalyse
        放款笔数 refundsCount
        放款金额 refundsNum
    银行流水 bankDetails
    运营分析 OperateAnalyse
        用户统计 userStatistics
        贷款统计 loanStatistics
    决策支持 decisionSupport
        前十大客户贷款报表 customerLoan
        贷款月度报表 loanMonth
        贷款流水汇总表 loanDetails
        贷款剩余期限表 loanSurplus
        贷款质量报表 loanQuality
        贷款业务查询 businessCheck
        产业数据库 businessData
系统管理 system
    流程管理 process
    用户管理 users
    角色管理 roles
    系统菜单 menus
    部门管理 departments

