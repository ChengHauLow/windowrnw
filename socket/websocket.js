import { Alert } from "react-native";
import manager from "./hub-message.js";
import socketManager from "./hub.js";
import { removeAll, updateToken, updatePage, updateMsgTime } from "../store/GeneralSlice.js";
import { logoutUser, setUser, loginUser } from "../store/UserSlice.js";

// import { sendMessage } from "./apiStock.js";
// Create a global WebSocket object
let currentUserID;
const globalWebSocket = {
  socket: null,
  msgTime: 1,
  token:'',
  url: "ws://192.168.0.8:9089/acc", // Replace with your WebSocket server URL
  // url: "wss://knijrzfkgp.cn/acc",
  // url: "wss://0508sdcs-0fu1e.uzf4-zk3r.com:39006/acc",
  status: false,
  loginStatus: false,
  getStatus() {
    return this.status;
  },
  getloginStatus() {
    return this.loginStatus;
  },
  isTrusted:true,
  SendTimeout:1000 * 3000000,
  ReciveTimeout :1000 * 3000000,
  // Function to connect to the WebSocket server
  connect(storeData, dispatch) {
    if(!storeData) return
    if(this.socket != null){
      this.socket.close();
      this.socket = null;
    }
    this.msgTime = storeData.msgTime;
    this.socket = new WebSocket(this.url);
    // Event listener for WebSocket connection open
    this.socket.onopen = () => {
      console.log('socket opened');
      this.status = true;
      const token = storeData.token;
      const phone = storeData.phone;
      if (token) {
        manager.addMessage(2, {
          cmd: "login",
          status: 1,
          data: { phone: phone, token: token, type: 3, appid: 101 },
        });
      } 
      // else {
      //   setTimeout(() => {
      //     navigate.navigate("Profile");
      //     changeCurrentMenu({
      //         name: "Profile"
      //     })
      //     dispatch(updatePage("Profile"))
      //   }, 1000);
      // }
    };
    this.socket.onclose = () => {
      this.status = false;
      this.loginStatus = false;
      this.socket = null;
      manager.setPubListStatusFalse();
      setTimeout(() => {
        this.connect();
      }, 500);
    };

    this.socket.onerror = (error) => {
      this.status = false;
      this.loginStatus = false;
      console.log("WebSocket error:", error);
      this.socket = null;
      this.connect();
    };
    this.socket.onmessage = (e) => {
      var data = JSON.parse(e.data);
      if (data.cmd === "login") {
        console.log('Receive msg', data);
        if(`${data.response.codeMsg}`.includes('账户密码错误') && data.response.code !== 200){
          Alert.alert(data.response.codeMsg, '请重新输入账户密码');
        }
        if (data.response.code === 200) {
          if (this.msgTime < 2) {
            if (!this.token) {
              // Message({
              //   message: "登录成功!",
              //   type: "success",
              // });
              Alert.alert("登录成功!", '已登入成功');
              this.msgTime = 3
              dispatch(updateMsgTime(3))
            }
          }
          // const token = storeData.token;
          currentUserID = data.response.data.user_id;
          dispatch(updateToken(data.response.data.token))
          dispatch(loginUser({
              name:data.response.data.user_name,
              user_id: data.response.data.user_id
          }))
          // console.log(dispatch(updateToken(data.response.data.token)));
          this.token = data.response.data.token;
          // dispatch(updateDomain(data.response.data.domain))
          // store.dispatch("user/login", data.response.data.token);
          // store.dispatch("user/setDomain", storeData.domain);
          if (!this.token) {
            console.log('no token', token);
            setTimeout(() => {
              // navigate.navigate("Profile");
              // changeCurrentMenu({
              //     name: "Profile"
              // })
              // dispatch(updatePage("Profile"))
              dispatch(logoutUser())
              dispatch(removeAll())
              this.token = ''
            }, 500);
          } 
          // else if (token && storeData.currentPage !== "/login") {
          //   setTimeout(() => {
          //     navigate.navigate(storeData.currentPage);
          //     changeCurrentMenu({
          //         name: storeData.currentPage
          //     })
          //     dispatch(updatePage(storeData.currentPage))
              
          //   }, 500);
          // }
          this.loginStatus = true;
          // loginTimes = parseInt(storeData.msgTime)
          //   ? parseInt(storeData.msgTime)
          //   : 1;
          // if (loginTimes < 2) {
          //   setTimeout(() => {
          //     navigate.navigate("Home");
          //     changeCurrentMenu({
          //         name: "Home"
          //     })
          //     dispatch(updatePage("Home"))
          //   }, 1000);
          // }
        } else {
          console.log('error code for login cmd');
          if(this.loginStatus){
            this.msgTime = 1;
            dispatch(updateMsgTime(1))
            this.loginStatus = false;
            dispatch(logoutUser());
            // store.dispatch("user/logout");
            // removeStore("token");
            dispatch(removeAll())
            this.token = ''
            this.socket.close();
            // this.close()
            // navigate.navigate("Profile");
            // changeCurrentMenu({
            //     name: "Profile"
            // })
            // dispatch(updatePage("Profile"))
            // this.connect();
            manager.subscribe("login", (data) => {});
            manager.subscribe("user", (data) => {});
            manager.subscribe("sms", (data) => {});
            manager.subscribe("trading_status", (data) => {});
            manager.subscribe("home_index", (data) => {});
            manager.subscribe("stock_detail", (data) => {});
            manager.subscribe("stock_ups_and_down_count", (data) => {});
            manager.subscribe("stock_ranking", (data) => {});
            manager.subscribe("stock_industry_concept_ranking", (data) => {});
            manager.subscribe("stock_list", (data) => {});
          }
        }
      } else if (data.cmd === "user") {
        if (data.response.code === 200) {
          if (data.response.data.user_id == currentUserID) {
            dispatch(setUser(data.response.data))
            // store.dispatch("user/getUserInfo", data.response.data);
            socketManager.publish(data.cmd, data);
            // setTimeout(() => {
            //   this.socket.close();
            //   globalWebSocket.connect();
            // },3000)
          }
        } 
        // else {
        //   this.loginStatus = false;
        //   Alert.alert(data.response.codeMsg, data.response.codeMsg);
        //   setTimeout(() => {
        //     // navigate.navigate("Profile");
        //     // changeCurrentMenu({
        //     //     name: "Profile"
        //     // })
        //     // dispatch(updatePage("Profile"))
        //     dispatch(logoutUser())
        //     dispatch(removeAll())
        //   }, 500);
        // }
      } else if (data.cmd === "logout") {
        console.log(data, 'logout');
        this.msgTime = 0;
        this.loginStatus = false;
        this.token = ''
        // if (this.socket) {
        //   this.connect();
        //   manager.subscribe("login", (data) => {});
        //   manager.subscribe("sms", (data) => {});
        // }
        dispatch(logoutUser())
        dispatch(removeAll())
        Alert.alert('已成功退出登入', '已成功退出登入');
      } else {
        socketManager.publish(data.cmd, data);
      }
    };
  },

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.log("WebSocket connection is not open");
      // this.connect()
      this.socket.connect()
    }
  },
  close() {
    if (this.socket) {
      this.close()
      this.socket = null;
    }
  },
};
// Connect to the WebSocket server
globalWebSocket.connect();
manager.subscribe("login", (data) => {});
manager.subscribe("user", (data) => {});
manager.subscribe("sms", (data) => {});
manager.subscribe("trading_status", (data) => {});
manager.subscribe("home_index", (data) => {});
manager.subscribe("stock_detail", (data) => {});
manager.subscribe("stock_ups_and_down_count", (data) => {});
manager.subscribe("stock_ranking", (data) => {});
manager.subscribe("stock_industry_concept_ranking", (data) => {});
manager.subscribe("stock_list", (data) => {});

