import React, { useState } from "react";
import {
  Button,
  Input,
  FormGroup,
  Label,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Alert,
  Spinner,
} from "reactstrap";
import { createRole, updateRole } from "../api/roleApi";

const RoleForm = ({ role, onSuccess, onClose }) => {
  const [roleName, setRoleName] = useState(role ? role.role_name : "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (role) {
        // Update existing role
        await updateRole(role._id, roleName);
      } else {
        // Create new role
        await createRole(roleName);
      }
      onSuccess(); // Notify parent component of success
    } catch (error) {
      setError("Error submitting role");
      console.error("Error submitting role:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen toggle={onClose}>
      <ModalHeader toggle={onClose}>
        {role ? "Edit Role" : "Create Role"}
      </ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="roleName">Role Name</Label>
            <Input
              type="text"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner size="sm" />
          ) : role ? (
            "Update Role"
          ) : (
            "Create Role"
          )}
        </Button>
        <Button
          color="secondary"
          onClick={onClose}
          style={{ marginLeft: "8px" }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RoleForm;
