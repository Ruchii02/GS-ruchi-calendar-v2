import React, { useState } from 'react';
import { Calendar, momentLocalizer, SlotInfo, EventProps, EventPropGetter, ToolbarProps } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addEvent, updateEvent, deleteEvent, CalendarEvent } from '../redux/calendarSlice';
import FormModal from './FormModal';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const localizer = momentLocalizer(moment);

const months = moment.months();

const DragAndDropCalendar = withDragAndDrop(Calendar);

const EmptyHeader: React.FC<ToolbarProps<object>> = () => {
  return <div className="rbc-toolbar" />;
};

const ConfirmationDialog: React.FC<{ onConfirm: () => void; onCancel: () => void; }> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full opacity-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Delete Event</h2>
        <p className="text-gray-700 mb-4">Are you sure you want to delete this event?</p>
        <div className="flex justify-between">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Schedule() {
  const events = useAppSelector((state: { calendar: { events: CalendarEvent[] } }) => state.calendar.events);
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
 
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
    setShowModal(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (selectedSlot) {
      const newEvent: CalendarEvent = {
        id: Math.random().toString(),
        exerciseName: formData.exerciseName,
        trainerName: formData.trainerName,
        start: new Date(selectedSlot.start),
        end: new Date(selectedSlot.end),
        period: formData.period,
        customerName: formData.customerName,
        currentDate: new Date().toISOString(),
        userPicture: formData.userPicture || '',
      };
      dispatch(addEvent(newEvent));
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const years = [];
    for (let i = startYear; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  };

  const startOfMonth = new Date(selectedYear, selectedMonth, 1);

  const eventRenderer: React.FC<EventProps<object>> = (props) => {
    const event = props.event as CalendarEvent;

    const handleDeleteClick = () => {
      setConfirmDelete(event.id);
    };

    const handleDeleteConfirm = () => {
      if (confirmDelete) {
        dispatch(deleteEvent(confirmDelete));
        setConfirmDelete(null);
      }
    };

    const handleDeleteCancel = () => {
      setConfirmDelete(null);
    };

    return (
      <div className="p-2 rounded-lg text-white relative">
        <div className="font-bold">{event.exerciseName}</div>
        <div>{event.start.toLocaleTimeString()}-{event.end.toLocaleTimeString()} {event.period}</div>
        <div>{event.trainerName}(trainer)</div>
        <div className="flex items-center mt-2">
          <img src={event.userPicture || 'default-user.png'} alt="user" className="w-6 h-6 rounded-full mr-2" />
          <span>{event.customerName}</span>
        </div>
        {confirmDelete === event.id && (
          <ConfirmationDialog 
            onConfirm={handleDeleteConfirm} 
            onCancel={handleDeleteCancel} 
          />
        )}
        {!confirmDelete && (
          <button 
            onClick={handleDeleteClick} 
            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
          >
            x
          </button>
        )}
      </div>
    );
  };

  const eventStyleGetter: EventPropGetter<object> = (event) => {
    const calendarEvent = event as CalendarEvent;
    const style = {
      backgroundColor: '#7b2cbf',
      borderRadius: '5px',
      opacity: 0.9,
      color: 'white',
      display: 'block',
      padding: '10px',
      minHeight:'50px'
    };
    return { style };
  };

  interface EventInteractionArgs {
    event: any;
    start: Date | string;
    end: Date | string;
  }

  const toDate = (value: Date | string): Date => {
    return typeof value === 'string' ? new Date(value) : value;
  };

  const handleEventResize = ({ event, start, end }: EventInteractionArgs) => {
    const calendarEvent = event as CalendarEvent;
    const updatedEvent = {
      ...calendarEvent,
      start: toDate(start),
      end: toDate(end),
    };
    dispatch(updateEvent(updatedEvent));
  };

  const handleEventDrop = ({ event, start, end }: EventInteractionArgs) => {
    const calendarEvent = event as CalendarEvent;
    const updatedEvent = {
      ...calendarEvent,
      start: toDate(start),
      end: toDate(end),
    };
    dispatch(updateEvent(updatedEvent));
  };
 

  return (
    <div className="dark:bg-gray-800 p-4">
      <h1 className="text-lg mb-4">Workout Schedule</h1>
      
      {/* Year and Month Selectors with Buttons */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <select value={selectedYear} onChange={handleYearChange} className="border p-2 rounded">
            {getYearOptions().map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select value={selectedMonth} onChange={handleMonthChange} className="border p-2 rounded">
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <button className="border p-2 rounded ml-2">Year</button>
        <button className="border p-2 rounded ml-2">Month</button>
      </div>

      {/* Calendar */}
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor={(event) => (event as CalendarEvent).start}
        endAccessor={(event) => (event as CalendarEvent).end}
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="month"
        date={startOfMonth}
        components={{
          event: eventRenderer,
          toolbar: EmptyHeader,
        }}
        eventPropGetter={eventStyleGetter}
        onEventResize={handleEventResize}
        onEventDrop={handleEventDrop}
        resizable
        draggableAccessor={() => true} 
      />
      

      {/* Form Modal */}
      {showModal && (
        <FormModal isOpen={showModal} onSubmit={handleFormSubmit} onClose={handleCloseModal} />
      )}
    </div>
  );
}
