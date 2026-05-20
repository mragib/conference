"use client";

import { Button } from "@/components/ui/button";

import Modal from "@/components/ui/Modal";
import CreateUserForm from "./CreateUserForm";

export const AddUser = () => {
  return (
    <Modal>
      <Modal.Open opens="data-form">
        <Button>Add a user</Button>
      </Modal.Open>
      <Modal.Window name="data-form">
        <CreateUserForm />
      </Modal.Window>
    </Modal>
  );
};
