import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";

export const ConfirmDialog = ({
  open,
  setOpen,
  options = {},
  onConfirm,
  onCancel,
  disabled,
}) => {
  const {
    title = "Confirm",
    description = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = options;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onCancel();
        setOpen(value);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <p className="text-gray-500">{description}</p>

        <div className="flex justify-end gap-4 mt-4">
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} disabled={disabled}>
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
