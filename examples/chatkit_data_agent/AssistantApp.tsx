import React, { useRef } from 'react';
import { Assistant, type AssistantProps } from '@kweaver-ai/chatkit';
import { DATA_AGENT_CONFIG } from './config';

/**
 * DIP Assistant Demo
 * 演示 AISHU DIP 平台的 Assistant 主对话入口
 * Assistant 组件已内置历史对话功能
 */
export const DIPAssistantDemo: React.FC = () => {
  const chatKitRef = useRef<Assistant>(null);

  /**
   * 模拟刷新 token 的方法
   * 实际项目中应该调用真实的 token 刷新接口
   */
  const refreshToken = async (): Promise<string> => {
    console.log('正在刷新 token...');
    // TODO: 在实际项目中，这里应该调用真实的 token 刷新接口
    // 这里仅作演示，返回原 token
    return DATA_AGENT_CONFIG.token;
  };

  return (
    <div className="h-full bg-white">
      {React.createElement(Assistant as any, {
        ref: chatKitRef,
        title: 'DIP Assistant',
        visible: true,
        baseUrl: DATA_AGENT_CONFIG.baseUrl,
        agentKey: DATA_AGENT_CONFIG.agentKey,
        token: DATA_AGENT_CONFIG.token,
        refreshToken: refreshToken,
        businessDomain: DATA_AGENT_CONFIG.businessDomain,
      } as AssistantProps)}
    </div>
  );
};
