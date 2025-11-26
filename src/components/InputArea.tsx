import React from 'react';
import { ApplicationContext } from '../types';

/**
 * InputArea 组件的属性接口
 */
interface InputAreaProps {
  /** 输入框的值 */
  value: string;

  /** 输入框值变化的回调 */
  onChange: (value: string) => void;

  /** 发送消息的回调 */
  onSend: () => void;

  /** 当前的应用上下文 */
  context?: ApplicationContext;

  /** 移除上下文的回调 */
  onRemoveContext: () => void;

  /** 是否禁用输入 */
  disabled?: boolean;
}

/**
 * InputArea 组件
 * 用户输入区域，包括上下文显示和输入框
 */
const InputArea: React.FC<InputAreaProps> = ({
  value,
  onChange,
  onSend,
  context,
  onRemoveContext,
  disabled = false,
}) => {
  /**
   * 处理键盘事件
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      {/* 上下文标签 */}
      {context && context.title && (
        <div className="mb-2 flex items-center justify-between bg-blue-50 px-3 py-2 rounded-md">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span className="text-sm text-blue-700 font-medium">
              {context.title}
            </span>
          </div>
          <button
            onClick={onRemoveContext}
            className="text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* 输入框区域 */}
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="请输入问题..."
          disabled={disabled}
          className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          rows={3}
        />
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputArea;
