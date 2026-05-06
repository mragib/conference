import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import ConfirmChangeStatus from "@/components/ui/ConfirmReviewerStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/Modal";
import { updateReviewerStatus } from "@/lib/data-service";
import { REVEIWER_USER_TYPE } from "@/lib/type";
import { Ellipsis, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import toast from "react-hot-toast";

const ReviewerRow = ({ reviewer }: { reviewer: REVEIWER_USER_TYPE }) => {
  const [state, action, isPending] = useActionState(updateReviewerStatus, {
    success: false,
  });

  const [isTransitioning, startTransition] = useTransition();

  const router = useRouter();

  const { is_active } = reviewer;

  useEffect(() => {
    if (state?.success) {
      toast.success("Reviewer status updated successfully!");
      router.refresh();
    }

    if (!state?.success && state?.errors) {
      toast.error(state.errors);
    }
  }, [state, router]);

  const isLoading = isPending || isTransitioning;
  const onsubmit = async (data) => {
    const formData = new FormData();
    formData.append("is_active", String(!is_active));
    formData.append("reviewerId", reviewer.id);
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
              <ButtonIcon icon={Pen} variant="ghost">
                Edit
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-data">
        <ConfirmChangeStatus
          action={!is_active ? "Active" : "Inactive"}
          resource="Reviewer"
          disabled={isLoading}
          onConfirm={() => {
            onsubmit({ is_active: !is_active, reviewer });
          }}
        />
      </Modal.Window>
    </Modal>
  );
};

export default ReviewerRow;
