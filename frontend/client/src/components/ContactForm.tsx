import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import createContact from './requests/post/createContact';
import { ContactError } from './types/ContactError';
import { Contact } from "./types/Contact";

interface Props{
    addContact: (newContact: Contact) => void;
}  

function ContactForm({ addContact }: Props){

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [nameError, setNameError] = useState("");
    const [numberError, setNumberError] = useState("");

    const handleSubmit = () => {
        createContact(name, number)
         .then((response) => response.json())
         .then((data) => {
            
            if(!data.violations) {
                setNameError("");
                setNumberError("");

                const newContact: Contact = {
                    id: data.id,
                    name: name,
                    number: number
                };

                addContact(newContact);

            } else {
                data.violations.forEach((error: ContactError) => {
                    if (error.fieldName == "name") {
                        setNameError(error.message)
                    }
                    if (error.fieldName == "number") {
                        setNumberError(error.message)
                    }
                })
            }
         })
         .catch((err) => {
            console.log(err);
         });

        setName("");
        setNumber("");
    }

    return (
        <div>
            <Typography variant="h4" sx={{ mb: '2rem' }}>
                Contact Form
            </Typography>
            <form>
                <TextField
                    id="standard-textarea"
                    label="Name"
                    multiline
                    variant="standard"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    sx={{ mb: '0.7rem' }}
                    helperText={(nameError.length > 0) ? nameError : null}
                    error={(nameError.length > 0) ? true : false}
                />
                <br />
                <TextField
                    id="standard-search"
                    label="Phone number"
                    type="search"
                    variant="standard"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    sx={{ mb: '1.2rem' }}
                    helperText={(numberError.length > 0) ? numberError : null}
                    error={(numberError.length > 0) ? true : false}
                />
                <br />
                <Button variant="contained" onClick={handleSubmit} sx={{ mb: '2rem' }}>
                    Create
                </Button>
            </form>
        </div>
    );
}

export default ContactForm;