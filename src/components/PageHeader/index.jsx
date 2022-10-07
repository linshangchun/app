import React from 'react';
import { PageHeader, Typography, Popover } from 'antd';
import { ScanOutlined } from '@ant-design/icons';
import QRCodeByText from '../QRCodeByText';

const { Link } = Typography;

export default ({
  title,
  extra = [],
  subTitle,
  subAction,
  noScan,
  ...restProps
}) => {
  return (
    <PageHeader
      className="site-page-header"
      title={title}
      subTitle={
        <div>
          {subTitle}
          {subAction && <Link href={subAction.href}>{subAction.text}</Link>}
        </div>
      }
      extra={[
        ...extra,
        !noScan && (
          <Popover
            key="view-mobile"
            placement="bottomRight"
            title={'扫码查看当前网页'}
            content={<QRCodeByText value={window.location.href} />}
            trigger="click"
          >
            <ScanOutlined style={{ fontSize: 18 }} />
          </Popover>
        ),
      ]}
      {...restProps}
    />
  );
};
