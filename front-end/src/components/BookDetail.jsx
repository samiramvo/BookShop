import React from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";

const BookDetail = ({ book, onClose }) => {
  if (!book) return null;

  const getImageUrl = (imgPath) => {
    if (!imgPath) return null;
    const normalizedPath = imgPath.replace(/\\/g, '/');
    return `http://localhost:5000/${normalizedPath}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Détails du livre</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              {book.image && (
                <img
                  src={getImageUrl(book.image)}
                  alt={book.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
              <p className="text-lg font-semibold text-gray-600">Auteur: {book.author}</p>
              <p className="text-gray-700">Description: {book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
