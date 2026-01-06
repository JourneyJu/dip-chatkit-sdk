import React, { useState } from 'react';
import { ToolBlock as ToolBlockType } from '../../../../types';
import ToolDrawer from './ToolDrawer';

/**
 * ToolBlock 组件的属性接口
 */
export interface ToolBlockProps {
  /** 工具块数据 */
  block: ToolBlockType;
}

/**
 * ToolBlock 组件
 * 用于在消息流中渲染工具调用块的通用组件
 * 支持传入自定义图标和标题，并可点击右侧箭头查看详情
 */
const ToolBlock: React.FC<ToolBlockProps> = ({ block }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { icon, title, name, input, output } = block.content;

  /**
   * 渲染工具图标
   */
  const renderIcon = () => {
    if (!icon) {
      return null;
    }

    // 如果是字符串，作为图片 URL 渲染
    if (typeof icon === 'string') {
      return (
        <img
          src={icon}
          alt={name}
          className="w-5 h-5 flex-shrink-0"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }

    // 如果是 React 元素，直接渲染
    return <div className="w-5 h-5 flex-shrink-0">{icon}</div>;
  };

  return (
    <>
      {/* 工具块主体 */}
      <div className="tool-block bg-white border border-[#d9d9d9] rounded-[6px] my-2">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsDrawerOpen(true)}
        >
          {/* 左侧：图标 + 标题 */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {renderIcon()}
            <span className="text-sm text-[rgba(0,0,0,0.65)] truncate">
              {title}
            </span>
          </div>

          {/* 右侧：箭头图标 */}
          <div className="flex items-center justify-center w-4 h-4 flex-shrink-0">
            <svg
              className="w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 工具详情抽屉 */}
      <ToolDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        toolName={name}
        toolTitle={title}
        toolIcon={icon}
        input={input}
        output={output}
      />
    </>
  );
};

export default ToolBlock;
