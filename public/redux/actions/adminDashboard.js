import {dashboardWeaklyData} from "../../services/shortlink";
import {ErrorMessage} from "./tosastify";

export const GetAdminDashboardData = () => async dispatch =>{
    try {
        const res = await dashboardWeaklyData();
        console.log(res)
        if (res.data.statusCode === 0) {
            const {
                countPermanentLink, countTemporaryLink, countUsers,
                countLinkWeeklies, countBotLinkWeeklies
            } = res.data.data;
            dispatch({
                type: "GET_DATA", payload: {
                    dataR: {countPermanentLink, countTemporaryLink, countUsers},
                    dataResLine: countLinkWeeklies,
                    dataResBot: countBotLinkWeeklies
                }
            })
        } else {
            dispatch(ErrorMessage(res.data.Message))
        }
    } catch (e) {
    }
};