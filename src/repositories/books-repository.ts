import { CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";
import prisma from "../database";

export async function getBooks() {
  const result = prisma.books.findMany();

  return result;
}

export async function getBook(id: number) {
  const result = prisma.books.findUnique({
    where: { id: id },
  });

  return result;
}

export async function createBook(book: CreateBook) {
  const { title, author, publisher, purchaseDate } = book;

  prisma.books.create({
    data: { author, publisher, purchaseDate, title },
  });
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;

  const result = prisma.books.update({
    data: { grade, review, read: true },
    where: { id: bookId },
  });

  return result;
}
