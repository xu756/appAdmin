import {history} from "@umijs/max";
import {InitState, UserState} from "@/models/init";
import User from "@/services/user";
import {message} from "antd";


export default function (state: InitState) {
    if (history.location.pathname == '/login') {
        return {
            user: false,
        }
    }
    if (state.user?.id == 0) {
        return {
            user: false,
        }
    }
    return {
        user: true,
        public: false
    };

}
