import React from 'react';
import { Card, Carousel } from "antd";
import RecommendItem from "./RecommendItem";
import styles from "../css/Recommend.module.css"

/**
 * 右侧的推荐组件
 */
function Recommend(props) {
    return (
        <Card title="推荐内容">
            {/* 上方轮播图 */}
            <div style={{ marginBottom: 20 }}>
                <Carousel autoplay>
                    <div>
                        <a style={{
                            background: 'url(https://image-static.segmentfault.com/583/489/583489293-62e22caab8392) center/cover no-repeat',
                        }} className={styles.contentStyle} href="https://segmentfault.com/a/1190000042203704?utm_source=sf-homepage-headline" target="_blank" rel="noreferrer">
                        </a>
                    </div>
                    <div>
                        <a style={{
                            background: 'url(https://image-static.segmentfault.com/248/470/2484709773-635632347923b) center/cover no-repeat',
                        }} className={styles.contentStyle} href="https://chinaevent.microsoft.com/Events/details/0decfcda-1959-4098-891d-690825a58f9e/?channel_id%3d50%26channel_name%3dPaid-SF" target="_blank" rel="noreferrer"></a>
                    </div>
                    <div>
                        <a style={{
                            background: 'url(https://image-static.segmentfault.com/364/971/3649718341-6355fab16df40) center/cover no-repeat',
                        }} className={styles.contentStyle} href="https://segmentfault.com/a/1190000042666738?utm_source=sf-homepage-headline" target="_blank" rel="noreferrer"></a>
                    </div>
                    <div>
                        <a style={{
                            background: 'url(https://image-static.segmentfault.com/422/352/422352298-6355600c6676b) center/cover no-repeat',
                        }} className={styles.contentStyle} href="https://segmentfault.com/reco/1640000042672710?utm_source=sf-homepage-headline" target="_blank" rel="noreferrer"></a>
                    </div>
                </Carousel>
            </div>

            <RecommendItem recommendInfo={{ num: 1, title: "利用思否猫素材实现一个丝滑的轮播图（html + css + js）", href: "https://segmentfault.com/a/1190000042661646" }} />
            <RecommendItem recommendInfo={{ num: 2, title: "「🌟技术探索🌟」借助 CI / CD 实现前端应用的快速回滚", href: "https://segmentfault.com/a/1190000042531062" }} />
            <RecommendItem recommendInfo={{ num: 3, title: "面试说：聊聊JavaScript中的数据类型", href: "https://segmentfault.com/a/1190000042539876" }} />
            <RecommendItem recommendInfo={{ num: 4, title: "单标签实现复杂的棋盘布局", href: "https://segmentfault.com/a/1190000042513947" }} />
        </Card>
    );
}

export default Recommend;
