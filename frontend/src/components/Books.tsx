"use client";
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
import { TrashIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface Book {
  _id: string;
  title: string;
  author: string;
  copies: number;
  availableCopies: number;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Book>>({
    title: "",
    author: "",
    copies: 0,
    availableCopies: 0,
  });
  const [editItem, setEditItem] = useState<Book | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await APIs.get(getEndpoint(Endpoint.books));
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setEditItem(null);
    setFormData({
      title: "",
      author: "",
      copies: 0,
      availableCopies: 0,
    });
  };

  const handleOpen = (item: Book | null = null) => {
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
        await APIs.patch(getEndpoint(Endpoint.books, editItem._id), formData);
      } else {
        await APIs.post(getEndpoint(Endpoint.books), {
          ...formData,
          availableCopies: formData.copies,
        });
      }
      fetchBooks();
      setOpen(false);
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await APIs.delete(getEndpoint(Endpoint.books, id));
      fetchBooks();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await APIs.get(
          `${getEndpoint(Endpoint.books)}search/?q=${searchTerm}`
        );
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      fetchBooks();
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Books</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpen()}>
              <PlusIcon /> Add Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editItem ? "Edit Book" : "Add Book"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  className="col-span-3"
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label className="text-right" htmlFor="author">
                  Author
                </Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => {
                    setFormData({ ...formData, author: e.target.value });
                  }}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label className="text-right" htmlFor="copies">
                  Quantity
                </Label>
                <Input
                  id="copies"
                  value={formData.copies}
                  onChange={(e) => {
                    setFormData({ ...formData, copies: +e.target.value });
                  }}
                  className="col-span-3"
                />
              </div>
              {editItem ? (
                <div className="grid grid-cols-4 gap-4 items-center">
                  <Label className="text-right" htmlFor="available-copies">
                    Available
                  </Label>
                  <Input
                    id="available-copies"
                    value={formData.availableCopies}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        availableCopies: +e.target.value,
                      });
                    }}
                    className="col-span-3"
                  />
                </div>
              ) : (
                <></>
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
      <div className="flex gap-2">
        <Input
          placeholder="Search Books"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
          onKeyUp={(e: React.KeyboardEvent) =>
            e.key === "Enter" && handleSearch()
          }
        />
        {searchTerm !== "" && (
          <Button
            size="icon"
            variant="destructive"
            onClick={() => {
              setSearchTerm("");
              fetchBooks();
            }}
          >
            <X />
          </Button>
        )}
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Available</TableCell>
            <TableCell className="text-right">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book._id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>{book.availableCopies}</TableCell>
              <TableCell className="space-x-2 text-right">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleOpen(book)}
                >
                  <Pencil1Icon />
                </Button>
                <AlertDialog open={deleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setDeleteDialogOpen(true);
                        console.log("Delete");
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This actionn cannot be undone. This will permanently
                        delete this book and its loan.
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
                      <AlertDialogAction onClick={() => handleDelete(book._id)}>
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
