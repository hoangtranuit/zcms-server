
import { ZForm, useTableStore } from '@zcmjs/ui';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import schema from './schema.json';

const Form = ({ onSuccess }) => {
  return <ZForm
    schema={schema}
    fieldsSchema={schema.form.create}
    column={1}
    onSuccess={onSuccess}
    api={{
      submit: schema.api.create,
    }}
    footer={{
      submit: {
        text: "Tạo",
        hide: false,
      },
      reset: {
        text: "Làm mới",
        hide: false,
      }
    }}
  />
}

export const CreateButton = () => {
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
  };

  const actions = useTableStore((state) => state.actions);

  const close = () => {
    setOpen(false);
  };

  const onSuccess = (data) => {
    actions.addItem(data);
    close();
  }

  if (!schema.api.create) return <></>

  return (
    <>
      <Button
        type='primary'
        onClick={show}>Tạo mới</Button>
      <Modal
        open={open}
        onCancel={close}
        width={700}
        footer={[]}
      >
        <Form
          onSuccess={onSuccess}
        />
      </Modal >
    </>
  )
}