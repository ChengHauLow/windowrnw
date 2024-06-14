import manager from './hub-message.js'

// 登录请求
export function sendMessage(type, data) {
    console.log('sent Msg', data);
    return manager.addMessage(type, data);
}
