import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { Column } from '@ant-design/plots';

const data = [
  {
    type: '0-1 秒',
    value: 0.55,
  },
  {
    type: '1-3 秒',
    value: 0.21,
  },
  {
    type: '3-5 秒',
    value: 0.13,
  },
  {
    type: '5+ 秒',
    value: 0.11,
  },
];
const paletteSemanticRed = '#F4664A';
const brandColor = '#5B8FF9';
const config = {
  data,
  xField: 'type',
  yField: 'value',
  seriesField: '',
  color: ({ type }) => {
    if (type === '5+ 秒') {
      return paletteSemanticRed;
    }

    return brandColor;
  },
  legend: false,
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
};



const HomePage = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
      <Column {...config} />
    </PageContainer>
  );
};

export default HomePage;
