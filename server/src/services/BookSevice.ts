import { Service } from "@services/Service";
import { IBook } from "src/interfaces/interfaces";
import { Book } from "src/models/Book";
import { Loan } from "src/models/Loan";

export class BookService extends Service<IBook> {
  constructor() {
    super(Book);
  }
  override async delete(id: string): Promise<IBook | null> {
    const book = await super.delete(id);
    if (book) await Loan.deleteMany({ book: id });
    return book;
  }
}
