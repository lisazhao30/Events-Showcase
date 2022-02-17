import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import "../css/eventscard.css";

const EventsCard = ({eventName, eventDescription, speakerName, startTime, endTime, publicUrl}) => {

    const monthDay = new Date(startTime).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
    })

    const eventStart = new Date(startTime).toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
    })
    
    const eventEnd = new Date(endTime).toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
    })
    const speakerToCapital = speakerName.toUpperCase();

    const monthDayToCapital = monthDay.toUpperCase();

    const StyledName = styled(Typography)({
        fontFamily: 'Montserrat',
        fontWeight: 600,
    })

    const StyledEventName = styled(Typography)({
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontStyle: 'italic',
    })

    const StyledTime = styled(Typography)({
        fontFamily: 'Montserrat',
        fontStyle: 'bold',
    })

    const StyledDescription = styled(Typography)({
        fontFamily: 'Montserrat',
        fontWeight: 400,
    })

    const StyledButton = styled(Button)({
        borderRadius: 0,
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        backgroundColor: '#000000',
        width: '8vw',
        '&:hover': {
            borderColor: '#000000',
            border: 2,
            backgroundColor: '#C7DDED',
            color: '#232428',
        }
    });

    return (
        <div>
            <Grid container justifyContent="center" direction="row" columnSpacing={2} alignItems="stretch" className="eventsCard">
                <Grid item xs={2} className ="eventDateContainer"
                sx = {{
                    borderColor: '#FFFFFF',
                    borderBottom: 1,
                    borderTop: 1,
                    borderLeft: 1,
                }}>
                    <StyledName variant="h5" className="eventDate">
                        {monthDayToCapital}
                    </StyledName>
                </Grid>
                <Grid item xs={6} className="descriptionContainer"
                sx = {{
                    borderColor: '#FFFFFF',
                    borderBottom: 1,
                    borderTop: 1,
                }}>
                    <StyledEventName variant="h5">
                        {eventName}
                    </StyledEventName>
                    <StyledTime variant="h6">
                        {eventStart} - {eventEnd}
                    </StyledTime>
                    <StyledDescription variant="body1" className="description">
                        {eventDescription}
                    </StyledDescription>
                    <a href= {publicUrl}>
                        <StyledButton>Sign up!</StyledButton>
                    </a>
                </Grid>
                <Grid item xs={2} className="speakerContainer"
                sx = {{
                    borderColor: '#FFFFFF',
                    borderBottom: 1,
                    borderTop: 1,
                    borderRight: 1,
                }}>
                    <StyledName variant="h5" align="center" className="speaker">
                        {speakerToCapital}
                    </StyledName>
                </Grid>
            </Grid>
        </div>
    )
}

export default EventsCard
