import { useState } from "react";

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

export function useConfirm() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [resolver, setResolver] = useState<(value: boolean) => void>();

  const confirm = (opts: ConfirmOptions = {}) => {
    setOptions(opts);
    setOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    resolver?.(true);
    setOpen(false);
  };

  const handleCancel = () => {
    resolver?.(false);
    setOpen(false);
  };

  return {
    confirm,
    open,
    options,
    handleConfirm,
    handleCancel,
    setOpen,
  };
}
