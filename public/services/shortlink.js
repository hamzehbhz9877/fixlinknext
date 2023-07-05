import axios from "axios"

export const sendUrl = url => axios.post('/api/v1/Link/GenerateLink', JSON.stringify(url));
export const realUrl = shortLink => axios.post('/api/v1/Link/ReDirectLink', JSON.stringify(shortLink));
export const shortViewerLink = shortLinkViewer => axios.get(`/api/v1/LinkVisit/GetLinkVisit/${shortLinkViewer}`);
export const getAllLink = (id, search) => axios.get(`/api/v1/Link/GetAllLink/${id}/${search}`);
export const toggleActiveLink = (id) => axios.get(`/api/v1/Link/ChangeActivation/${id}`);
export const dailyData = (id) => axios.get(`/api/v1/LinkVisit/GetDailyLinkVisit/${id}`);
export const weeklyData = (id) => axios.get(`/api/v1/LinkVisit/GetWeeklyLinkVisit/${id}`);
export const monthlyData = (id) => axios.get(`/api/v1/LinkVisit/GetMonthlyLinkVisit/${id}`);
export const yearlyData = (id) => axios.get(`/api/v1/LinkVisit/GetYearlyLinkVisit/${id}`);
export const deleteLink = (id) => axios.get(`/api/v1/Link/DeleteLink/${id}`);


//redirect
export const redirectLink = (id) => axios.get(`/api/v1/Link/DeleteLink/${id}`);
//contactUs
export const contactUs = (data) => axios.post("/api/v1/ContactUs/CreateContactUs", JSON.stringify(data));
export const getAllMessageList = (id, search) => axios.get(`/api/v1/ContactUs/GetAllContactUs/${id}/${search}`);
export const deleteMessageList = (id) => axios.get(`/api/v1/ContactUs/DeleteContactUs/${id}`);

//userList
export const getAllUsers = (id, search) => axios.get(`/api/v1/User/GetAllUser/${id}/${search}`);
export const toggleActiveUsers = (id) => axios.get(`/api/v1/User/DeActiveUser/${id}`);
export const deleteUsers = (id) => axios.get(`/api/v1/User/DeleteUser/${id}`);
export const changePasswordUsers = (data) => axios.post("/api/v1/User/ChangePasswordUser", JSON.stringify(data));

//adminList
export const getAllAdminList = () => axios.get("/api/v1/Admin/GetAllAdminUser");
export const deleteAdminList = (id) => axios.get(`/api/v1/Admin/DeleteUser/${id}`);
export const addNewAdminList = (data) => axios.post("/api/v1/Admin/CreateAdminUser",JSON.stringify(data))
export const toggleAdminList = (id) => axios.get(`/api/v1/Admin/DeActiveUser/${id}`);

//logout
export const logoutUser = () => axios.get("/api/v1/Account/LogOut");

//statistics
export const statistics = () => axios.get("/api/v1/Home/HomeInfo");

//changePassword
export const changePassword = (data) => axios.post("/api/v1/Account/ChangePassword", JSON.stringify(data));

//dashboardWeaklyDataA
export const dashboardWeaklyData = () => axios.get("/api/v1/Admin/GetInfoDashboard");


//confirmEmail
export const confirmEmail=(data)=>axios.post(`/api/v1/Account/ConfirmEmail`,JSON.stringify(data));

//forgetPassword
export const forgetPassword=(data)=>axios.post("/api/v1/Account/ForgotPassword",JSON.stringify(data));
export const submitForgetPassword=(data)=>axios.post("/api/v1/Account/ForgotPasswordSubmit",JSON.stringify(data));

//get qr code
export const getAllQrCode = (id, search) => axios.get(`/api/v1/Link/GetAllLinkWithQr/${id}/${search}`);

//notification
export const getAllNotification = (id,search) => axios.get(`/api/v1/Notification/GetAllNotification/${id}/${search}`);
export const editNotification = (data) => axios.post(`/api/v1/Notification/EditNotification`,JSON.stringify(data));
export const deleteNotification = (id) => axios.get(`/api/v1/Notification/DeleteNotification/${id}`);
export const createNotification = (data) => axios.post(`/api/v1/Notification/CreateNotification`,JSON.stringify(data));
