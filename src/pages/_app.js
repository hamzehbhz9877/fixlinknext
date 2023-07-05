import {useEffect} from "react";

import Loader, {store} from "../../public/redux/store";
import {Provider, useDispatch} from 'react-redux'
import {AddUser} from "../../public/redux/actions/user";
import MainLayout from "../../public/components/layout/mainLayout";
import Notification from "../../public/components/utils/alert/alert";
import {Intercept} from "../../public/services/httpService";
import {useRouter} from "next/router";
import Panels from "../../public/components/layout/panels";
import {UserItems} from "../../public/components/panelsSidebar/navItems/userItems";
import {AdminItems} from "../../public/components/panelsSidebar/navItems/adminItems";
import Head from "next/head";

Intercept(store);

const App = ({Component, pageProps}) => {

    const router = useRouter();


    const Route = () => {
        let res;
        if (router.pathname.startsWith("/userPanel")) {
            res = <Panels items={UserItems}>
                <Component {...pageProps} />
            </Panels>
        } else if (router.pathname.startsWith("/adminPanel")) {
            res = <Panels items={AdminItems}>
                <Component {...pageProps} />
            </Panels>
        } else {
            res = <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        }
        return res;
    };

    return (
        <Provider store={store}>
            <Head>
                <meta name="viewport"
                      content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no"/>
            </Head>
            {Route()}
            <Auth/>
            <Notification/>
            <Loader/>
        </Provider>
    )
};


const Auth = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const user = localStorage.getItem("user");
        dispatch(AddUser({username: user}))
    }, []);

    return null
};

export default App