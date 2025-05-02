import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {EyeIcon } from "@heroicons/react/24/solid";
import BookDetail from "./BookDetail";
import Pagination from "./Pagination";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const BookList = ({ books, onEdit, onDelete, pagination, onPageChange }) => {
  const [bookToDelete, setBookToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const getImageUrl = (imgPath) => {
    if (!imgPath) return null;
    const normalizedPath = imgPath.replace(/\\/g, '/');
    return `http://localhost:5000/${normalizedPath}`;
  };
  const handleDeleteClick = (book) => {
    const bookToDelete = { ...book, _id: book._id.toString() };
    setBookToDelete(bookToDelete);
    setModalOpen(true);
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedBook(null);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      onDelete(bookToDelete._id);
    }
    setModalOpen(false);
    setBookToDelete(null);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setBookToDelete(null);
  };
  return (
    <>
      <div className="overflow-x-auto w-full  mx-auto mt-8">
      
        <table className="text-center min-w-full border border-collapse shadow-md ">
          <thead>
            <tr className=" border-b">
              <th className="py-2 px-4">Couverture</th>
              <th className="py-2 px-4">Titre</th>
              <th className="py-2 px-4">Auteur</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Créé par</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Aucun livre trouvé.</td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book._id} className="border-b ">
                  <td className="py-2 px-4">
                    {book.image ? (
                      <img src={getImageUrl(book.image)} alt={book.title} className=" h-16 w-16 object-cover rounded  mx-auto" />
                    ) : (
                      <span className="text-gray-400 italic">Aucune</span>
                    )}
                  </td>
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">
                    <div className="max-h-20 overflow-y-auto ">
                      {book.description}
                    </div>
                  </td>
                  <td className="py-2 px-4">{book.user?.username || 'Utilisateur inconnu'}</td>
                  <td className="py-4 px-4 flex gap-2 justify-center items-center mx-auto">
                    <button
                      onClick={() => handleViewDetails(book)}
                      className="bg-green-500 text-sm hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full flex items-center gap-2"
                    >
                      <EyeIcon className="h-5 w-5" />
                      
                    </button>
                    <button
                      onClick={() => onEdit(book)}
                      className="bg-violetdesc hover:bg-violettitle text-white   font-bold py-1 px-3 rounded-full flex items-center gap-2"
                    >
                      <PencilIcon className="h-5 w-5" />
                      
                    </button>
                    <button
                      onClick={() => handleDeleteClick(book)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full flex items-center gap-2"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
          <Pagination 
            currentPage={pagination.currentPage} 
            totalPages={pagination.totalPages} 
            onPageChange={onPageChange}
          />
      </div>
      <BookDetail book={selectedBook} onClose={handleCloseDetail} />
      <DeleteConfirmationModal
        isOpen={modalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        bookToDelete={bookToDelete}
      />
    </>
  );
};

export default BookList;
