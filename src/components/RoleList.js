import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  Spinner,
  Alert
} from 'reactstrap';
import RoleForm from '../components/RoleForm';
import { fetchRoles, deleteRole } from '../api/roleApi';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    filterRoles();
  }, [searchTerm, roles]);

  const loadRoles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchRoles();
      setRoles(data);
    } catch (error) {
      setError('Error fetching roles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      setRoles(roles.filter(role => role._id !== id));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRole(null);
    setOpenModal(false);
    loadRoles(); // Refresh role list after editing
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const filterRoles = () => {
    setFilteredRoles(
      roles.filter(role =>
        role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <Container fluid style={{ paddingTop: '20px' }}>
      <Row className="mb-4">
        <Col>
          <h4>Role List</h4>
          <FormGroup>
            <Label for="searchTerm">Search Role</Label>
            <Input
              type="text"
              id="searchTerm"
              placeholder="Search Role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormGroup>
          <Button
            color="primary"
            onClick={() => {
              setSelectedRole(null);
              setOpenModal(true);
            }}
          >
            Add Role
          </Button>
        </Col>
      </Row>
      {isLoading && <Spinner color="primary" />}
      {error && <Alert color="danger">{error}</Alert>}
      <Table striped>
        <thead>
          <tr>
            <th>Role Name</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((role) => (
            <tr key={role._id}>
              <td>{role.role_name}</td>
              <td className="text-right">
                <Button
                  color="primary"
                  onClick={() => handleEdit(role)}
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete(role._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col>
          <Button
            color="secondary"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            color="secondary"
            onClick={() => handlePageChange(page + 1)}
            disabled={page * rowsPerPage >= filteredRoles.length}
          >
            Next
          </Button>
        </Col>
        <Col>
          <FormGroup>
            <Label for="rowsPerPage">Rows per Page</Label>
            <Input
              type="select"
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Modal isOpen={openModal} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Add/Edit Role</ModalHeader>
        <ModalBody>
          <RoleForm role={selectedRole} onSuccess={handleCloseModal} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default RoleList;
