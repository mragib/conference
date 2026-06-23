"use client";

type ConfirmChangeStatusProps = {
  resource: string;
  action: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
  disabled?: boolean;
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ConfirmChangeStatus({
  resource,
  action,
  onConfirm,
  onCloseModal,
  disabled = false,
}: ConfirmChangeStatusProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Heading */}
      <h3 className="text-lg font-semibold">
        {capitalizeFirstLetter(action)} {resource}
      </h3>

      {/* Description */}
      <p className="text-gray-500 mb-4">
        Are you sure you want to {action} this {resource}?
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onCloseModal}
          className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
          disabled={disabled}
          className={`px-4 py-2 rounded-md text-sm text-white transition ${
            action.toLowerCase() === "inactive" ||
            action.toLowerCase() === "decline"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {capitalizeFirstLetter(action)}
        </button>
      </div>
    </div>
  );
}
