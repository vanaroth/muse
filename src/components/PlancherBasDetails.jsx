import React from 'react';
import { Descriptions, Space, Tag } from 'antd';

import { EditOutlined, ClockCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../App.css';
import { Container } from './Container';
import { ButtonTooltip } from './ButtonTooltip';

export const PlancherBasDetails = () => {
  return (
    <Container>
      <Descriptions
        className="description"
        title="Plancher Bas Details"
        extra={
          <Space>
            <ButtonTooltip title="Modifier" type="link">
              <EditOutlined />
            </ButtonTooltip>
          </Space>
        }
        column={3}
      >
        <Descriptions.Item label="Pièce">Garage</Descriptions.Item>
        <Descriptions.Item label="Surface">
          50m<sup>2</sup>
        </Descriptions.Item>
        <Descriptions.Item label="Hauteur">2m</Descriptions.Item>
        <Descriptions.Item label="Type de Plafond">
          Hourdis Béton
        </Descriptions.Item>
        <Descriptions.Item label="Temps de route">
          <Tag>
            <ClockCircleOutlined /> 45 min
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Container>
  );
};
