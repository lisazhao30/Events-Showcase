import axios from 'axios';
import {useEffect, useState} from 'react';
import EventsCard from './eventscard';

const PublicEvents = () => {
    const [eventState, setEvent] = useState([]);
    const [sortDate, setSortDate] = useState('date');
    const [searchQuery, setSearchQuery] = useState('');
    const getEvents = async () => {
        const getData = async () => {
            try {
                const events = await axios.get('https://api.hackthenorth.com/v3/events');
                setEvent(events.data);

            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
                else if (error.request) {
                    console.log(error.request);
                }
            }
        };
        getData();
    };

    const events = eventState;

    const sortedEvents = events.sort((a, b) => new Date(a.start_time).setHours(0, 0, 0, 0) - new Date(b.start_time).setHours(0, 0, 0 ,0));

    const publicEvents = sortedEvents.filter(({permission}) => permission === "public");

    const privateEvents = sortedEvents.filter(({ permission }) => permission === "private");

    const publicEventsModal = events.filter(({permission}) => permission === "public");


    useEffect(() => { 
        getEvents(); 
    }, []);

    const testing = () => {
        privateEvents.map((event) => {
            const { id, name: eventName2, event_type, start_time, end_time, description, private_url, speakers: [{name}], speakers: [{profile_pic}] } = event;
        })
    };

    return ( 
        <div>
            <div className="publicEvents">
                {publicEvents.map((event) => {
                    const { id, name: eventName2, event_type, start_time, end_time, description, public_url, speakers: [{name}], speakers: [{profile_pic}]} = event;
                    //console.log(events);
                    console.log({profile_pic});
                    return (
                        <div>
                        <EventsCard
                            eventId={id}
                            eventDate={start_time}
                            eventName={eventName2}
                            eventType={event_type}
                            startTime={start_time}
                            endTime={end_time}
                            eventDescription={description}
                            publicUrl={public_url}
                            speakerName={name}
                        />
                        </div>
                    ); 
                })}
            </div>
        </div>
    )
}

export default PublicEvents