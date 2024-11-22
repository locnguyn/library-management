"use client";
import { Book } from "@/components/Books";
import { ComboBox } from "@/components/ComboBox";
import { Member } from "@/components/Members";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import APIs, { Endpoint, getEndpoint } from "@/lib/APIs";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { ArrowLeftToLine, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Loan {
  _id: string;
  book: Partial<Book>;
  member: Partial<Member>;
  borrowDate: string;
  returnDate: string;
}

interface LoanToPost {
  _id: string;
  book: string;
  member: string;
  borrowDate: string;
}

export default function Loans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<LoanToPost>>({
    book: "",
    member: "",
    borrowDate: "",
  });
  const [editItem, setEditItem] = useState<LoanToPost | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const [memberComboBoxOpen, setMemberComboBoxOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");

  const [bookComboBoxOpen, setBookComboBoxOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    fetchLoans();
    fetchBooks();
    fetchMembers();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await APIs.get(getEndpoint(Endpoint.loans));
      setLoans(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await APIs.get(getEndpoint(Endpoint.books));
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await APIs.get(getEndpoint(Endpoint.members));
      setMembers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setEditItem(null);
    setFormData({
      book: "",
      member: "",
      borrowDate: "",
    });
  };

  const handleOpen = (item: LoanToPost | null = null) => {
    setOpen(true);
    if (item) {
      setFormData(item);
      setEditItem(item);
    } else {
      clearForm();
    }
  };

  const handleSubmit = async () => {
    try {
      if (editItem) {
        await APIs.patch(getEndpoint(Endpoint.loans, editItem._id), formData);
      } else {
        await APIs.post(getEndpoint(Endpoint.loans), formData);
      }
      fetchLoans();
      setOpen(false);
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await APIs.delete(getEndpoint(Endpoint.loans, id));
      fetchLoans();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Loans</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpen()}>
              <PlusIcon /> Add Loan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editItem ? "Edit Loan" : "Add Loan"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {editItem ? (
                <></>
              ) : (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Member
                    </Label>
                    <ComboBox
                      items={members}
                      type="member"
                      onSelect={setSelectedMember}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <Label className="text-right" htmlFor="author">
                      Book
                    </Label>
                    <ComboBox
                      items={books}
                      type="book"
                      onSelect={setSelectedMember}
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmit}>
                {editItem ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Member</TableCell>
            <TableCell>Member Email</TableCell>
            <TableCell>Book</TableCell>
            <TableCell>Borrow Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Overdue</TableCell>
            <TableCell className="text-right">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan._id}>
              <TableCell>{loan._id}</TableCell>
              <TableCell>{loan.member.name}</TableCell>
              <TableCell>{loan.member.email}</TableCell>
              <TableCell>{loan.book.title}</TableCell>
              <TableCell>{(new Date(loan.borrowDate)).toLocaleDateString('vi')}</TableCell>
              <TableCell>{(new Date(loan.returnDate)).toLocaleDateString('vi')}</TableCell>
              <TableCell>{true}</TableCell>
              <TableCell className="space-x-2 text-right">
                <Button
                  variant="outline"
                  //   size="icon"
                  onClick={() =>
                    handleOpen({ borrowDate: loan.borrowDate } as LoanToPost)
                  }
                >
                  Extend
                </Button>
                <AlertDialog open={deleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      //   size="icon"
                      onClick={() => {
                        setDeleteDialogOpen(true);
                      }}
                    >
                      Return
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This actionn cannot be undone. This will permanently
                        delete this loan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => {
                          setDeleteDialogOpen(false);
                        }}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(loan._id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}