import axios from "axios";
import {HideLoading, ShowLoading} from "../redux/actions/loading";

axios.defaults.baseURL = "https://www.fixLink.ir";

export const Intercept = ({dispatch}) => {
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        config.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`
        }

        if (config.url !== "/api/v1/Home/HomeInfo")
            dispatch(ShowLoading());

        return config;
    }, function (error) {
        dispatch(HideLoading());
        return Promise.reject(error);
    });

    axios.interceptors.response.use(res => {
        dispatch(HideLoading());
        return res
    }, error => {
        dispatch(HideLoading());

        if (error.response.status === 401) {
            localStorage.clear();
            window.location.replace("/login")
        }
        if (error.response.status === 403) {
            window.location.replace("/accessDenied")
        }
        if (error.response.status === 500) {
            //nothing happening here
        }
        return Promise.reject(error);
    });
};


