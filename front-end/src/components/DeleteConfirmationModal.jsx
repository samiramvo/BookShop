import React from 'react';
import Modal from './Modal';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, bookToDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
        <p>
          Voulez-vous vraiment supprimer le livre&nbsp;: 
          <span className="font-semibold">{bookToDelete?.title}</span> ?
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 text-white rounded-2xl flex items-center gap-2"
          >
            <CheckIcon className="h-5 w-5" />
            Oui, supprimer
          </button>
          <button
            onClick={onClose}
            className="bg-violetdesc hover:bg-violettitle px-4 py-1 text-white rounded-2xl flex items-center gap-2"
          >
            <XMarkIcon className="h-5 w-5" />
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
