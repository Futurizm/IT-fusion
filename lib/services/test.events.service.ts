import { createEvent, getAllEvents, getEventById, updateEvent } from "./events.service";

createEvent({
  title: 'New Event',
  description: 'New Event Description',
  date: new Date(),
  photoImg: 'new-photo.jpg',
}).then(newEvent => console.log(newEvent));


getAllEvents().then(events => console.log(events));

getEventById(1).then(event => console.log(event));

updateEvent(1, { title: 'Updated Event' }).then(updatedEvent => console.log(updatedEvent));

