import { prisma } from "../utils";

export async function getAllEvents() {
  try {
    return await prisma.events.findMany();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Could not fetch events.');
  }
}

export async function getEventById(id: number) {
  try {
    return await prisma.events.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error);
    throw new Error('Could not fetch event.');
  }
}

export async function createEvent(data: {
  title: string;
  description: string;
  date: Date;
  photoImg?: string;
}) {
  try {
    return await prisma.events.create({
      data,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Could not create event.');
  }
}

export async function updateEvent(
  id: number,
  data: {
    title?: string;
    description?: string;
    date?: Date;
    photoImg?: string;
  }
) {
  try {
    return await prisma.events.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error(`Error updating event with id ${id}:`, error);
    throw new Error('Could not update event.');
  }
}

export async function deleteEvent(id: number) {
  try {
    return await prisma.events.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting event with id ${id}:`, error);
    throw new Error('Could not delete event.');
  }
}