import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GetAdminDashboardData} from "../../../public/redux/actions/adminDashboard";
import _ from "lodash"
import dynamic from "next/dynamic";

const LineChart = dynamic(
    () => import('../../../public/components/chart/lineChart'),
    {
        ssr: false
    }
);

const Index = () => {
    const state = useSelector(state => state.adminDashboard);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAdminDashboardData())
    }, []);


    const data = {
        labels: state.dataResLine.map(data => data.day),
        datasets: [
            {
                label: "فعالیت کل سایت",
                data: state.dataResLine.map(data => data.value),
                borderColor: 'rgb(54,162,235)',
                backgroundColor: "transparent",
            },
            {
                label: 'فعالیت بات',
                data: state.dataResBot.map(data => data.value),
                borderColor: 'rgba(235,21,26,0.71)',
                backgroundColor: "transparent",
            },
        ]
    };



    const options = {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: .5,
        title: {
            display: true,
            text: "نمودار لینک های کوتاه شده در هفته اخیر",
            fontColor: 'rgb(219,219,219)',
            fontFamily: "BYekan",
            fontSize: "14"
        },
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(219, 219, 219,.2)'
                    },
                    ticks: {
                        fontSize: 15,
                        fontColor: 'rgb(219,219,219)',
                        fontFamily: "BYekan",
                        callback: (value, index, values) => {
                            return '' + value;
                        }
                    }
                }
            ],
            xAxes: [
                {
                    gridLines: {
                        color: 'rgb(219, 219, 219,.2)',

                    },
                    ticks: {
                        fontColor: 'rgb(219,219,219)',
                        fontFamily: "BYekan",
                    }
                }
            ]
        },
        tooltips: {
            displayColors: true,
            backgroundColor: "black",
            enabled: true,
            mode: "single",
            // bodyFontSize: 15,
            // bodyFontFamily: "Gamja Flower",
            bodyFontColor: 'rgb(219,219,219)',
            bodyFontFamily: "BYekan",
            titleFontColor: 'rgb(219,219,219)',
            titleFontFamily: "BYekan",
            yPadding: 5,
            xPadding: 15,
            cornerRadius: 4,
            // bodyFontStyle: "bold",
            callbacks: {
                title: (data) => {
                    return data[0].xLabel;
                },
                // label: (tooltipItems, data) => {
                //     return console.log(tooltipItems,data);
                // }
            }
        },
        animation: {
            duration: "1000"
        },
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(219,219,219)',
                fontFamily: "BYekan",
            }
        }
    };

    return (
        <>
            <section className="dashboard">
                <div className="card-list">
                    <div className="card dashboard-card">
                        <div className="card-body ">
                            <h6 className="card-title">تعداد لینک های کوتاه شده موقت</h6>
                            <p className="card-text">{!_.isEmpty(state.dataR) ? state.dataR.countTemporaryLink : "..."}</p>
                        </div>
                    </div>
                    <div className="card dashboard-card">
                        <div className="card-body ">
                            <h6 className="card-title">تعداد کاربران</h6>
                            <p className="card-text">{!_.isEmpty(state.dataR) ? state.dataR.countUsers : "..."}</p>
                        </div>
                    </div>
                    <div className="card dashboard-card">
                        <div className="card-body ">
                            <h6 className="card-title">تعداد لینک های کوتاه شده دائمی</h6>
                            <p className="card-text">{!_.isEmpty(state.dataR) ? state.dataR.countPermanentLink : "..."}</p>
                        </div>
                    </div>
                </div>
                <section
                    className={!_.isEmpty(state.dataR) || state.dataResBot.length !== 0 || state.dataResLine.length !== 0 ? "chart card text-center" : "no-info card text-center"}>
                    {
                        !_.isEmpty(state.dataR) || state.dataResBot.length !== 0 || state.dataResLine.length !== 0 ?
                            <LineChart data={data} options={options}/>
                            : <p>...</p>
                    }
                </section>
            </section>
        </>
    );
};

export default Index;