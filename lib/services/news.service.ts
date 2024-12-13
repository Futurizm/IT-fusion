import { prisma } from "../utils";

export async function createNews(title: string, description: string, date: Date, photoImg: string) {
  return prisma.news.create({
    data: {
      title,
      description,
      date,
      photoImg,
    },
  });
}

export async function getAllNews() {
  return prisma.news.findMany();
}

export async function getNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id },
  });
}

export async function updateNews(
  id: number,
  title?: string,
  description?: string,
  date?: Date,
  photoImg?: string
) {
  return prisma.news.update({
    where: { id },
    data: {
      title,
      description,
      date,
      photoImg,
    },
  });
}

export async function deleteNews(id: number) {
  return prisma.news.delete({
    where: { id },
  });
}