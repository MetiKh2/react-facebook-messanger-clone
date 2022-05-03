import React,{forwardRef} from 'react';
import {Card, CardActions, CardContent, Typography, ListItem, ListItemButton, ListItemText} from "@mui/material";

const Message = forwardRef(({message,username},ref) => {
    const isUser=username===message.username;
    return (
        <div ref={ref} className={`message-card ${isUser&&'message-user'}`}>
            <Card  className={`${isUser?'message-usercard':'message-guestcard'}`}>
                <CardContent>
                    <Typography color={'black'} variant={'h5'} component={'h2'}>
                        {!isUser&& (message.username||'Unknown User')+' : '} { message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
});

export default Message;