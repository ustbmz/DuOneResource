import React from 'react';

import styles from "../css/JobDetail.module.css"

function JobDetail(props) {
    return (
        <div>
            <div className={styles.row}>
                <h1 className={styles.title}>VUE 前端开发工程师</h1>
                <div className={`${styles.content} ${styles.salary}`} style={{ fontWeight: 500 }}>1.3万-2万</div>
                <div className={styles.content}>成都 - 武侯区</div>
                <div className={styles.content}>公司：上海缘琯实业发展有限公司</div>
            </div>
            <div className={styles.row}>
                <h1 className={styles.title}>职位描述</h1>
                <div>
                    <div className={styles.describtionTitle}>岗位要求：</div>
                    <div className={styles.content}>  1、负责项目前端模块的开发，完成模块的前端界面及功能互逻辑开发；</div>
                    <div className={styles.content}>  2、完成模块内功能前端和互逻辑开发，完成开发问题处理和功能调优；</div>
                    <div className={styles.content}>  3、参与前端框架的搭建与维护，持续优化产品的质量、性能与用户体验；</div>
                    <div className={styles.content}>  4、优化前端开发及合作流程 ，不断完善标准有规范；</div>
                    <div className={styles.content}>  5、探索Web新技术，提升团队整体技术能力；</div>
                    <div className={styles.describtionTitle}>能力及特殊要求：</div>
                    <div className={styles.content}>  1、五年以上前端开发经验，本科及以上学历；</div>
                    <div className={styles.content}>  2、精通Javascript、Jquery，HTML5，CSS，AJAX等核心技术；</div>
                    <div className={styles.content}>  3、熟练使用Vuejs/Element UI全家桶，并且有实战经验（硬性条件），熟悉整体架构，开发，测试，发布整个流程（熟悉React和Angular加分）；</div>
                    <div className={styles.content}>  4、熟练前端自动化工程NPM/Yarn/Webpack/Gulp/Yeoman等；</div>
                    <div className={styles.content}>  5、熟悉运用Scss预编译开发，Flex弹性布局；</div>
                    <div className={styles.content}>  6、熟悉响应式布局框架、前端缓存、CDN技术及前端优化，能够做好各种浏览器兼容。</div>
                    <div className={styles.content}>  7、熟悉HTTP协议和RESTful架构的API风格，对后端程序有一定的了解；</div>
                    <div className={styles.content}>  8、对常见的Web安全有一定的认识，知道常见的Web攻击。</div>
                </div>
            </div>
            <div className={styles.row}>
                <h1 className={styles.title}>工作地点</h1>
                <div className={styles.content}>
                    高新区天府大道北段1480号
                </div>
            </div>
            <div className={styles.row}>
                <h1 className={styles.title}>联系方式</h1>
                <div className={styles.content}>
                    电话：400-123-1234
                </div>
                <div className={styles.content}>
                    邮箱：12345@gmail.com
                </div>
            </div>
            <div className={styles.row}>
                <h1 className={styles.title}>公司介绍</h1>
                <div className={styles.content}>上海缘琯实业发展有限公司</div>
                <div className={styles.content}>500-999人</div>
                <div className={styles.content}>
                    上海缘琯实业发展有限公司成立于2010年,注册资金5000万元人民币整，是首家为宝钢提供业务外包的民营企业。公司于2012年获得《宝钢国际优秀协力供应商》称号，现已成为宝钢国际合作战略伙伴。
                    目前我公司员工500多人，业务分部于成都、天津、宁波、杭州、安徽、襄阳、重庆、上海、广州等地。公司不仅拥有一支稳健、成熟、上进的管理团队，还组建了专家技能队伍，并在成都建立培训基地，为各地储备生产、技术、管理人员。公司通过ISO9001及ISO45001认证。上海市和谐企业及上海市重合守信用企业。
                    企业文化：诚信、和谐、优质、创新

                    服务理念：用户满意是我们如终如一的追求

                    管理理念：发展企业、科学管理、以人为本
                </div>
            </div>
        </div>
    );
}

export default JobDetail;