import {combineReducers} from "redux";
import {userReducer} from "./registeration";
import {linkReducer} from "./link";
import {messageListReducer} from "./messageList";
import {userListReducer} from "./userList";
import {adminListReducer} from "./adminList";
import {notificationReducer} from "./notification";
import {adminDashboard} from "./adminDashboard";
import {qrCode} from "./qrCode";
import {loadingReducer} from "./loading";
import {postReducer} from "./post";

export const RootReducer=combineReducers({
    userReducer,
    linkReducer,
    messageListReducer,
    userListReducer,
    adminListReducer,
    notificationReducer,
    adminDashboard,
    qrCode,
    loadingReducer,
    postReducer
});
