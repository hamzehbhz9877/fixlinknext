import React, {useMemo, useState} from 'react';
import {dailyData, monthlyData, weeklyData, yearlyData} from "../../../../public/services/shortlink";
import {SuccessMessage} from "../../../../public/redux/actions/tosastify";
import {useDispatch} from "react-redux";
import {Field, Form, Formik} from "formik";
import Input from "../../../../public/components/utils/formik/input";
import * as Yup from "yup";
import dynamic from "next/dynamic";

const BarChart = dynamic(
    () => import('../../../../public/components/chart/barChart'),
    {
        ssr: false
    }
);

const Index = () => {

    const [dataRes, setDataRes] = useState([]);
    const [select, setSelect] = useState("");
    const dispatch = useDispatch();


    const data = useMemo(() => {
        let labelR = [];
        if (dataRes) {
            if (select === "0") {
                labelR = dataRes.map(data => data.hour)
            } else if (select === "1") {
                labelR = dataRes.map(data => data.day + " " + (data.date))
            } else if (select === "2") {
                labelR = dataRes.map(data => data.date)
            } else {
                labelR = dataRes.map(data => data.month + " " + (data.date))
            }
        }
        return (
            {
                labels: labelR,
                datasets: [
                    {
                        label: "تعداد بازدید",
                        data: dataRes.map(data => data.value),
                        borderColor: dataRes.map(data => '#EAD727'),
                        backgroundColor: dataRes.map(data => '#EAD727'),
                    }

                ]
            }
        )
    }, [dataRes]);



    const options = useMemo(() => {
        return (
            {
                responsive: true,
                maintainAspectRatio: false,
                responsiveAnimationDuration: .5,
                title: {
                    display: true,
                    text: "نمودار وضعیت لینک",
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
            }
        )
    }, [dataRes])


    const getDailyData = async (link) => {
        try {
            const res = await dailyData(link);
            if (res.data.data === null) {
                dispatch(SuccessMessage("آماری برای این لینک وجود ندارد"))
                return
            }
            setDataRes(res.data.data)
        } catch (e) {

        }
    };
    const getWeeklyData = async (link) => {
        try {
            const res = await weeklyData(link);
            if (res.data.data === null) {
                dispatch(SuccessMessage("آماری برای این لینک وجود ندارد"))
                return
            }
            setDataRes(res.data.data);
        } catch (e) {

        }
    };
    const getMonthlyData = async (link) => {
        try {
            const res = await monthlyData(link);
            if (res.data.data === null) {
                dispatch(SuccessMessage("آماری برای این لینک وجود ندارد"))
                return
            }
            setDataRes(res.data.data)
        } catch (e) {

        }
    };
    const getYearlyData = async (link) => {
        try {
            const res = await yearlyData(link);
            if (res.data.data === null) {
                dispatch(SuccessMessage("آماری برای این لینک وجود ندارد"))
                return
            }
            setDataRes(res.data.data)
        } catch (e) {

        }
    };

    const handelSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        const {statistics, searchStatistics} = values;
        setSelect(statistics);
        if (statistics === "0") {
            getDailyData(searchStatistics.split(".ir/")[1])
        } else if (statistics === "1") {
            getWeeklyData(searchStatistics.split(".ir/")[1])
        } else if (statistics === "2") {
            getMonthlyData(searchStatistics.split(".ir/")[1])
        } else {
            getYearlyData(searchStatistics.split(".ir/")[1])
        }
    };


    const initialValues = {
        searchStatistics: '',
        statistics: '0'
    };

    const validationSchema = Yup.object({
        searchStatistics: Yup.string().url("لینک وارد شده نامعتبر میباشد").required('لطفا فیلد مورد نظر خود را را وارد کنید').trim(),
    });
    return (
        <>
            <section className="d-flex justify-content-between flex-wrap align-items-center search-wrapper">
                <div>
                    <h3>آمار لینک های شما</h3>
                    <p>در این قسمت شما میتوانید آمار دقیق لینک های
                        قرار داده شده را مشاهده کنید</p>
                </div>
                <div className="search-filter card">
                    <Formik initialValues={initialValues}
                            onSubmit={handelSubmit}
                            validationSchema={validationSchema}>
                        {(props) =>
                            (
                                <Form>
                                    <Input name="searchStatistics" type="url" label="لینک کوتاه"/>
                                    <div className="d-flex sed">
                                        <Field as="select" name="statistics" className="custom-select">
                                            <option value="0">آمار امروز</option>
                                            <option value="1">آمار هفتگی</option>
                                            <option value="2">آمار ماهیانه</option>
                                            <option value="3">آمار سالیانه</option>
                                        </Field>
                                        <div className="btn-search-panel">
                                            <button type="submit" style={{fontSize: "13px"}}
                                                    className="btn bt-filter">اعمال فیلتر
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </div>
            </section>
            <section className={dataRes.length !== 0 ? "chart card text-center" : "no-info card text-center"}>
                {
                    dataRes.length !== 0 ? <BarChart data={data} options={options}/>
                        : <p>اطلاعاتی موجود نیست</p>
                }
            </section>
        </>
    );
};

export default Index;