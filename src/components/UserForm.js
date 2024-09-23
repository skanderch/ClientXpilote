import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Input,
  FormGroup,
  Label,
  Form,
  Row,
  Col,
  ModalBody,
  ModalHeader,
  Spinner,
  Alert,
} from 'reactstrap';
import { fetchRoles, createUser, updateUser } from '../api/userApi';

const UserForm = ({ user, onSuccess }) => {
  const [username, setUsername] = useState(user ? user.username : '');
  const [password, setPassword] = useState(user ? '' : '');
  const [roleId, setRoleId] = useState(user ? user.role_id : '');
  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRolesData();
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRoleId(user.role_id);
      setPassword('');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const userData = { username, role_id: roleId };
      if (password) userData.password = password;

      if (user) {
        await updateUser(user._id, userData);
      } else {
        await createUser(userData);
      }
      onSuccess();
    } catch (error) {
      setError('Error submitting user');
      console.error('Error submitting user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <ModalHeader toggle={() => onSuccess()}>
        {user ? 'Edit User' : 'Add User'}
      </ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="role">Role</Label>
            <Input
              type="select"
              id="role"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              required
            >
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.role_name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Row>
            <Col>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner size="sm" /> : 'Save User'}
              </Button>
            </Col>
            <Col className="text-right">
              <Button color="secondary" onClick={() => onSuccess()}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Container>
  );
};

export default UserForm;
