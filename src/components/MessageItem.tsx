import React from 'react';
import { ChatMessage, RoleType } from '../types';

/**
 * MessageItem 组件的属性接口
 */
interface MessageItemProps {
  /** 消息对象 */
  message: ChatMessage;
}

/**
 * MessageItem 组件
 * 显示单条消息
 */
const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role.type === RoleType.USER;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
