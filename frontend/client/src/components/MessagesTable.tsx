import React, { useEffect, useRef } from "react";
import { useState } from "react";
import './style/MessagesTable.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import getAllMessages from './requests/get/getAllMessages';
import type { Message } from './types/Message';
import { BiEdit } from 'react-icons/bi';
import ChangeStatusPopup from './ChangeStatusPopup';
import { PopupData } from "./types/PopupData";
import changeMessageStatus from "./requests/patch/changeMessageStatus";
import { CircularProgress } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import SetStatusFilterPopup from "./SetStatusFilterPopup";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SetContactFilterPopup from "./SetContactFilterPopup";

const convertTimestampFormat = (timestamp: string) => {
    let date = new Date(timestamp);

    let options: Intl.DateTimeFormatOptions = { 
        hour: 'numeric', 
        minute: 'numeric', 
        day: 'numeric', 
        month: 'numeric', 
        year: 'numeric' 
    };

    return date.toLocaleString('en-US', options);
}

enum Sort {
    ASC = "ascending",
    DESC = "descending",
}

function MessagesTable(props: { numberOfMessages?: number; }) {
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [sortByDateTrigger, setSortByDateTrigger] = useState(Sort.DESC);
    const didMount = useRef(true);
    const [statusPopupData, setStatusPopupData] = useState<PopupData>({
        open: false,
        messageId: "",
        status: {
            name: "",
            id: undefined
        }
    });
    const [filterStatusPopupData, setFilterStatusPopupData] = useState({
        open: false,
        show: "ANY"
    });
    const [filterContactPopupData, setFilterContactPopupData]= useState({
        open: false,
        show: "ANY"
    });

    const passFilterRequirements = (message: Message) => {
        let pass: boolean = true;
        
        if(message.statusGroupName != filterStatusPopupData.show && filterStatusPopupData.show != "ANY") return false;
        if(message.contactName != filterContactPopupData.show && filterContactPopupData.show != "ANY" && filterContactPopupData.show != "None") return false;
        if (filterContactPopupData.show == "None" && message.contactName) return false;

        return pass;
    }

    const handleSortByDate = () => {
        // trigger
        (sortByDateTrigger == Sort.DESC) ? setSortByDateTrigger(Sort.ASC) : setSortByDateTrigger(Sort.DESC);
        // after this is triggered useEffect will take care of sorting the messages
    }

    useEffect(() => {
        // prevent running this on initial render
        if (didMount.current) {
            didMount.current = false;
            return;
        }

        let newMessages: Message[] = [...messages];

        if (sortByDateTrigger == Sort.DESC) {
            setMessages(
                newMessages.sort((a,b) => new Date(b.created).getTime() - new Date(a.created).getTime())
            );
        } else {            
            setMessages(
                newMessages.sort((a,b) => new Date(a.created).getTime() - new Date(b.created).getTime())
            );
        }
        
    }, [sortByDateTrigger])
    

    const handleOpenChangeStatusPopup = (currentStatusName: string, currentStatusId: number, messageId: string) => {
        setStatusPopupData({
            open: true,
            messageId,
            status: {
                name: currentStatusName,
                id: currentStatusId
            }
        });
    };

    const addLoaderForMessageThatIsChangingStatus = (messageId: string) => {
        // Add loader for message whose status is about to change
        messages.forEach((mess, index, arr) => {
            if(mess.id == messageId) {
                arr[index].statusGroupName = "Loading...";
                return;
            }
        })
    }

    const showUpdatedStatusInTable = (newStatusName: string, messageId: string) => {
        const updatedMessages: Message[] = messages.map((mess, index, arr) => {
            if(mess.id == messageId) {
                mess.statusGroupName = newStatusName;
                return mess;
            }

            return mess;
        });

        setMessages(updatedMessages);
    }

    const handleClose = (newStatusName?: string, newStatusId?: number, messageId?: string) => {  
        
        if (newStatusId && newStatusName && messageId) {

            const oldStatus = statusPopupData.status.name;

            setStatusPopupData({
                open: false,
                messageId,
                status: {
                    name: newStatusName,
                    id: newStatusId
                }
            });

            addLoaderForMessageThatIsChangingStatus(messageId);

            changeMessageStatus(messageId, newStatusId)
            .then((response) => response.json())
            .then((data) => {
               if (data == 'OK') {
                    // make new status be shown in table  
                    showUpdatedStatusInTable(newStatusName, messageId);
               } else {
                    // in case of BAD_REQUEST
                    showUpdatedStatusInTable(oldStatus, messageId);
                    alert('Something went wrong');
               }
            })
            .catch((err) => {
               console.log(err.message);
               showUpdatedStatusInTable(oldStatus, messageId);
               alert('Something went wrong on the server');
            });

            return;
        }

        setStatusPopupData({
            open: false,
            messageId: "",
            status: {
                name: "",
                id: undefined
            }
        });
    };

    useEffect(() => {
        getAllMessages(props.numberOfMessages).then(messageList => {
            setMessages(messageList);
        });
    }, [])

    const handleCloseStatusFilterPopup = (newStatusFilter?: string) => {
        if (newStatusFilter) {
            setFilterStatusPopupData({
                show: newStatusFilter,
                open: false
            });

            return;
        }

        setFilterStatusPopupData({
            show: filterStatusPopupData.show,
            open: false
        });
    }

    const handleClickFilterStatus = () => {
        setFilterStatusPopupData({
            open: true,
            show: filterStatusPopupData.show
        });
    }

    const handleCloseContactFilterPopup = (newContactFilter?: string) => {
        if (newContactFilter) {
            setFilterContactPopupData({
                show: newContactFilter,
                open: false
            });

            return;
        }

        setFilterContactPopupData({
            show: filterContactPopupData.show,
            open: false
        });
    }

    const handleClickFilterContact = () => {
        setFilterContactPopupData({
            open: true,
            show: filterContactPopupData.show
        });
    }

    return (
        <div className="messages-table">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">BulkId</TableCell>
                            <TableCell align="right">Text</TableCell>
                            <TableCell align="right">Phone number</TableCell>
                            <TableCell align="right" className="min-width-cell">
                                <FilterAltIcon
                                    className="filter-icon"
                                    sx={{ mr: 1, mt: 0 }} 
                                    onClick={handleClickFilterContact}
                                    fontSize="small"                            
                                />
                                Contact name
                            </TableCell>
                            <TableCell align="right" className="min-width-cell">
                                <SortIcon 
                                sx={{ mr: 1 }} 
                                className="filter-icon" 
                                color={(sortByDateTrigger == Sort.ASC) ? "primary" : "inherit"} 
                                onClick={handleSortByDate}
                                fontSize="small"
                                />
                                Created
                            </TableCell>
                            <TableCell align="right" className="min-width-cell">
                                <FilterAltIcon
                                    className="filter-icon"
                                    sx={{ mr: 1 }} 
                                    onClick={handleClickFilterStatus} 
                                    fontSize="small"                           
                                />
                                Status
                            </TableCell>
                            <TableCell align="right">Change status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {messages.map((row) => (
                        (passFilterRequirements(row)) && (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell align="right">{row.bulkId ? row.bulkId : "None"}</TableCell>
                                <TableCell align="right">{row.text}</TableCell>
                                <TableCell align="right">{row.phonenumber}</TableCell>
                                <TableCell align="center">{row.contactName ? row.contactName: "None"}</TableCell>
                                <TableCell align="right">{convertTimestampFormat(row.created)}</TableCell>
                                <TableCell align="right">{row.statusGroupName != "Loading..." ? row.statusGroupName : <CircularProgress/> }</TableCell>
                                <TableCell align="right">
                                    <BiEdit
                                        style={{
                                            fontSize: "22px",
                                            cursor: "pointer"
                                        }}
                                        onClick={ () => handleOpenChangeStatusPopup(row.statusGroupName, row.statusId, row.id) }
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ChangeStatusPopup
                id="change-status-popup"
                keepMounted
                value={statusPopupData.status.name}
                statusid={statusPopupData.status.id}
                messageid={statusPopupData.messageId}
                open={statusPopupData.open}
                onClose={handleClose}
            />

            <SetStatusFilterPopup
                id="filter-status-popup"
                keepMounted
                value={filterStatusPopupData.show}
                open={filterStatusPopupData.open}
                onClose={handleCloseStatusFilterPopup}
            />

            <SetContactFilterPopup
                id="filter-status-popup"
                keepMounted
                value={filterContactPopupData.show}
                open={filterContactPopupData.open}
                onClose={handleCloseContactFilterPopup}
            />
        </div>
    );
}

export default MessagesTable;