// src/App.js

import React, { useRef, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import Form from './components/Form';
import DataTable from './components/DataTable';


const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const refs = {
    nameRef: useRef(),
    emailRef: useRef(),
    phoneRef: useRef(),
    fileRef: useRef(),
  };

  const handleKeyDown = (event, nextRef) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nextRef.current.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, file: e.target.files[0] }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is not valid';
    }
    if (!formData.file) {
      newErrors.file = 'PDF file is required';
    } else if (formData.file.type !== 'application/pdf') {
      newErrors.file = 'File must be a PDF';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      if (isEditing) {
        const updatedData = [...tableData];
        updatedData[editingIndex] = formData;
        setTableData(updatedData);
        setIsEditing(false);
        setEditingIndex(null);
        setSnackbar({ open: true, message: 'Data updated successfully' });
      } else {
        setTableData((prevData) => [...prevData, formData]);
        setSnackbar({ open: true, message: 'Form submitted successfully' });
      }
      setFormData({ name: '', email: '', phone: '', file: null });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleEdit = (index) => {
    setFormData(tableData[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
    setSnackbar({ open: true, message: 'Data deleted successfully' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCancelEdit = () => {
    setFormData({ name: '', email: '', phone: '', file: null });
    setIsEditing(false);
    setEditingIndex(null);
    setErrors({});
  };

  return (
    <Container>
     
      <Box my={4} display="flex" justifyContent="center">
        <Form
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleKeyDown={handleKeyDown}
          handleSubmit={handleSubmit}
          errors={errors}
          refs={refs}
          isEditing={isEditing}
          handleCancelEdit={handleCancelEdit}
        />
      </Box>
      <Box my={2}>
        <DataTable
          tableData={tableData}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
