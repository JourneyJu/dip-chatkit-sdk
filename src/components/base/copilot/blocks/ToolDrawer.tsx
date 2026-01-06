import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * ToolDrawer 组件的属性接口
 */
export interface ToolDrawerProps {
  /** 抽屉是否打开 */
  isOpen: boolean;
  /** 关闭抽屉的回调函数 */
  onClose: () => void;
  /** 工具名称 */
  toolName: string;
  /** 工具标题 */
  toolTitle: string;
  /** 工具图标 */
  toolIcon?: string | React.ReactNode;
  /** 工具输入参数 */
  input?: any;
  /** 工具输出结果 */
  output?: any;
}

/**
 * ToolDrawer 组件
 * 用于展示工具调用的详细信息（输入和输出）的抽屉组件
 */
const ToolDrawer: React.FC<ToolDrawerProps> = ({
  isOpen,
  onClose,
  toolName,
  toolTitle,
  toolIcon,
  input,
  output,
}) => {
  // 处理 ESC 键关闭抽屉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /**
   * 渲染工具图标
   */
  const renderIcon = () => {
    if (!toolIcon) {
      return null;
    }

    if (typeof toolIcon === 'string') {
      return (
        <img
          src={toolIcon}
          alt={toolName}
          className="w-5 h-5"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }

    return <div className="w-5 h-5">{toolIcon}</div>;
  };

  /**
   * 格式化显示数据
   * 如果是对象或数组，转换为格式化的 JSON 字符串
   */
  const formatData = (data: any): string => {
    if (data === null || data === undefined) {
      return '';
    }
    if (typeof data === 'string') {
      return data;
    }
    try {
      return JSON.stringify(data, null, 2);
    } catch (e) {
      return String(data);
    }
  };

  /**
   * 判断是否为代码执行工具
   */
  const isExecuteCodeTool = (): boolean => {
    return toolName === 'execute_code';
  };

  /**
   * 渲染代码输入（Markdown 代码块格式）
   */
  const renderCodeInput = (code: string): React.ReactNode => {
    // 将代码包装为 Markdown 代码块格式
    const markdownCode = `\`\`\`python\n${code}\n\`\`\``;
    return (
      <div className="markdown-block prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownCode}
        </ReactMarkdown>
      </div>
    );
  };

  /**
   * 渲染代码输出（Markdown 格式）
   */
  const renderCodeOutput = (output: string): React.ReactNode => {
    return (
      <div className="markdown-block prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {output}
        </ReactMarkdown>
      </div>
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* 抽屉内容 */}
      <div className="fixed right-0 top-0 bottom-0 w-[600px] max-w-[90vw] bg-white shadow-xl z-50 flex flex-col animate-slide-in-right">
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {renderIcon()}
            <h2 className="text-lg font-semibold text-gray-900">{toolTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="关闭"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* 代码执行工具特殊渲染 */}
          {isExecuteCodeTool() ? (
            <>
              {/* 输入代码 */}
              {input !== undefined && input !== null && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">输入</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
                    {renderCodeInput(typeof input === 'string' ? input : formatData(input))}
                  </div>
                </div>
              )}

              {/* 输出结果 */}
              {output !== undefined && output !== null && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">输出</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
                    {renderCodeOutput(typeof output === 'string' ? output : formatData(output))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* 通用工具渲染 */}
              {/* 输入参数 */}
              {input !== undefined && input !== null && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">输入</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words font-mono">
                      {formatData(input)}
                    </pre>
                  </div>
                </div>
              )}

              {/* 输出结果 */}
              {output !== undefined && output !== null && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3">输出</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words font-mono">
                      {formatData(output)}
                    </pre>
                  </div>
                </div>
              )}
            </>
          )}

          {/* 无数据提示 */}
          {(input === undefined || input === null) &&
            (output === undefined || output === null) && (
              <div className="text-center text-gray-400 py-8">
                暂无数据
              </div>
            )}
        </div>
      </div>

      {/* 添加滑入动画的样式 */}
      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ToolDrawer;
