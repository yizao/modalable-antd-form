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

    handleOk = (isContinue = false) => {
      this.form.validateFields((err, fieldsValue) => {
        if (err) return;
        const formData = {
          ...fieldsValue,
        };
        if (this.props.resetField === true) {
          this.form.resetFields();
        }
        this.props.handleOk(formData, isContinue);
      });
    }

    render() {
      const { visible } = this.state;
      const {
        loading = false, title = '', formData = {},
        style = { top: 10 }, footer = undefined,
        okText = '确定', cancelText = '取消', continueText = '保存并继续',
        withContinue = false, ...rest
      } = this.props;

      const footers = [
        <Button key="back" onClick={() => this.toggleVisible()}>{cancelText}</Button>,
        <Button loading={loading} key="submit" type="primary" onClick={() => this.handleOk(false)}>
          {okText}
        </Button>,
      ]
      if (withContinue && !formData.id) {
        footers.push(
          <Button
            key="continueSubmit"
            type="primary"
            onClick={() => this.handleOk(true)}
          >
            {continueText}
          </Button>
        )
      }

      return (
        <Modal
          {...rest}
          title={title ? title : (formData.id ? '更新' : '新增')}
          style={style}
          visible={visible}
          onOk={this.handleOk}
          onCancel={() => this.toggleVisible()}
          footer={footer === null ? null : footers}
        >
          <WrappedComponent {...this.props} {...formData} ref={node => this.form = node} />
        </Modal>
      )
    }
  }

}

export default modalable;