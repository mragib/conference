"use client";

import { Button } from "@/components/ui/button";

import Modal from "@/components/ui/Modal";
import { Topic } from "@/lib/type";
import CreateUserForm from "./CreateUserForm";

export const AddUser = ({ topics }: { topics: Topic[] }) => {
  return (
    <Modal>
      <Modal.Open opens="data-form">
        <Button>Add a Reviewer</Button>
      </Modal.Open>
      <Modal.Window name="data-form">
        <CreateUserForm topics={topics} />
      </Modal.Window>
    </Modal>
  );
};
