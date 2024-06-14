/**
 * socket消息订阅管理器
 * 用于管理socket消息的订阅和取消订阅
 */
class SocketSubscriptionManager {
  /**
   * 创建一个新的SocketSubscriptionManager实例
   */
  constructor() {
    this.subscriptions = new Map();
  }

  /**
   * 订阅指定的消息类型
   * @param {string} messageType - 消息类型
   * @param {Function} callback - 消息回调函数
   */
  subscribe(messageType, callback, status) {
    console.log('subscribe', messageType, callback);
    if (!this.subscriptions.has(messageType)) {
      this.subscriptions.set(messageType, []);
    }
    this.subscriptions.get(messageType).push(callback);
    if (status) {
      // if (!this.subscriptions.has(messageType)) {
      //     this.subscriptions.set(messageType, []);
      //     this.subscriptions.get(messageType).push(callback);
      // } else {
      //     this.unsubscribe(messageType, callback);
      //     this.subscriptions.set(messageType, []);
      //     this.subscriptions.get(messageType).push(callback);
      // }
      // if (status) {
      //     this.subscriptions.get(messageType).push(callback);
    }
  }

  /**
   * 取消订阅指定的消息类型
   * @param {string} messageType - 消息类型
   * @param {Function} callback - 消息回调函数
   */
  unsubscribe(messageType, callback) {
    if (this.subscriptions.has(messageType)) {
      const callbacks = this.subscriptions.get(messageType);
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1); //删除指定的回调函数
      }
    }
  }
  /**
   * 推送消息
   * @param {string} messageType - 消息类型
   * @param {any} data - 消息数据
   */
  publish(messageType, data) {
    if (this.subscriptions.has(messageType)) {
      const callbacks = this.subscriptions.get(messageType);
      callbacks.forEach((callback) => callback(data));
    }
  }
}

// 创建一个SocketSubscriptionManager实例
const socketManager = new SocketSubscriptionManager();

// 订阅一个事件
// socketManager.subscribe('message', (data) => {
//     console.log('Received message:', data);
// });

// 取消订阅一个事件
// socketManager.unsubscribe('message', (data) => {

// });

//用户发送登录请求->pub推送消息->判断消息是直接发送还是发送订阅websocket->判断是否连接->处理消息类型（1免登录，2登录）->发送消息
// 推送消息
// socketManager.publish('message', 'Hello, world!');
// socketManager.publish('message', 'Hello, world!');
// socketManager.publish('message', 'Hello, world!');
// socketManager.publish('message', 'Hello, world!');
export default socketManager;
