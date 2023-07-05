import {applyMiddleware, compose, createStore} from "redux";
import {RootReducer} from "./../reducer/index";
import thunk from "redux-thunk";
import Loading from "../../components/utils/loading/loading";
import {useSelector} from "react-redux";

export const store = createStore(
    RootReducer,
    compose(
        applyMiddleware(thunk)
    )
);


const Loader = () => {
    const state = useSelector(state => state.loadingReducer)
    return state && <Loading/>
}

export default Loader