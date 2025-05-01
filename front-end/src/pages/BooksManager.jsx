import React, { useEffect, useState } from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import Modal from "../components/Modal";
import { toast } from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/24/outline";

const BooksManager = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de la récupération des livres");
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (book) => {
    setFormLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("description", book.description);
      if (book.image) {
        formData.append("image", book.image);
      }
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Erreur lors de l'ajout du livre");
        throw new Error(data.message || "Erreur lors de l'ajout du livre");
      }
      setBooks((prev) => [...prev, data]);
      toast.success("Livre ajouté avec succès !");
      setModalOpen(false);
      setEditingBook(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingBook(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingBook(null);
  };

  const handleUpdateBook = async (updatedBook) => {
    console.log('Début de la modification du livre:', updatedBook);
    setFormLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", updatedBook.title);
      formData.append("author", updatedBook.author);
      formData.append("description", updatedBook.description);
      if (updatedBook.image) {
        formData.append("image", updatedBook.image);
      }
      const res = await fetch(`http://localhost:5000/api/books/${editingBook._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );     
      const data = await res.json();    
      if (!res.ok) {
        toast.error(data.message || "Erreur lors de la modification");
        throw new Error(data.message || "Erreur lors de la modification");
      }
      setEditingBook(null);
      setModalOpen(false);
      await fetchBooks();
      toast.success("Livre modifié avec succès !");
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBook = async (id) => {
    console.log('Début de la suppression du livre:', id);
    console.log('Token:', token);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Réponse du serveur:', res.status, res.statusText);
      console.log('Headers de la réponse:', res.headers);
      if (!res.ok) {
        if (res.status === 404) {
          toast.error("Ce livre n'existe pas ou n'appartient pas à votre compte");
        } else {
          toast.error("Erreur lors de la suppression");
        }
        throw new Error("Erreur lors de la suppression");
      }
      setBooks((prev) => prev.filter((b) => b._id !== id));
      toast.success("Livre supprimé avec succès !");
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    }
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-3xl font-bold text-violettitle">Gestion des Livres</h1>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl mb-4 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Ajouter un livre
        </button>
      </div>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {loading ? (
        <div className="text-center mt-8">Chargement des livres...</div>
      ) : (
        <BookList books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} />
      )}
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <BookForm
          onSubmit={editingBook ? handleUpdateBook : handleAddBook}
          initialData={editingBook}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default BooksManager;
