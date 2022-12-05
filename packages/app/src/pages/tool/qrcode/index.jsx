import React, { useState } from 'react';
import {
  Layout,
  Select,
  InputNumber,
  Input,
  Button,
  Divider,
  Table,
  Space,
  Modal,
} from 'antd';
import { useLocalStorageState } from 'ahooks';
import QRCodeByText from '@lshch/app/components/QRCodeByText';
import Descriptions from '@lshch/app/components/Descriptions';

const { Sider, Content } = Layout;
const { Option } = Select;
export default () => {
  const initDataSource = {
    value: HOMEPAGE,
    size: 300,
    level: 'M',
    logo: '',
  };
  const [QRCodeList, setQRCodeList] = useLocalStorageState('qrcode-list', {
    defaultValue: [],
  });
  const [dataSource, setDataSource] = useState(
    QRCodeList?.[0] || initDataSource,
  );
  const handleSave = () => {
    const hasData = QRCodeList.find((item) => item.value === dataSource.value);
    if (hasData) {
      setQRCodeList((v) =>
        v.map((item) => {
          if (item.value === dataSource.value) {
            return { ...item, ...dataSource };
          }
          return item;
        }),
      );
    } else {
      QRCodeList.unshift(dataSource);
      setQRCodeList([...QRCodeList]);
    }
  };
  const checkData = () => {
    if (!dataSource?.value) {
      Modal.error({
        title: '操作提醒',
        content: '保存数据时必须填写【文本内容】',
        okText: '好的',
        centered: true,
      });
      return;
    }
    if (!dataSource?.name) {
      Modal.confirm({
        title: '操作提醒',
        content: '保存数据时建议为当前记录设置【记录名称】',
        cancelText: '取消',
        okText: '直接保存',
        onOk: handleSave,
        centered: true,
      });
    } else {
      handleSave();
    }
  };
  const removeDataSource = (r) => {
    Modal.confirm({
      title: '操作提醒',
      content: `确认移除当前记录：${r.name || r.value}`,
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        const hasData = QRCodeList.find((item) => item.value === r.value);
        if (hasData) {
          setQRCodeList([
            ...QRCodeList.filter((item) => item.value !== r.value),
          ]);
        }
      },
    });
  };
  const columns = [
    {
      key: 'value',
      title: '文本内容',
      width: '160px',
      fixed: 'left',
      ellipsis: true,
      render: () => {
        return (
          <Input
            placeholder="请输入文本内容"
            value={dataSource?.value}
            onChange={({ target: { value } }) => {
              setDataSource((v) => ({ ...v, value }));
            }}
            maxLength={168}
            style={{ width: 260 }}
          />
        );
      },
    },
    {
      key: 'logo',
      title: '中心图标',
      width: '60px',
      render: () => {
        return (
          <Input
            placeholder="请输入图片链接，’none‘去除图标"
            value={dataSource?.logo}
            onChange={({ target: { value } }) => {
              setDataSource((v) => ({ ...v, logo: value }));
            }}
            maxLength={250}
            style={{ width: 260 }}
          />
        );
      },
      renderTable: (v) => {
        return v?.indexOf('http') === 0 ? (
          <img width="28px" height="28px" src={v} />
        ) : (
          v || '--'
        );
      },
    },
    {
      key: 'size',
      title: '二维码宽高',
      width: '60px',
      render: () => {
        return (
          <InputNumber
            value={dataSource?.size}
            onChange={(size) => {
              setDataSource((v) => ({ ...v, size }));
            }}
            max={400}
            min={200}
            style={{ width: 120 }}
          />
        );
      },
    },
    {
      key: 'level',
      title: 'Level',
      width: '60px',
      render: () => {
        return (
          <Select
            value={dataSource?.level}
            onChange={(level) => {
              setDataSource((v) => ({ ...v, level }));
            }}
            style={{ width: 120 }}
          >
            <Option value="L">L</Option>
            <Option value="M">M</Option>
            <Option value="Q">Q</Option>
            <Option value="H">H</Option>
          </Select>
        );
      },
    },
    {
      key: 'name',
      title: '记录名称',
      width: '100px',
      render: () => {
        return (
          <Input
            placeholder="便于数据记忆、存储查询等"
            value={dataSource?.name}
            onChange={({ target: { value } }) => {
              setDataSource((v) => ({ ...v, name: value }));
            }}
            maxLength={10}
            style={{ width: 260 }}
          />
        );
      },
    },
    {
      key: 'action',
      title: '操作',
      render: () => (
        <Space>
          <Button type="primary" onClick={checkData}>
            保存 or 更新
          </Button>
          <Button onClick={() => setDataSource({})}>清空</Button>
        </Space>
      ),
    },
  ];

  const columnsList = [
    ...columns
      .filter((item) => item.key !== 'action')
      .map(({ key, title, width, fixed, renderTable }) => ({
        key,
        title,
        width,
        fixed,
        ellipsis: true,
        dataIndex: key,
        render: renderTable ? renderTable : (v) => v || '--',
      })),
    {
      key: 'action',
      title: '操作',
      fixed: 'right',
      width: '100px',
      render: (_, r) => {
        return (
          <Space>
            <Button type="primary" onClick={() => setDataSource(r)}>
              预览 & 编辑
            </Button>
            <Button onClick={() => removeDataSource(r)}>移除</Button>
            {r.value.indexOf('http') === 0 && (
              <Button
                onClick={() => {
                  window.open(r.value);
                }}
              >
                跳转
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Layout>
        <Sider theme="light" width={500} style={{ padding: '0 48px' }}>
          <Divider orientation="left" plain>
            <strong>二维码效果预览</strong>
          </Divider>
          <div style={{ padding: '24px 0 48px' }}>
            <QRCodeByText {...dataSource} />
          </div>
        </Sider>
        <Content theme="light" style={{ padding: '24px' }}>
          <Descriptions
            noHeader
            columns={columns}
            column={1}
            dataSource={dataSource}
          />
        </Content>
      </Layout>
      {QRCodeList?.length > 0 && (
        <Table
          bordered
          title={() => '二维码历史记录：'}
          rowKey="value"
          scroll={{ x: true }}
          dataSource={QRCodeList}
          columns={columnsList}
          pagination={false}
        />
      )}
    </>
  );
};
