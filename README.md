# modalable-antd-form
基于 Antd Modal 组件封装的高阶组件，可使表单组件变成 Modal Form Component, Modal 所有的属性同原Antd Modal 属性。

## 📦 安装
```bash
yarn add modalable-antd-form 
or
npm install modalable-antd-form --save
```
## 🔨 示例

```jsx
import modalable from 'modalable-antd-form';
import YourForm from 'your/own/component/YourForm';
const YourFormWithModal = modalable(YourForm);


<YourFormWithModal
  {...yourFormProps}
  ref={node => this.formModal = node}
  handleOk={this.handleOkClick}
/>

// 触发 modal
<Button onClick={() => this.formModal.toggleVisible(true)}>打开表单</Button>

// isContinue 点击[保存并继续按钮]标识
handleOkClick = (formData, isContinue) => {
    // process form data 
  }
```

## ✨ API
* 继承于Antd Modal 属性，参见 [Ant Design 文档](https://ant.design/components/modal-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| withContinue | 是否有[保存并继续按钮] | Boolean | false |
| resetField | 是否提交表单后清空填写值 | Boolean | false |
| formData | 表单值 | Object | {} |
| handleOk | 点击确定回调 | function(data, isContinue) |  |