//无线循环读取待发送消息，如果连接成功切type=1立马发送，type=2登录成功后发送
setInterval(() => {
  var status = globalWebSocket.getStatus();
  if (status) {
    var data = manager.getAllPubList(2);
    if (data && data.data != null) {
      sendMessage(data.data.cmd, data.data.data, data.data.status);
    }
    var loginStatus = globalWebSocket.getloginStatus();
    if (loginStatus) {
      var data = manager.getMessage(1);
      if (data) {
        sendMessage(data.cmd, data.data, data.status);
      }
      var data = manager.getAllPubList(1);
      if (data && data.data != null) {
        sendMessage(data.data.cmd, data.data.data, data.data.status);
      }
    }
    var data = manager.getMessage(2);
    if (data) {
      sendMessage(data.cmd, data.data, data.status);
    }
  }
}, 100);

//每30秒发送一次心跳
setInterval(() => {
  var status = globalWebSocket.getStatus();
  if (status) {
    var loginStatus = globalWebSocket.getloginStatus();
    if (loginStatus) {
      sendMessage("heartbeat", {}, 0);
    }
  }
}, 1000 * 30);
export function sendMessage(cmd, data, status) {
  let sequalizedMsg = {
    seq: generateSeq(),
    cmd: cmd,
    data: data == null ? {} : data,
    status: status == null ? 0 : status,
  };
  return globalWebSocket.send(sequalizedMsg);
}
export function generateSeq() {
  const timestamp = Date.now();
  const randomNum =
    Math.floor(Math.random() * 10000).toString() +
    "-" +
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
  return `${timestamp}${randomNum}`;
}
// Export the globalWebSocket object to be used in other files
export default globalWebSocket;
