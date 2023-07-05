import {realUrl} from "../../services/shortlink";
import {useEffect} from "react";

const RedirectLink = ({match,history}) => {

    useEffect(() => {
        getDate()
    }, []);

    const getDate = async () => {
        try {
            const res = await realUrl({shortLink: match.params.idUrl});
            ;
            if (res.data.data.statusRedirect === 0) {
                window.location=`${res.data.data.redirectLink}`;
            } else {
                history.replace(`/notfound`);
            }
        } catch (e) {
        }
    }

    return null;
};

export default RedirectLink;