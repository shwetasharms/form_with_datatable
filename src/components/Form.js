import React from "react";
import { Grid, TextField, Button, Card, CardContent, Typography, CardHeader } from '@mui/material';


function Form({ formData, handleChange, handleFileChange, handleKeyDown, handleSubmit, errors, refs, isEditing, handleCancelEdit, }) {
    return (
        <Card sx={{ width: { xs: '90%', sm: '70%', md: '50%' }, boxShadow: 5 }}>
            <CardHeader title="Form" />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                inputRef={refs.nameRef}
                                onKeyDown={(event) => handleKeyDown(event, refs.emailRef)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                inputRef={refs.emailRef}
                                onKeyDown={(event) => handleKeyDown(event, refs.phoneRef)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                error={!!errors.phone}
                                helperText={errors.phone}
                                inputRef={refs.phoneRef}
                                onKeyDown={(event) => handleKeyDown(event, refs.fileRef)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                inputRef={refs.fileRef}
                            >
                                Upload PDF
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {errors.file && (
                                <Typography color="error">{errors.file}</Typography>
                            )}
                            {formData.file && <Typography>{formData.file.name}</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                {isEditing ? 'Save' : 'Submit'}
                            </Button>
                            {isEditing && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={handleCancelEdit}
                                    sx={{ mt: 2 }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}
export default Form;