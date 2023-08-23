(async function () {
  // 验证是否有登录，如果没有登录，跳转到登录页，如果有登录，获取到登录的用户信息
  const resp = await API.profile();
  const user = resp.data;
  if (!user) {
    alert('未登录或登录已过期，请重新登录');
    location.href = './login.html';
    return;
  }

  const doms = {
    aside: {
      nickname: $('#nickname'),
      loginId: $('#loginId'),
    },
    close: $('.close'),
    chatContainer: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    msgContainer: $('.msg-container'),
  };
  // 下面的代码环境，一定是登录状态
  setUserInfo();

  // 注销事件
  doms.close.onclick = function () {
    API.loginOut();
    location.href = './login.html';
  };

  // 加载历史记录
  await loadHistory();
  async function loadHistory() {
    const resp = await API.getHistory();
    for (const item of resp.data) {
      addChat(item);
    }
    scrollBottom();
  }

  // 发送消息事件
  doms.msgContainer.onsubmit = function (e) {
    e.preventDefault();
    sendChat();
  };

  // 设置用户信息
  function setUserInfo() {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
  }

  // 根据消息对象，将其添加到页面中
  /*
  content: "你几岁啦？"
  createdAt: 1651213093992
  from: "haha"
  to: null
  */
  function addChat(chatInfo) {
    const div = $$$('div');
    div.classList.add('chat-item');
    if (chatInfo.from) {
      div.classList.add('me');
    }
    const img = $$$('img');
    img.className = 'chat-avatar';
    img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

    const content = $$$('div');
    content.className = 'chat-content';
    content.innerText = chatInfo.content;

    const date = $$$('div');
    date.className = 'chat-date';
    date.innerText = formatDate(chatInfo.createdAt);

    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);

    doms.chatContainer.appendChild(div);
  }

  // 让聊天区域的滚动条滚动到底
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  async function sendChat() {
    const content = doms.txtMsg.value.trim();
    if (!content) {
      return;
    }
    addChat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content,
    });
    doms.txtMsg.value = '';
    scrollBottom();
    const resp = await API.sendChat(content);
    addChat({
      from: null,
      to: user.loginId,
      ...resp.data,
    });
    scrollBottom();
  }
  window.sendChat = sendChat;

  // 下面的代码是退出登录的代码，课堂上忘讲了，很简单，看看注释就行
  // 给关闭的div注册点击事件
  doms.close.onclick = function () {
    API.loginOut(); // 退出登录
    location.href = './login.html'; // 跳转到登录页
  };
})();
