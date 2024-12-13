import { prisma } from "../utils"; 


export async function getAllParkings() {
  try {
    return await prisma.parking.findMany(); 
  } catch (error) {
    console.error('Error fetching parkings:', error);
    throw new Error('Could not fetch parkings.');
  }
}


export async function getParkingById(id: number) {
  try {
    return await prisma.parking.findUnique({
      where: { id }, 
    });
  } catch (error) {
    console.error(`Error fetching parking with id ${id}:`, error);
    throw new Error('Could not fetch parking.');
  }
}


export async function createParking(data: {
  title: string;
  spots: number;
  status: 'PAID' | 'FREE'; 
  guarded: boolean;
}) {
  try {
    return await prisma.parking.create({
      data,
    });
  } catch (error) {
    console.error('Error creating parking:', error);
    throw new Error('Could not create parking.');
  }
}


export async function updateParking(id: number, data: {
  title?: string;
  spots?: number;
  status?: 'PAID' | 'FREE';
  guarded?: boolean;
}) {
  try {
    return await prisma.parking.update({
      where: { id }, 
      data, 
    });
  } catch (error) {
    console.error(`Error updating parking with id ${id}:`, error);
    throw new Error('Could not update parking.');
  }
}

export async function deleteParking(id: number) {
  try {
    return await prisma.parking.delete({
      where: { id }, 
    });
  } catch (error) {
    console.error(`Error deleting parking with id ${id}:`, error);
    throw new Error('Could not delete parking.');
  }
}
