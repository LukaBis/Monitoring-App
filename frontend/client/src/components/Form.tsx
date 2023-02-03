import React, { useEffect } from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import sendMessage from './requests/post/sendMessage';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import getAllContacts from "./requests/get/getAllContacts";
import { Contact } from "./types/Contact";
import './style/Form.css';

function Form(){

    const [textMessage, setTextMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState('');

    useEffect(() => {
        getAllContacts().then(contacts => {
            setContacts(contacts);
        });
    }, [])

    const handleSubmit = () => {
        sendMessage(textMessage, phoneNumber, selectedContact);
        setTextMessage("");
        setPhoneNumber("");
        setSelectedContact("");
    }

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        setSelectedContact(event.target.value as string);
    };

    return (
        <div className="form">
            <form>
                <TextField
                    id="standard-textarea"
                    label="Text message"
                    placeholder="Text message"                  
                    variant="standard"
                    value={textMessage}
                    onChange={e => setTextMessage(e.target.value)}
                    sx={{ mb: '0.7rem' }}
                />
                <br />
                <TextField
                    id="standard-search"
                    label="Phone number"
                    type="search"
                    variant="standard"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    sx={{ mb: '1.2rem' }}
                />
                <br />
                <FormControl variant="standard" sx={{ mb: 3, minWidth: 120 }} className="status-select-container">
                    <InputLabel id="contact-select-label">Choose Contact</InputLabel>
                    <Select
                        labelId="contact-select-label"
                        id="contact-select"
                        value={selectedContact}
                        label="Contact"
                        onChange={handleChange}
                        variant="standard"
                    >
                        {
                            contacts.map(contact => (
                                <MenuItem value={contact.id} key={contact.id}>
                                    {contact.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <br />
                <Button variant="contained" onClick={handleSubmit}>Send</Button>
            </form>
        </div>
    );
}

export default Form;