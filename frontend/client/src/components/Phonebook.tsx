import React, { useEffect } from "react";
import { useState } from "react";
import './style/Phonebook.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import getAllContacts from './requests/get/getAllContacts';
import type { Contact } from './types/Contact';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import ContactForm from './ContactForm';
import deleteContact from "./requests/delete/deleteContact";
import CircularProgress from '@mui/material/CircularProgress';

function createData(
    id: string,
    bulkId: string,
    text: string,
    phonenumber: string,
    contact: string,
    statusGroupName: string
  ) {
    return { id, bulkId, text, phonenumber, contact, statusGroupName };
}

function Phonebook(){
    
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        getAllContacts().then(contactList => {
            setContacts(contactList);
        });
    }, [])

    const triggerContactLoader = (id: number, isLoading: boolean) => {
        const updatedContacts = contacts.map(c => {
            if (c.id == id) {
                c.loading = isLoading;
            }

            return c;
        });
        setContacts(updatedContacts);
    }

    const handleDeleteContact = (id: number) => {
        triggerContactLoader(id, true);        

        deleteContact(id)
        .then((response) => response.json())
         .then((data) => {
            if (data == 'OK') {
                const newContacts = contacts.filter(c => c.id != id);
                setContacts(newContacts);
            } else {
                // in case of BAD_REQUEST
                alert('Something went wrong');
                triggerContactLoader(id, false);
            }
         })
         .catch((err) => {
            triggerContactLoader(id, false);
            alert('Something went wrong');
         });
    }

    return (
        <div className="messages-table">
            <Typography variant="h4" sx={{ mb: '2rem' }}>
                Your Phonebook
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: '2rem' }}>
                At some point you will get <b>tired of manually typing
                phone numbers</b> in message form. Don't worry! We got your back.
                Save the phone numbers and names here, in your phonebook.<br/>
                Next time you want to send a message, instead of typing a number just
                use contact from your phonebook.
            </Typography>

            <ContactForm addContact={(newContact: Contact) => setContacts([...contacts, newContact])} />
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Contact name</TableCell>
                        <TableCell align="center">Phone number</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {contacts.map((row) => (
                        <TableRow
                        key={row.number}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.number}</TableCell>
                            <TableCell align="right">
                                {
                                    row.loading
                                    ?  <CircularProgress />
                                    : <Button
                                        onClick={e => handleDeleteContact(row.id)}
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                      >
                                        Delete
                                      </Button>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Phonebook;