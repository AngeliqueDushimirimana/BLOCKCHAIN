import React, { useState, useEffect } from 'react';
import { ICT_backend } from 'declarations/ICT_backend';
import './index.scss';

function App() {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', iemail: '' });

  const fetchStudents = async () => {
    try {
      const studentsList = await ICT_backend.getStudents();
      console.log("Fetched students:", studentsList);
      setStudents(studentsList);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };
  const handleAddStudent = async (event) => {
    event.preventDefault();
    console.log("Submitting student:", newStudent);

    try {
      await ICT_backend.addStudent(newStudent.firstName, newStudent.lastName, newStudent.iemail);
      console.log("Student added successfully");
      setNewStudent({ firstName: '', lastName: '', iemail: '' });
      setShowAddStudentForm(false);
      fetchStudents(); // Fetch students after adding a new student
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  const handleFetchStudents = () => {
    fetchStudents();
    setShowAddStudentForm(false); // Close the add student form when fetching students
    
  };
  return (
    <main>
      <h1>Student Registration Form</h1>
      
      <>
          <button onClick={() => setShowAddStudentForm(true)}>Register a Student</button>
          <button onClick={handleFetchStudents}>Fetch Students</button>
          <h2>Student List</h2>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {student.firstName} {student.lastName} - {student.iemail}
              </li>
            ))}
          </ul>
          {showAddStudentForm && (
            <form onSubmit={handleAddStudent}>
              <label>
                FirstName:
                <input
                  type="text"
                  value={newStudent.firstName}
                  onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                  required
                />
</label>
              <label>
                LastName:
                <input
                  type="text"
                  value={newStudent.lastName}
                  onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                  required
                />
              </label>
              <label>
                iemail:
                <input
                  type="email"
                  value={newStudent.iemail}
                  onChange={(e) => setNewStudent({ ...newStudent, iemail: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Submit Student</button>
            </form>
          )}
        </>
      
    </main>
  );
}

export default App;