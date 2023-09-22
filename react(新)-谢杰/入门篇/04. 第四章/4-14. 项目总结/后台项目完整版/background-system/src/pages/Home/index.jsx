import styles from './index.module.css';

import DemoPie from "./Charts/DemoPie";
import DemoBar from "./Charts/DemoBar";
import DemoDualAxes from "./Charts/DemoDualAxes";
import DemoColumn from "./Charts/DemoColumn";
import DemoBullet from "./Charts/DemoBullet";

function HomePage() {
  return (
    <div className={styles.container}>
      {/* 第一行 */}
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <DemoPie />
        </div>
        <div className={styles.middle}>
          <DemoBullet />
        </div>
        <div className={styles.right}>
          <DemoPie />
        </div>
      </div>
      {/* 第二行 */}
      <div className={styles.wrapper}>
        <DemoDualAxes />
      </div>
      {/* 第三行 */}
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <DemoBar />
        </div>
        <div className={styles.right}>
          <DemoColumn />
        </div>
      </div>
    </div>
  )
}

export default HomePage;