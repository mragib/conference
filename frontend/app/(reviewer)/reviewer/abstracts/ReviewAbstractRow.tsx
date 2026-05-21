"use client";
import { Button } from "@/components/ui/button";
import ConfirmChangeStatus from "@/components/ui/ConfirmReviewerStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/Modal";
import { updateReviewerAcknowledgement } from "@/lib/data-service";
import { ReviewerAbstractType } from "@/lib/type";
import { Ellipsis, Pen } from "lucide-react";
import { useRouter } from "next/navigation";

import { useActionState, useEffect, useTransition } from "react";
import toast from "react-hot-toast";

const ReviewAbstractRow = ({
  abstractAssign,
}: {
  abstractAssign: ReviewerAbstractType;
}) => {
  const [state, action, isPending] = useActionState(
    updateReviewerAcknowledgement,
    {
      success: false,
    },
  );

  const [isTransitioning, startTransition] = useTransition();

  const router = useRouter();

  const { is_agreed, id } = abstractAssign;

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Reviewer status updated successfully!");
      router.refresh();
    }

    if (!state?.success && state?.errors) {
      toast.error(state.errors || "Something went wrong");
    }
  }, [state, router]);

  const isLoading = isPending || isTransitioning;
  const onsubmit = async (data) => {
    const formData = new FormData();
    formData.append("acknowledgement", String(data.is_agreed));
    formData.append("abstractAssignId", data.id);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <Modal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Modal.Open opens="edit-data">
              <button className="flex w-full items-center gap-2">
                <Pen className="h-4 w-4" />
                <span>{is_agreed ? "Decline" : "Agree"}</span>
              </button>
            </Modal.Open>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-data">
        <ConfirmChangeStatus
          action={!is_agreed ? "Agree" : "Decline"}
          resource="Abstract"
          disabled={isLoading}
          onConfirm={() => {
            onsubmit({ is_agreed: !is_agreed, id: abstractAssign.id });
          }}
        />
      </Modal.Window>
    </Modal>
  );
};

export default ReviewAbstractRow;
