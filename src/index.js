import React, { PureComponent } from 'react';
import { Modal, Button } from 'antd';

function modalable(WrappedComponent) {
  return class Modalable extends PureComponent {

    state = {
      visible: false,
    }

    toggleVisible = (flag) => {
      this.setState({ visible: !!flag });
    }

    handleOk = () => {
      this.form.validateFields((err, fieldsValue) => {
        if (err) return;
        const formData = {
          ...fieldsValue,
        };
        this.props.handleOk(formData);
      });
    }

    render() {
      const { visible } = this.state;
      const { title = '', formData = {}, withContinue = false } = this.props;

      const footer = [
        <Button key="back" onClick={() => this.toggleVisible()}>取消</Button>,
        <Button key="submit" type="primary" onClick={() => this.handleOk(false)}>
          保存
        </Button>,
      ]
      if (withContinue && !formData.id) {
        footer.push(
          <Button
            key="continueSubmit"
            type="primary"
            onClick={() => this.handleOk(true)}
          >
            保存并继续
          </Button>
        )
      }

      return (
        <Modal
          title={ title ? title : (formData.id ? '更新' : '新增')}
          width={720}
          style={{ top: 10 }}
          visible={visible}
          onOk={this.handleOk}
          onCancel={() => this.toggleVisible()}
          destroyOnClose
          maskClosable={false}
          footer={footer}
        >
          <WrappedComponent {...this.props} ref={node => this.form = node}/>
        </Modal>
      )
    }
  }

}

export default modalable;
