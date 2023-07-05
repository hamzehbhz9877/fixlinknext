import Document, {Head, Html, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang="fa-IR" dir="rtl">

                <Head>
                    <meta name="description"
                          content="فیکس لینک بهترین سرویس کوتاه کننده لینک رایگان است که لینک های طولانی رو به لینک های دلخواه و کوتاه تبدیل میکند تا شما لینک را به راحتی به اشتراک بگذارید"/>
                    <meta name="googlebot" content="INDEX, FOLLoW"/>
                    <meta name="keywords" content="کوتاه کننده لینک, کوتاه کننده آدرس, لینک کوتاه کن"/>
                    <meta name="googlebot" content="index,follow"/>
                    <meta name="robots" content="noodp,noydir"/>
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta property="og:site_name"/>
                    <meta property="og:title" content="کوتاه کننده لینک | fixlink.ir"/>
                    <meta property="og:url" content="https://fixlink.ir/"/>
                    <meta property="og:locale" content="fa_IR"/>
                    <meta name="twitter:card" content="summary"/>
                    <meta name="twitter:title"
                          content="کوتاه کننده لینک | fixlink.ir"/>
                    <meta name="twitter:description"
                          content="فیکس لینک بهترین سرویس کوتاه کننده لینک رایگان است که لینک های طولانی رو به لینک های دلخواه و کوتاه تبدیل میکند تا شما لینک را به راحتی به اشتراک بگذارید"/>
                    <meta itemProp="description"
                          content="فیکس لینک بهترین سرویس کوتاه کننده لینک رایگان است که لینک های طولانی رو به لینک های دلخواه و کوتاه تبدیل میکند تا شما لینک را به راحتی به اشتراک بگذارید"/>
                    <meta property="og:description"
                          content="فیکس لینک بهترین سرویس کوتاه کننده لینک رایگان است که لینک های طولانی رو به لینک های دلخواه و کوتاه تبدیل میکند تا شما لینک را به راحتی به اشتراک بگذارید"/>
                    <base href="%PUBLIC_URL%/"/>
                    <link rel="stylesheet"
                          href="/static/css/bootstrap-rtl.min.css"/>
                    <link rel="stylesheet"
                          href="/static/css/main.css"/>
                    <link rel="stylesheet"
                          href="/static/css/style.css"/>
                    <link rel="stylesheet" href="/static/css/dropDownMenu.css"/>
                    <link rel="stylesheet" href="/static/css/footer.css"/>
                    <link rel="stylesheet" href="/static/css/alert.css"/>
                    <link rel="stylesheet" href="/static/css/header.css"/>
                    <link rel="stylesheet" href="/static/css/panel.css"/>
                    <link rel="stylesheet" href="/static/css/sideBar.css"/>
                    <link rel="stylesheet" href="/static/css/texteditor.css"/>
                    <link rel="stylesheet" href="/static/css/backdrop.css"/>
                </Head>
                <body className="rtl">
                <Main/>
                <script src="https://cdn.ckeditor.com/ckeditor5/23.1.0/classic/translations/fa.js" defer/>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
                      crossOrigin="anonymous"/>
                <script src="/static/js/dropdown.js"/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument