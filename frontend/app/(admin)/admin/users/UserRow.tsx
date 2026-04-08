import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/Modal";
import { REVEIWER_USER, Topic } from "@/lib/type";

import ButtonIcon from "@/components/ui/ButtonIcon";
import { Ellipsis, Pen } from "lucide-react";
import CreateUserForm from "./CreateUserForm";

export default function UserRow({
  user,
  topics,
}: {
  user: REVEIWER_USER;
  topics: Topic[];
}) {
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
            <Modal.Open opens="edit-attribute">
              <ButtonIcon icon={Pen} variant="ghost">
                Edit
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-attribute">
        <CreateUserForm topics={topics} userToEdit={user} />
      </Modal.Window>
    </Modal>
  );
}
