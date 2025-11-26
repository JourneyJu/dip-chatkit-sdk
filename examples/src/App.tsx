import React, { useState, useRef } from 'react';
import { ChatKitCoze } from '../../src/components/ChatKitCoze';
import { ApplicationContext } from '../../src/types';
import { COZE_CONFIG } from './config';

/**
 * Demo 应用组件
 * 演示 ChatKitCoze 组件的使用方法
 */
const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const chatKitRef = useRef<ChatKitCoze>(null);

  /**
   * 注入上下文示例
   */
  const injectExampleContext = () => {
    const context: ApplicationContext = {
      title: '故障节点',
      data: {
        node_id: 'node-uuid-1',
      },
    };

    // 通过 ref 调用 ChatKitCoze 的方法
    if (chatKitRef.current) {
      chatKitRef.current.injectApplicationContext(context);
    }

    // 如果聊天窗口未打开，则打开它
    if (!showChat) {
      setShowChat(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 主应用区域 */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ChatKit Demo
          </h1>
          <p className="text-gray-600 mb-6">
            这是一个演示 ChatKitCoze 组件的示例应用,集成了扣子(Coze) API。点击下方按钮可以注入上下文并打开聊天窗口。
          </p>

          <div className="space-y-4">
            <button
              onClick={injectExampleContext}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              添加上下文并打开聊天
            </button>

            <button
              onClick={() => setShowChat(!showChat)}
              className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              {showChat ? '关闭聊天窗口' : '打开聊天窗口'}
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              功能说明
            </h2>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 点击"添加上下文并打开聊天"按钮会注入一个示例上下文对象</li>
              <li>• 上下文会显示在输入框上方，可以通过 × 按钮移除</li>
              <li>• 发送消息时，控制台会打印出选中的上下文信息</li>
              <li>• ChatKitCoze 组件自动使用流式响应</li>
              <li>• 使用扣子 API 时会保持会话上下文</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              扣子 API 配置
            </h2>
            <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
              <li>访问 <a href="https://www.coze.cn/" target="_blank" rel="noopener noreferrer" className="underline">https://www.coze.cn/</a> 创建你的 Bot</li>
              <li>在 Bot 设置中获取 Bot ID</li>
              <li>在个人设置中创建 Personal Access Token</li>
              <li>在 examples/src/config.ts 中配置 Bot ID 和 API Token</li>
              <li>自动使用真实的 AI 对话流式响应</li>
            </ol>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              示例上下文数据:
            </h3>
            <pre className="text-xs text-gray-600 bg-white p-3 rounded overflow-x-auto">
{`{
  "title": "故障节点",
  "data": {
    "node_id": "node-uuid-1"
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* ChatKitCoze 组件 */}
      {showChat && (
        <ChatKitCoze
          ref={chatKitRef}
          botId={COZE_CONFIG.botId}
          apiToken={COZE_CONFIG.apiToken}
          baseUrl={COZE_CONFIG.baseUrl}
          userId={COZE_CONFIG.userId}
          title="Copilot"
          visible={showChat}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default App;
