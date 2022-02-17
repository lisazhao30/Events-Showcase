import axios from 'axios';
import {useEffect, useState} from 'react';
import PrivateEventsCard from './privateeventscard';

const PrivateEvents = () => {
    const [eventState, setEvent] = useState([]);
    
    const getEvents = async () => {
        const getData = async () => {
            try {
                const events = await axios.get('https://api.hackthenorth.com/v3/events');
                setEvent(events.data);
                console.log(events);

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

    const privateEvents = sortedEvents.filter(({permission}) => permission === "private");


    useEffect(() => { 
        getEvents(); 
    }, []);

    return ( 
        <div>
            <div className="privateEvents">
                {privateEvents.map((event) => {
                    const { id, name: eventName2, event_type, start_time, end_time, description, private_url} = event;
                    return (
                        <PrivateEventsCard
                            eventId={id}
                            eventDate={start_time}
                            eventName={eventName2}
                            eventType={event_type}
                            startTime={start_time}
                            endTime={end_time}
                            eventDescription={description}
                            privateUrl={private_url}
                        />
                    ); 
                })}
            </div>
        </div>
    )
}

export default PrivateEvents