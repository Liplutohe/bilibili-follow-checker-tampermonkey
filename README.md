# 🧭 Bilibili 关注时间查询（Tampermonkey 脚本）

一个可以在 B 站页面上直接查看「是否已关注」和「关注时间」的小工具。  
无需服务器，所有逻辑在本地执行，安全且简单。

---

## ✨ 功能特点
- 🔍 支持模糊搜索昵称或 UID  
- 🕒 显示关注时间（精确到秒）  
- 🔐 自动检测登录状态  
- ⚡ 纯前端运行，无需后端支持  
- 🧱 开源透明，可自由修改  

---

## 🚀 安装方式

[### ✅ 方法一（推荐）
1. 安装浏览器扩展 [Tampermonkey](https://www.tampermonkey.net/)  
2. 右键复制以下链接地址：(https://raw.githubusercontent.com/Liplutothe/bilibili-follow-checker-tampermonkey/main/bilibili-follow-checker.user.js)
3. 在浏览器中打开 Tampermonkey → 点击“+” → 粘贴链接 → 自动识别并安装脚本 ](https://raw.githubusercontent.com/Liplutothe/bilibili-follow-checker-tampermonkey/main/bilibili-follow-checker.user.js) 

### 💡 方法二（未来可选）
待发布到 [GreasyFork](https://greasyfork.org/zh-CN) 后，用户可直接点击“一键安装”完成安装与更新。  

---

## 🧩 使用说明
1. **先登录 B 站账号**  
2. 打开任意 `bilibili.com` 页面  
3. 页面右下角会出现一个 🔍 按钮  
4. 点击按钮后输入 UP 主昵称或 UID  
5. 稍等片刻，即可查看关注状态与关注时间  

> ⚠️ 若提示「请先登录 B 站再使用此功能」，请确认你已在当前浏览器登录 B 站并刷新页面。  
> Tampermonkey 默认设置即可运行，无需修改“Security”选项。

---

## 🏷️ 版本与更新
- 当前稳定版本：**v1.3**  
- 后续更新可在 [GitHub Releases](https://github.com/Liplutothe/bilibili-follow-checker-tampermonkey/releases) 查看  
- 安装脚本的用户会自动接收版本更新（依赖 `@updateURL`）  

> 💡 你可以在 GitHub 上创建一个 `v1.3` 的 tag（或 release），方便用户辨识稳定版本。  

---

## 📜 License
本项目基于 [MIT License](./LICENSE) 开源，欢迎自由使用与二次开发。  
