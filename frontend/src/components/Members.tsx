"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil1Icon, TrashIcon, PlusIcon } from "@radix-ui/react-icons";
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

import APIs, { Endpoint, getEndpoint } from "@/lib/APIs";
import { X } from "lucide-react";

export interface Member {
  _id: string;
  name: string;
  email: string;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<Member | null>(null);
  const [formData, setFormData] = useState<Partial<Member>>({
    name: "",
    email: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await APIs.get(getEndpoint(Endpoint.members));
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching Members:", error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await APIs.get(
          `${getEndpoint(Endpoint.members)}search/?q=${searchTerm}`
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error searching Members:", error);
      }
    } else {
      fetchMembers();
    }
  };

  const handleOpen = (item: Member | null = null) => {
    if (item) {
      setFormData({ name: item.name, email: item.email });
      setEditItem(item);
    } else {
      setFormData({ name: "", email: "" });
      setEditItem(null);
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editItem) {
        await APIs.patch(getEndpoint(Endpoint.members, editItem._id), formData);
      } else {
        await APIs.post(getEndpoint(Endpoint.members), formData);
      }
      fetchMembers();
      setOpen(false);
      setFormData({ name: "", email: "" });
      setEditItem(null);
    } catch (error) {
      console.error("Error saving Member:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await APIs.delete(getEndpoint(Endpoint.members, id));
      fetchMembers();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting Member:", error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Members</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpen()}>
              <PlusIcon className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editItem ? "Edit Member" : "Add Member"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
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
          placeholder="Search Members"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
              fetchMembers();
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
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member._id}>
              <TableCell>{member._id}</TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleOpen(member)}
                >
                  <Pencil1Icon className="h-4 w-4" />
                </Button>
                <AlertDialog
                  open={deleteDialogOpen && memberToDelete === member._id}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setMemberToDelete(member._id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this member and their loan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setDeleteDialogOpen(false)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(member._id)}
                      >
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
