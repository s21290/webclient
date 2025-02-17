import { useState } from "react";
import { Container } from "react-bootstrap";
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import plLocale from '@fullcalendar/core/locales/pl';
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../../hooks/usePopup";
import SchedulePopup from "../../fragments/popups/SchedulePopup";


const ScheduleList = () => {
  const navigate = useNavigate();
  const popup = usePopup();
  const [events] = useState([
    {
        id: '0',
        title: 'Jan Nowak',
        start: new Date('2023-01-02T08:00:00.000'),
        end: new Date('2023-01-02T16:00:00.000'),
        url:'/paramedic/1'
    },
    {
      id: '1',
      title: 'Jan Nowak',
      start: new Date('2023-01-02T16:00:00.000'),
      end: new Date('2023-01-02T24:00:00.000'),
      url:'/paramedic/1'
  },
  {
    id: '2',
    title: 'Paramedic 3',
    start: new Date('2022-11-22T24:00:00.000'),
    end: new Date('2022-11-23T08:00:00.000'),
    url:'/paramedic/1'

},
{
  id: '3',
  title: 'Paramedic 4',
  start: new Date('2022-11-23T08:00:00.000'),
  end: new Date('2022-11-23T16:00:00.000'),
  url:'/paramedic/1'

},
{
  id: '4',
  title: 'Paramedic 5',
  start: new Date('2022-11-22T24:00:00.000'),
  end: new Date('2022-11-23T08:00:00.000'),
  url:'/paramedic/1'

}

  ]);
  const handleDateSelect=()=>{
    navigate('./add')
  };

const handleEventSelect=(eventInfo:EventClickArg)=>{
  console.log(eventInfo.event.id)
  const startTime = eventInfo.event.startStr;
  const endTime = eventInfo.event.endStr;
  const url = eventInfo.event.url;
  if(eventInfo.event.url){

    eventInfo.jsEvent.preventDefault();
    console.log(startTime)
  popup(<SchedulePopup onSave={function (start: string, end: string): void {
    throw new Error("Function not implemented.");
  } } startTime={startTime} endTime={endTime}  /> );
  }

  
}

  return (
    <Container className="mb-2 text-center">
      <h1>Grafik ratowników</h1>
      <FullCalendar
        plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]}
        initialView= 'dayGridWeek'
        displayEventTime
        dateClick={handleDateSelect }
        eventClick={handleEventSelect}
        selectable={false}
        editable={true}
        displayEventEnd={true}
        initialEvents={events}
        firstDay={1}
        expandRows={true}
        locale={plLocale}
        headerToolbar={{
          left: "today prev next",
          center: "title",
          right: "dayGridMonth dayGridWeek",
        }}
        

        

        
        
      />
      
    </Container>
  );
};

export default ScheduleList;


