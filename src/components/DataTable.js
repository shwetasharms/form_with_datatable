import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function DataTable(props) {
    const { tableData, handleEdit, handleDelete }=props
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>File</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{data.phone}</TableCell>
                        <TableCell>{data.file ? data.file.name : 'N/A'}</TableCell>
                        <TableCell>
                            <IconButton
                                color="primary"
                                onClick={() => handleEdit(index)}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => handleDelete(index)}
                            >
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default DataTable;