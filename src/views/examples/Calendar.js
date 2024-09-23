import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AttendanceCalendar.css";

const AttendanceCalendar = () => {
  const [attendances, setAttendances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProductionSite, setSelectedProductionSite] = useState("");
  const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState("");
  const [minHoursWorked, setMinHoursWorked] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState({});
  const [showFilters, setShowFilters] = useState(false); // Toggle for filters

  const ETP_HOURS = 8; // Standard working day hours

  useEffect(() => {
    fetchAttendances();
    fetchEmployees();
  }, []);

  const fetchAttendances = useCallback(async () => {
    try {
      const response = await axios.get("http://51.210.241.36:5000/api/attendances");
      setAttendances(response.data);
    } catch (error) {
      console.error("Error fetching attendances:", error);
    }
  }, []);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get("http://51.210.241.36:5000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleDetailsModal = (date) => {
    const details = getFilteredAttendance(date, selectedPosition);
    setAttendanceDetails(details);
    setShowDetailsModal((prev) => !prev);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const getPositionEmployees = (position) => {
    return employees.filter(
      (employee) =>
        (position === "" || employee.position === position) &&
        (selectedDepartment === "" || employee.department === selectedDepartment) &&
        (selectedProductionSite === "" || employee.production_site === selectedProductionSite)
    );
  };

  const getFilteredAttendance = (date, position) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const positionEmployees = getPositionEmployees(position);
    
    // Filter attendance for the selected date and position
    const dayAttendances = attendances.filter(
      (att) =>
        dayjs(att.date).format("YYYY-MM-DD") === formattedDate &&
        positionEmployees.some((emp) => emp._id === att.employee_id._id) &&
        (selectedAttendanceStatus === "" || att.status === selectedAttendanceStatus) &&
        att.hours_worked >= minHoursWorked
    );

    // Calculate present, absent counts, and total hours worked
    const presentCount = dayAttendances.filter((att) => att.status === "Present").length;
    const absentCount = dayAttendances.filter((att) => att.status === "Absent").length;
    const totalHoursWorked = dayAttendances.reduce((sum, att) => sum + att.hours_worked, 0);

    // Calculate fraction of ETP (sum of hours worked / 8)
    const fraction = (totalHoursWorked / ETP_HOURS).toFixed(2); // Example: 0.75

    // Format for display as 'X/1'
    const totalFraction = totalHoursWorked ? `${(totalHoursWorked / ETP_HOURS).toFixed(2)}/1` : "0/1";

    return {
      presentCount,
      absentCount,
      totalPositionCount: positionEmployees.length,
      totalHoursWorked,
      fraction, // Fraction of the day
      totalFraction, // Display as 'X/1'
    };
  };

  const positions = [...new Set(employees.map((emp) => emp.position))];
  const departments = [...new Set(employees.map((emp) => emp.department))];
  const productionSites = [...new Set(employees.map((emp) => emp.production_site))];

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <Col md="8" className="text-center">
          <h2 className="font-weight-bold mb-4">Attendance Calendar</h2>
        </Col>
      </Row>

      {/* Filter Toggle Button */}
      <Row className="justify-content-center mb-2">
        <Col md="10" className="text-center">
          <Button color="primary" onClick={toggleFilters}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </Col>
      </Row>

      {/* Filters Section */}
      {showFilters && (
        <Row className="justify-content-center mb-4">
          <Col md="10">
            <Form className="filter-form">
              <Row form className="align-items-center">
                <Col md={3} className="mb-2">
                  <FormGroup>
                    <Label for="positionSelect" className="font-weight-bold">Position</Label>
                    <Input type="select" id="positionSelect" value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
                      <option value="">All Positions</option>
                      {positions.map((position) => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3} className="mb-2">
                  <FormGroup>
                    <Label for="departmentSelect" className="font-weight-bold">Department</Label>
                    <Input type="select" id="departmentSelect" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                      <option value="">All Departments</option>
                      {departments.map((department) => (
                        <option key={department} value={department}>{department}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3} className="mb-2">
                  <FormGroup>
                    <Label for="productionSiteSelect" className="font-weight-bold">Production Site</Label>
                    <Input type="select" id="productionSiteSelect" value={selectedProductionSite} onChange={(e) => setSelectedProductionSite(e.target.value)}>
                      <option value="">All Production Sites</option>
                      {productionSites.map((site) => (
                        <option key={site} value={site}>{site}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3} className="mb-2">
                  <FormGroup>
                    <Label for="attendanceStatusSelect" className="font-weight-bold">Attendance Status</Label>
                    <Input type="select" id="attendanceStatusSelect" value={selectedAttendanceStatus} onChange={(e) => setSelectedAttendanceStatus(e.target.value)}>
                      <option value="">All Statuses</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form className="align-items-center">
                <Col md={3} className="mb-2">
                  <FormGroup>
                    <Label for="minHoursWorked" className="font-weight-bold">Min Hours Worked</Label>
                    <Input type="number" id="minHoursWorked" value={minHoursWorked} onChange={(e) => setMinHoursWorked(e.target.value)} placeholder="Min Hours Worked" />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      )}

      {/* Calendar Section */}
      <Row className="justify-content-center mb-4">
        <Col md="12">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={({ date, view }) =>
              view === "month" ? (
                <div className="text-center attendance-tile">
                  <p className="text-success">
                    Present: {getFilteredAttendance(date, selectedPosition).presentCount}/{getFilteredAttendance(date, selectedPosition).totalPositionCount}
                  </p>
                  <p className="text-danger">
                    Absent: {getFilteredAttendance(date, selectedPosition).absentCount}/{getFilteredAttendance(date, selectedPosition).totalPositionCount}
                  </p>
                  <Button
                    color="info"
                    onClick={() => toggleDetailsModal(date)}
                    size="sm"
                  >
                    Details
                  </Button>
                </div>
              ) : null
            }
          />
        </Col>
      </Row>

      {/* Details Modal */}
      <Modal isOpen={showDetailsModal} toggle={toggleDetailsModal}>
        <CardBody>
          <CardTitle tag="h5">Attendance Details</CardTitle>
          <CardText>
            Present: {attendanceDetails.presentCount}/{attendanceDetails.totalPositionCount}
          </CardText>
          <CardText>
            Absent: {attendanceDetails.absentCount}/{attendanceDetails.totalPositionCount}
          </CardText>
          <CardText>
            Total Hours Worked: {attendanceDetails.totalHoursWorked}
          </CardText>
          <CardText>
            Fraction of ETP: {attendanceDetails.totalFraction} (ETP)
          </CardText>
          <Button color="secondary" onClick={toggleDetailsModal}>
            Close
          </Button>
        </CardBody>
      </Modal>
    </Container>
  );
};

export default AttendanceCalendar;
