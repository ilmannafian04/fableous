import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        outline: 'none',
        width: '50%',
        height: '40%',
        backgroundColor: '#F6F1D3',
        borderRadius: '46px',
    },
    paperInside: {
        background: '#7030A2',
        display: 'flex',
        borderRadius: '46px',
        width: '95%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    input: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#f6f1d3',
        '&:hover': {
            backgroundColor: '#f6f1d3',
        },
        '&$focused': {
            backgroundColor: '#f6f1d3',
        },
        width: '80%',
        height: '3rem',
    },
    resize: {
        fontSize: '30px',
        textAlign: 'center',
    },
    title: {
        fontSize: '80px',
        marginBlockEnd: '0',
        marginBlockStart: '0',
        color: 'white',
    },
    details: {
        fontSize: '20px',
        color: 'white',
        marginBlockStart: 0,
    },
}));
export default function SimpleModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.paper}>
            <div className={classes.paperInside}>
                <h1 className={classes.title}>Join Story</h1>
                <p className={classes.details}>Enter your six digit code</p>
                <TextField
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    className={classes.input}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Code"
                />
                <Button size="large" className="insideButton">
                    GO
                </Button>
            </div>
        </div>
    );

    return (
        <div>
            <Button type="button" size="large" className="insideButton" onClick={handleOpen}>
                Join Story
            </Button>
            <Modal
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={open}
                onClose={handleClose}
            >
                {body}
            </Modal>
        </div>
    );
}
