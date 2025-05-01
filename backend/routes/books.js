const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all books 
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .populate('user', 'username email')
      .skip(skip)
      .limit(limit);

    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({
      books,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalBooks,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Create a new book
router.post('/', auth, function(req, res, next) {
  upload.single('image')(req, res, function(err) {
    if (err) {
      return res.status(400).json({ message: 'Erreur upload image', error: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { title, author, description } = req.body;
    let image = null;
    if (!req.file) {
      console.warn('Aucun fichier image reçu pour la création du livre !');
    } else {
      image = req.file.path;
    }
    const book = new Book({ title, author, description, image, user: req.userId });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Create a new book
// router.post('/', auth, async (req, res) => {
//   try {
//     const { title, author, description } = req.body;
//     const book = new Book({ title, author, description, user: req.userId });
//     await book.save();
//     res.status(201).json(book);
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur serveur.' });
//   }
// });


// Update a book
router.put('/:id', auth, function(req, res, next) {
  upload.single('image')(req, res, function(err) {
    if (err) {
      return res.status(400).json({ message: 'Erreur upload image', error: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });

    const { title, author, description } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;
    if (req.file) {
      book.image = req.file.path;
    }

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Delete a book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });
    if (!book) return res.status(404).json({ message: 'Livre non trouvé.' });
    res.json({ message: 'Livre supprimé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
