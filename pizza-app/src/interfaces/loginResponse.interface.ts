import { NavigateFunction } from "react-router-dom";

export interface LoginResponse {
    access_token: string;
    navigate?: NavigateFunction
}