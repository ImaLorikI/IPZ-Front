"use client"

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./searchBooks.module.css";
import { getAllBooks, getBookbyFilter } from '../../API/Books/booksAPI';
import { getWishlist, addToWishlist, removeFromWishlist } from '../../API/Auth/authAPI';
import BuyBook from '../BuyBook/buyBook';

interface Book {
  _id: string;
  name: string;
  author: string;
  genre: string;
}

export default function SearchBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [wishlist2, setWishlist] = useState<Book[]>([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const token = localStorage.getItem('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState('name');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const {wishlist} = wishlist2

  const isBookInWishlist = (bookId: string) => {
    return wishlist.some(item => item._id === bookId);
  };

  const handleWishlistAction = async (bookId: string) => {
    try {
      if (isBookInWishlist(bookId)) {
        await handleRemoveFromWishlist(bookId);
        toast.success('Book removed from wishlist');
      } else {
        await handleAddToWishlist(bookId);
        toast.success('Book added to wishlist');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getAllBooks();
        const fetchedWishlist = await getWishlist(token as string);
        setBooks(fetchedBooks);
        setWishlist(fetchedWishlist);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load books and wishlist');
      }
    };

    fetchBooks();
  }, [token]);

  const handleAddToWishlist = async (bookId: string) => {
    try {
      const updatedWishlist = await addToWishlist(token as string, bookId);
      setWishlist(updatedWishlist);

    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const handleRemoveFromWishlist = async (bookId: string) => {
    try {
      const updatedWishlist = await removeFromWishlist(token as string, bookId);
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === '') {
        const fetchedBooks = await getAllBooks();
        setBooks(fetchedBooks);
      } else {
        const filters = { [searchFilter]: searchTerm };
        const filteredBooks = await getBookbyFilter(filters);
        setBooks(filteredBooks);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      toast.error('Failed to search books');
    }
  };

  const handleBuyNow = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className={styles.title}>Book Search</h1>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          placeholder="Search books..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.searchFilter}
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>
        <button className={styles.button} onClick={handleSearch}>Search</button>
      </div>
      <div className={styles.buttonContainer}>
        <button 
          className={`${styles.button} ${!showWishlist ? styles.activeButton : ''}`}
          onClick={() => setShowWishlist(false)}
        >
          All Books
        </button>
        <button 
          className={`${styles.button} ${showWishlist ? styles.activeButton : ''}`}
          onClick={() => setShowWishlist(true)}
        >
          Wishlist
        </button>
      </div>
      
      {showWishlist ? (
        <div className={styles.wishlistGrid}>
          {wishlist.length > 0 ? (
            wishlist.map((book) => (
              <div key={`${book._id}-${book.name}`} className={styles.bookCard}>
                <h2 className={styles.bookTitle}>{book.name}</h2>
                <p className={styles.bookInfo}>Author: {book.author}</p>
                <p className={styles.bookInfo}>Genre: {book.genre}</p>
                <div className={styles.buttonContainer2}>
                  <button 
                    className={styles.button}
                    onClick={() => handleRemoveFromWishlist(book._id)}
                  >
                    Remove from Wishlist
                  </button>
                  <button className={styles.button} onClick={() => handleBuyNow(book)}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      ) : (
        <div className={styles.bookGrid}>
          {books.map((book) => (
            <div key={`${book._id}-${book.name}`} className={styles.bookCard}>
              <h2 className={styles.bookTitle}>{book.name}</h2>
              <p className={styles.bookInfo}>Author: {book.author}</p>
              <p className={styles.bookInfo}>Genre: {book.genre}</p>
              <div className={styles.buttonContainer2}>
                <button 
                  className={styles.button}
                  onClick={() => handleWishlistAction(book._id)}
                >
                  {isBookInWishlist(book._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
                <button className={styles.button} onClick={() => handleBuyNow(book)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBook && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
            <BuyBook book={selectedBook} onClose={handleCloseModal} token={token as string} />
          </div>
        </div>
      )}
    </div>
  );
}
