import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Status } from './types/Status';

const options: Array<Status> = [
    {
        statusGroupName: 'DELIVERED',
        id: 5
    },
    {
        statusGroupName: 'REJECTED',
        id: 10000
    }
];

export interface ConfirmationDialogRawProps {
    id: string;
    keepMounted: boolean;
    value: string;
    open: boolean;
    statusid: number | undefined,
    messageid: string | undefined
    onClose: (value?: string, statusid?: number, messageid?: string) => void;
}

export default function ChangeStatusPopup(props: ConfirmationDialogRawProps) {
    const { onClose, value: valueProp, open, statusid: statusidProp, messageid, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const [statusid, setStatusid] = React.useState(statusidProp);
    const radioGroupRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        setValue(valueProp);
    }, [valueProp, open]);

    React.useEffect(() => {
        setStatusid(statusidProp);
    }, [statusidProp]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value, statusid, messageid);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let statusGroupName = (event.target as HTMLInputElement).value;
        let statusId = options.find(status => status.statusGroupName == statusGroupName)?.id;
        setValue(statusGroupName);
        setStatusid(statusId);
    };

    return (
        <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        {...other}
        >
            <DialogTitle>Message Status</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                ref={radioGroupRef}
                aria-label="ringtone"
                name="ringtone"
                value={value}
                onChange={handleChange}
                >
                {options.map((option) => (
                    <FormControlLabel
                    value={option.statusGroupName}
                    key={option.id}
                    control={<Radio />}
                    label={option.statusGroupName}
                    />
                ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}