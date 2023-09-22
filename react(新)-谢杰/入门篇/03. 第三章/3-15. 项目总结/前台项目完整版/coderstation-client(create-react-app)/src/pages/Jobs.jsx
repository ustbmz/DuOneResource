import React from 'react';
import PageHeader from "../components/PageHeader"
import TypeSelect from '../components/TypeSelect';
import JobDetail from "../components/JobDetail"

import styles from "../css/Jobs.module.css";

import { Card, Pagination } from "antd";


function Jobs(props) {
    return (
        <div className={styles.container}>
            <PageHeader title="最新职位">
                <TypeSelect />
            </PageHeader>
            <div className={styles.jobContainer}>
                <div className={styles.leftSide}>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.card}>
                        <Card title="VUE前端开发工程师">
                            <p>上海缘琯实业发展有限公司</p>
                            <p className={styles.salary}>1.3万-2万</p>
                            <p>成都 - 武侯区</p>
                            <p>
                                <span className={styles.badge}>双休</span>
                                <span className={styles.badge}>年底双薪</span>
                            </p>
                        </Card>
                    </div>
                    <div className={styles.paginationContainer}>
                        <Pagination size="small" defaultCurrent={1} total={500} />
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <JobDetail />
                </div>
            </div>
        </div>
    );
}

export default Jobs;