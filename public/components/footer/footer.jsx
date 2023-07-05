import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="telegram-robot">
                    <i className="fab fa-telegram"/>
                    <a href="https://t.me/fixlinkbot" rel="noreferrer" target="_blank">
                        &nbsp;ربات تلگرام
                    </a>
                </div>
                <div>
                <span className="copyright text-white">کلیه حقوق متعلق به
                    &nbsp;
                    <a target="_blank" href="http://www.hashsharp.ir">هشتگ شارپ</a>
                    &nbsp;
                    می باشد
                </span>
                </div>
            </div>
            <img src="/images/footerImg.svg" alt="footerImage"/>
        </footer>
    );
};

export default Footer;