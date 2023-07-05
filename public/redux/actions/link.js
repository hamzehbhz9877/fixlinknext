import {deleteLink, getAllLink} from "../../services/shortlink";
import { SuccessMessage} from "./tosastify";


export const GetAllLink = (id,value) => async dispatch => {
    try {
        const res = await getAllLink(id,value);
        const data = res.data.data.links.map(link => {
                return {...link, tooltipOpen: false}
            }
        );
       await dispatch({type: "INITIAL", payload: {links: data, pages: res.data.data.pages}})
    } catch (e) {

    }

}

export const ClipBoard = (linkId) => async (dispatch, getState) => {
    const allLink = {...getState().linkReducer};
    const res = allLink.links.map(data => {
        if (data.shortLink === linkId) {
            return {...data, tooltipOpen: !data.tooltipOpen}
        }
        return data
    });
   await dispatch({type: "INITIAL", payload: {...allLink, links: res}})
}

export const DeleteLink = (linkId) => async (dispatch, getState) => {
    const allLink = {...getState().linkReducer};

    let updateAllLink = [...allLink.links];

    const filter = updateAllLink.filter(link => link.shortLink !== linkId);

    updateAllLink = [...filter];

    try {
       await dispatch({type: "DELETE_LINK", payload: {...allLink, links: updateAllLink}});
        const res = await deleteLink(linkId);

        if (res.data.statusCode === 0) {
           await dispatch(SuccessMessage("لینک با موفقیت حذف شد"))
        }
    } catch (e) {
       await dispatch({type: "DELETE_LINK", payload: {allLink}});
    }
};

