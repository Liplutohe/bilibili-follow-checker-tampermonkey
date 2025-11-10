// ==UserScript==
// @name         Bilibili 关注时间查询
// @namespace    https://github.com/Liplutothe/bilibili-follow-checker-tampermonkey
// @version      1.3
// @description  查询你对某个UP主的关注状态和关注时间（模糊匹配 + 登录自动识别）
// @author       Liplutothe
// @match        *://*.bilibili.com/*
// @grant        GM_addStyle
// @license      MIT
// @homepage     https://github.com/Liplutothe/bilibili-follow-checker-tampermonkey
// @updateURL    https://raw.githubusercontent.com/Liplutothe/bilibili-follow-checker-tampermonkey/main/bilibili-follow-checker.user.js
// @downloadURL  https://raw.githubusercontent.com/Liplutothe/bilibili-follow-checker-tampermonkey/main/bilibili-follow-checker.user.js
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(`
        #followCheckBtn {
            position: fixed;
            bottom: 40px;
            right: 40px;
            z-index: 99999;
            background-color: #00A1D6;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 28px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        #followCheckPanel {
            position: fixed;
            bottom: 120px;
            right: 40px;
            z-index: 99999;
            background: #fff;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            display: none;
            width: 260px;
        }
        #followCheckPanel input {
            width: 100%;
            padding: 6px;
            margin-bottom: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        #followCheckPanel button {
            width: 100%;
            padding: 6px;
            background-color: #00A1D6;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #followCheckResult {
            margin-top: 10px;
            font-size: 14px;
            color: #333;
        }
    `);

    const btn = document.createElement('button');
    btn.id = 'followCheckBtn';
    btn.textContent = '🔍';
    document.body.appendChild(btn);

    const panel = document.createElement('div');
    panel.id = 'followCheckPanel';
    panel.innerHTML = `
        <input type="text" id="upName" placeholder="输入UP主昵称或UID">
        <button id="checkBtn">查询关注时间</button>
        <div id="followCheckResult"></div>
    `;
    document.body.appendChild(panel);

    btn.addEventListener('click', () => {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('checkBtn').addEventListener('click', async () => {
        const query = document.getElementById('upName').value.trim();
        const result = document.getElementById('followCheckResult');
        if (!query) {
            result.textContent = '请输入 up 主昵称或 UID';
            return;
        }

        result.textContent = '正在获取登录信息...';

        try {
            const selfRes = await fetch('https://api.bilibili.com/x/web-interface/nav', {
                                        credentials: 'include',
                                        });
            const selfData = await selfRes.json();
            if (selfData.code !== 0) {
                result.textContent = '请先登录 B 站再使用此功能';
                return;
            }
            const myUid = selfData.data.mid;

            let found = null;

            for (let pn = 1; pn <= 80 && !found; pn++) {
                result.textContent = `正在检查第 ${pn} 页...`;

                const followRes = await fetch(
                    `https://api.bilibili.com/x/relation/followings?vmid=${myUid}&pn=${pn}&ps=50`
                , {
                    credentials: 'include',
                  }
                );
                const followData = await followRes.json();

                if (followData.code !== 0) {
                    result.textContent = '⚠️ 请求失败，请稍后再试。';
                    break;
                }

                for (const u of followData.data.list) {
                    if (
                        u.mid.toString() === query ||
                        u.uname.toLowerCase().includes(query.toLowerCase())
                    ) {
                        found = u;
                        break;
                    }
                }

                if (followData.data.list.length < 50) break;
            }

            if (!found) {
                result.textContent = '❌ 未找到该 up 主，可能未关注或昵称不同。';
            } else {
                const time = new Date(found.mtime * 1000).toLocaleString();
                result.innerHTML = `
                    ✅ 你已关注 <b>${found.uname}</b><br>
                    📅 关注时间：${time}
                `;
            }
        } catch (e) {
            result.textContent = '❌ 查询失败，可能网络错误或接口受限。';
            console.error(e);
        }
    });
})();
