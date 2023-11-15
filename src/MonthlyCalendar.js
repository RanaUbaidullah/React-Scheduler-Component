import React, { useState, useEffect } from 'react';
import './MonthlyCalendar.css';

const MonthlyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayedDate, setDisplayedDate] = useState('');

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = months[selectedDate.getMonth()];
      const selectedDay = selectedDate.getDate();
      setDisplayedDate(`${selectedYear}, ${selectedMonth}, ${selectedDay}`);
    }
  }, [selectedDate]);

  useEffect(() => {
    // Load events from local storage on component mount
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleSubmit = () => {
    if (!title || !description || !selectedDate) {
      alert('Please enter both title, description, and select a date.');
      return;
    }

    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = months[selectedDate.getMonth()];
    const selectedDay = selectedDate.getDate();

    // Format the date as "YYYY, MMM, D"
    const formattedDate = `${selectedYear}, ${selectedMonth}, ${selectedDay}`;

    // Handle the submission of title, description, and formatted date
    const newEvent = { date: formattedDate, title, description };
    setEvents([...events, newEvent]);
    setTitle('');
    setDescription('');
    setSelectedDate(null);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const selectedMonth = currentDate ? months[currentDate.getMonth()] : '';
  const selectedYear = currentDate ? currentDate.getFullYear() : '';

  const handleEditEvent = (eventToEdit) => {
    setTitle(eventToEdit.title);
    setDescription(eventToEdit.description);
    setSelectedDate(new Date(eventToEdit.date));
  };

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter((event) => event.date !== eventToDelete.date); // Compare by date
    setEvents(updatedEvents);
  };


  useEffect(() => {
    // Save events to local storage whenever events change
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  return (
    <div className="monthly-calendar">
      <div className="calendar-header">
        <div className="calendar-nav">
          <div className="arrow">
          <button className="prev-month" onClick={handlePrevMonth}><i class="ri-arrow-left-s-line"></i></button>
          <button className="next-month" onClick={handleNextMonth}><i class="ri-arrow-right-s-line"></i></button>
          </div>
          <span>{displayedDate ? displayedDate : `${selectedYear}, ${selectedMonth}`}</span>
        </div>
      </div>
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-of-week">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: 31 }, (_, index) => {
          const dayOfMonth = index + 1;
          const currentMonth = currentDate ? currentDate.getMonth() : 0;
          const currentDateInstance = new Date(selectedYear, currentMonth, dayOfMonth);
          const eventsForDate = events.filter((event) => {
            return event.date === `${selectedYear}, ${months[currentMonth]}, ${dayOfMonth}`;
          });
          return (
            <div
              key={index}
              className={`calendar-cell ${selectedDate && selectedDate.getDate() === dayOfMonth ? 'selected' : ''}`}
            >

              <div className="calendar-cell-div">
                <div> {dayOfMonth}</div>
                {eventsForDate.length > 0 && (
                  <div className="event-marker">
                    {eventsForDate.map((event, eventIndex) => (
                      <div className="event-marker-item"  key={eventIndex}>
                        <span >{event.title}</span>
                        <div className="icon">
                        <i style={{ color: 'purple' }} className="ri-pencil-fill" onClick={() => handleEditEvent(event)}></i>
                        <i style={{ color: 'purple' }} className="ri-delete-bin-fill" onClick={() => handleDeleteEvent(event)}></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div onClick={() => handleDateClick(currentDateInstance)} style={{ height: "100%" , width: "100%"}}></div>
              </div>

            </div>
          );
        })}
      </div>
      {selectedDate && (
        <div className="event-popup">
          <div className="popup-header">
            <strong>Selected Date:</strong>{displayedDate}
          </div>
          <div className="popup-content">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="submit-button" onClick={handleSubmit}>Submit</button>
            <button className="cancel-button" onClick={() => setSelectedDate(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyCalendar;
