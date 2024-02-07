import axios from "axios";
import { IP } from "../constants/ip";

export const login =
    (email: string, password: string) => async (dispatch: any) => {
        try {
            dispatch({ type: "loginRequest" });

            const { data } = await axios.post(
                `${IP}/user/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            dispatch({ type: "loginSuccess", payload: data });
        } catch (error: any) {
            dispatch({
                type: "loginFailure",
                payload: error.response.data.message,
            });
        }
    };

export const loadUser = () => async (dispatch: any) => {
    try {
        dispatch({ type: "loadUserRequest" });

        const { data } = await axios.get(`${IP}/user/me`);

        dispatch({ type: "loadUserSuccess", payload: data });
    } catch (error: any) {
        dispatch({
            type: "loadUserFailure",
            payload: error.response.data.message,
        });
    }
};

export const reloadUser = () => async (dispatch: any) => {
    try {
        dispatch({ type: "reloadUserRequest" });

        const { data } = await axios.get(`${IP}/user/me`);

        dispatch({ type: "reloadUserSuccess", payload: data });
    } catch (error: any) {
        dispatch({
            type: "reloadUserFailure",
            payload: error.response.data.message,
        });
    }
};

export const signup =
    (name: string, email: string, password: string) =>
    async (dispatch: any) => {
        try {
            dispatch({ type: "signupRequest" });

            const { data } = await axios.post(
                `${IP}/user/signup`,
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            dispatch({ type: "signupSuccess", payload: data });
        } catch (error: any) {
            dispatch({
                type: "signupFailure",
                payload: error.response.data.message,
            });
        }
    };

export const verifyOtp = (otp: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "otpRequest" });

        const { data } = await axios.post(
            `${IP}/user/verify`,
            { otp },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({ type: "otpSuccess", payload: data });
    } catch (error: any) {
        dispatch({ type: "otpFailure", payload: error.response.data.message });
    }
};

export const logout = () => async (dispatch: any) => {
    try {
        await axios.get(`${IP}/user/logout`);

        dispatch({ type: "logoutSuccess" });
    } catch (error: any) {
        dispatch({
            type: "logoutFailure",
            payload: error.response.data.message,
        });
    }
};
