import React, {useState} from 'react';
import Paginate from "../../../public/components/utils/pagination";
import ReactHtmlParser, {convertNodeToElement, processNodes} from "react-html-parser";
import NoInfo from "../../../public/components/noinfoTabel/noInfo";
import _ from "lodash";
import {useRouter} from "next/router";

const Index = ({data}) => {

    const router = useRouter();
    const [currPage, setCurrent] = useState(1);

    const handleCurrent = (page) => {
        window.scrollTo(0, 0);
        router.push("/notification/[id]", `/notification/${page}`)
        setCurrent(page)
    }
    const handleNext = () => {
        window.scrollTo(0, 0);
        router.push("/notification/[id]", `/notification/${(parseInt(router.query.id) + 1).toString()}`)
        setCurrent(currPage + 1)
    };
    const handlePrev = () => {
        window.scrollTo(0, 0);
        router.push("/notification/[id]", `/notification/${(parseInt(router.query.id) - 1).toString()}`)
        setCurrent(currPage - 1)
    }

    function transform(node, index) {
        // return null to block certain elements
        // don't allow <span> elements
        if (node.type === "tag" && node.name === "span") {
            return null;
        }

        // Transform <ul> into <ol>
        // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
        if (node.type === "tag" && node.name === "ul") {
            node.name = "ol";
            return convertNodeToElement(node, index, transform);
        }

        // return an <i> element for every <b>
        // a key must be included for all elements
        if (node.type === "tag" && node.name === "b") {
            return <i key={index}>{processNodes(node.children, transform)}</i>;
        }

        // all links must open in a new window
        if (node.type === "tag" && node.name === "a") {
            node.attribs.target = "_blank";
            return convertNodeToElement(node, index, transform);
        }
    }

    const options = {
        decodeEntities: true,
        transform
    };
    return (
        <>
            <section className="notification">
                {data.notifications.length!==0 ? data.notifications.map((item, index) => {
                        return (
                            <div key={index} className="notification-card card col-md-7 mx-auto">
                                <div className="notification-content">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <h4 className="notification-title">
                                            <strong>
                                                {item.title}
                                            </strong>
                                        </h4>
                                        <span>
                                            {item.createAtPersian}
                                        </span>
                                    </div>
                                </div>
                                <div className="nnn">{ReactHtmlParser(item.text, options)}</div>
                            </div>
                        )
                    }
                ):<NoInfo/>}
                {
                    (data.pages && data.pages > 1) ?
                        <Paginate pageNumber={data.pages} handleCurrentPage={handleCurrent}
                                  nextPage={handleNext}
                                  prevPage={handlePrev}
                                  currentPage={currPage}
                        /> : ""
                }
            </section>
        </>
    );
};

export async function getServerSideProps({params}) {
    const res = await fetch(`https://fixLink.ir/api/v1/Notification/GetAllNotification/${params.id}`);
    const {data} = await res.json();

    return {props: {data}}
}

export default Index;