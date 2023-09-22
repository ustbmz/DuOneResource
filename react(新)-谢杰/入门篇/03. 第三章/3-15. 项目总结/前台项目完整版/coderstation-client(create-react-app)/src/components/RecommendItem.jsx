import React from 'react';

import styles from "../css/RecommendItem.module.css"


function RecommendItem(props) {
    return (
        <a className={styles.container} href={props.recommendInfo.href} target="_blank" rel="noreferrer">
            <div className={styles.leftSide}>{props.recommendInfo.num}</div>
            <div className={styles.rightSide}>{props.recommendInfo.title}</div>
        </a>
    );
}

export default RecommendItem;