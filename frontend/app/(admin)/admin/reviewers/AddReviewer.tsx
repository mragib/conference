"use client";

import { Button } from "@/components/button";
import Modal from "@/components/ui/Modal";
import CreateReviewerForm from "./CreateReviewerForm";

const AddReviewer = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="data-form">
          <Button>Add a Reviewer</Button>
        </Modal.Open>
        <Modal.Window name="data-form">
          <CreateReviewerForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddReviewer;
