class MessageManager {
    constructor() {
        this.messages = [];
        this.subscriptions = new Map();
    }
    /**
     * 订阅指定的消息类型
     * @param {string} messageType - 消息类型
     * @param {Function} callback - 消息回调函数
     */
    subscribe(messageType, callback) {
        this.subscriptions.set(messageType, { callback: callback, type: messageType, status: false, data: null });
    }
    /** 
     * 添加消息
     * @param {int} messageType - 消息类型 1.需要登录 2.不需要登录
     * @param {object} data - 消息数据
     */
    addMessage(messageType, data) {
        console.log(messageType, data, 'addMessage');
        if (data.status === 1) {
            if (this.subscriptions.has(data.cmd)) {
                const message = this.subscriptions.get(data.cmd);
                this.subscriptions.set(data.cmd, {
                    callback: message.callback,
                    type: messageType,//消息类型 1.需要登录 2.不需要登录
                    status: false,//是否发送 true 已发送 false 未发送
                    data: data,//消息数据
                });
                message.callback({
                    type: messageType,//消息类型 1.需要登录 2.不需要登录
                    status: false,//是否发送 true 已发送 false 未发送
                    data: data,//消息数据
                })
            }else if(!this.subscriptions.has(data.cmd)){
                this.subscribe(data.cmd, (data)=>{})
                this.addMessage(messageType, data)
            }
        } else {
            this.messages.push({
                type: messageType,
                data: data
            });
        }
    }
    //获取subscriptions status=false未发生的消息
    getAllPubList(type) {
        for (const [key, value] of this.subscriptions.entries()) {
            if (value.status === false && value.type === type) {
                this.subscriptions.get(key).status = true;
                return value
            }
        }
    }

    setPubListStatusFalse() {
        for (const [key, value] of this.subscriptions.entries()) {
            this.subscriptions.get(key).status = false;
        }
    }
    /**
     * 获取消息并删除
     * @param {int} messageType - 消息类型 1.需要登录 2.不需要登录
     * @return {object} - 消息类型数组
     */
    getMessage(messageType) {
        let index = this.messages.findIndex(item => item.type === messageType);
        if (index === -1) {
            return null;
        }
        let data = this.messages[index];
        this.messages.splice(index, 1);
        return data.data;
    }
    /**
     * 取消订阅
     * @return {object} - 消息类型数组
     */
}

// 创建一个MessageManager实例
const manager = new MessageManager();

// 添加消息类型
// manager.addMessage('notification', true, true, false);
// manager.addMessage('chat', true, true, true);
// manager.addMessage('announcement', false, false, true);

export default manager;
