import { Service } from "@services/Service";
import { ILoan } from "src/interfaces/interfaces";
import { Book } from "src/models/Book";
import { Loan } from "src/models/Loan";

export class LoanService extends Service<ILoan> {
  constructor() {
    super(Loan);
  }

  override async getAll(): Promise<ILoan[]> {
    return this.model.find().populate('member book');
  }

  override async create(data: Partial<ILoan>): Promise<ILoan> {
    const loan = await super.create(data);
    await Book.findByIdAndUpdate(loan.book, {
      $inc: {
        availableCopies: -1,
      },
    });
    return loan;
  }

  override async delete(id: string): Promise<ILoan | null> {
    const loan = await super.delete(id);
    if (loan) {
      await Book.findByIdAndUpdate(loan.book, {
        $inc: {
          availableCopies: 1,
        },
      });
    }
    return loan;
  }
}
