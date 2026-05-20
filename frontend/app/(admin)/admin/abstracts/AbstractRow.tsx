import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/Modal";
import { AbstractType, REVEIWER_USER_TYPE } from "@/lib/type";
import { Ellipsis, Pen } from "lucide-react";
import { ChangeAbstractReviewerForm } from "./ChangeAbstractReviewerForm";

const AbstractRow = ({
  abstract,
  reviewers,
}: {
  abstract: AbstractType;
  reviewers: REVEIWER_USER_TYPE[];
}) => {
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
                <span>Change Reviewer</span>
              </button>
            </Modal.Open>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-data">
        {/* <CreateUserForm userToEdit={user} /> */}
        <ChangeAbstractReviewerForm abstract={abstract} reviewers={reviewers} />
      </Modal.Window>
    </Modal>
  );
};

export default AbstractRow;
