import React from 'react';

import styles from "../css/PageHeader.module.css"

/**
 * 每一页的页头
 */
function PageHeader(props) {
    return (
        <div className={styles.row}>
            <div className={styles.pageHeader}>
                {props.title}
            </div>
            {/* 分类选择 */}
            {/* 类似于 vue 中设置的插槽 */}
            {props.children}
        </div>
    );
}

export default PageHeader;