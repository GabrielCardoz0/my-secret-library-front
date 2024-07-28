import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.15.9:4000",
    headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.VgMHGFBONRy2IgDja008N4ZBpGXa_WCd-iYBhV1LE3I"
    }
});