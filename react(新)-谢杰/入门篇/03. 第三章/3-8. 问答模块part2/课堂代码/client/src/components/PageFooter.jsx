import React from 'react';

function PageFooter(props) {
    return (
        <div>
            <p className="links">
                <span className="linkItem">友情链接：</span>
                <a
                    href="https://duyi.ke.qq.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    渡一教育-腾讯课堂
                </a>
                <a
                    href="http://www.yuanjin.tech/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    袁进的博客
                </a>
                <a
                    href="http://yanhongzhi.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    Mr.Yan
                </a>
                <a
                    href="https://blog.csdn.net/jackfrued"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    骆昊的技术专栏
                </a>
            </p>
            <p>© 2022 - Coder Station</p>
            <p>Powered by Create React App</p>
        </div>
    );
}

export default PageFooter;