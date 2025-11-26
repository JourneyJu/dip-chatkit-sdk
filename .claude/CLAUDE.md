你的任务是开发并测试 ChatKit 组件。你需要开发三部分内容：
1. ChatKitBase 组件
2. 适配扣子（Coze）的 ChatKitCoze 组件
2. 运行 ChatKitCoze 组件的 demo。

# ChatKitBase 组件
在开始编写代码之前，一定要仔细阅读所有有关的文档。

**设计**
- 组件的设计文档在飞书文档上，地址已设置为公开：https://kcnk6oub5282.feishu.cn/wiki/YktDwivKCik6dKkvPgJcoZUsnZb
- 如果无法从飞书抓取文档信息，则从 design 目录下获取备用的设计文档

**实现**
- 使用 TypeScript 作为开发语言，使用 ReactJS 和 Tailwind 作为框架
- 能够支持流式数据响应。具体的流式数据处理方法由 ChatKitCoze 组件继承并实现 reduceEventStreamMessage() 方法来决定。ChatKitBase 只需要实现在接收到 EventStream 时调用 reduceEventStreamMessage() 方法并打印到界面上的标准处理逻辑。
- 接收 EventSteam 时，在闭包中处理数据流，并在全部处理完成后丢弃掉闭包。
- AI 助手返回 Text 类型的消息时，渲染 Markdown。注意：必须使用 reduceMarkdownBlock 在每次 Token 积累得到可增量渲染的 Markdown 内容块的时候才触发渲染。

# ChatKitCoze 组件
ChatKitCoze 组件是专门适配 Coze 平台智能体 API 的智能体对话组件。
ChatKitCoze 组件继承了 ChatKitBase 和 ChatKitInterface，ChatKitCoze 需要实现 ChatKitInterface 里的两个方法：
* sendMessage(): 调用扣子（Coze）的 API 实现对话的后端逻辑，API 文档参考：https://www.coze.cn/open/docs/developer_guides/chat_v3
* reduceEventStreamMessage(): 解析扣子（Coze）输出的 EventStreamMessage，追加并返回字符串以供界面实现打字机效果。 

# demo
demo 是一个简单的 Web 应用，该应用需要挂载 ChatKitCoze 组件。demo 应用上有一个添加上下文的按钮，点击该按钮会将以下对象注入到 ChatKitCoze 的用户输入上下文中：
```json
{
    "title": "故障节点",
    "data": {
        "node_id": "node-uuid-1"
    }
}
```

# helper
## reduceMarkdownBlock(token, prevBuffer): string
在每次追加 Token 后对 prevBuffer 进行解析，当在能够形成完整的 Markdown 可渲染块的时候返回更新的内容。

|  参数  |   说明     |
|   --  |     --     |
|  token | 当次追加的 token |
|  prevBuffer | 之前已经积累的 Token |


**开发**
注意：
- demo 代码放在单独的 examples 目录下。
- 扣子的访问令牌：pat_wGyWHojZkyhhnL2nX7fOgm5x9YLojLK09FlWK3mpnixSwD8stZToochkrYzQFCNn