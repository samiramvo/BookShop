import React, { useState } from "react";
import Modal from "./Modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const BookList = ({ books, onEdit, onDelete }) => {
  const [bookToDelete, setBookToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
        <table className="text-center min-w-full border border-collapse ">
          <thead>
            <tr className=" border-b">
              <th className="py-2 px-4">Couverture</th>
              <th className="py-2 px-4">Titre</th>
              <th className="py-2 px-4">Auteur</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Aucun livre trouvé.</td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book._id} className="border-b">
                  <td >
                    {book.image ? (
                      <img src={getImageUrl(book.image)} alt={book.title} className=" h-16 w-16 object-cover rounded shadow mx-auto" />
                    ) : (
                      <span className="text-gray-400 italic">Aucune</span>
                    )}
                  </td>
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">{book.description}</td>
                  <td className="py-4 px-4 flex gap-2 justify-center items-center mx-auto">
                    <button
                      onClick={() => onEdit(book)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-2xl flex items-center gap-2"
                    >
                      <PencilIcon className="h-5 w-5" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteClick(book)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-2xl flex items-center gap-2"
                    >
                      <TrashIcon className="h-5 w-5" />
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalOpen} onClose={handleCancelDelete}>
        <div className="text-center">
          <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
          <p>Voulez-vous vraiment supprimer le livre&nbsp;: <span className="font-semibold">{bookToDelete?.title}</span> ?</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleConfirmDelete}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-2xl flex items-center gap-2"
            >
              <CheckIcon className="h-5 w-5" />
              Oui, supprimer
            </button>
            <button
              onClick={handleCancelDelete}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl flex items-center gap-2"
            >
              <XMarkIcon className="h-5 w-5" />
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookList;
