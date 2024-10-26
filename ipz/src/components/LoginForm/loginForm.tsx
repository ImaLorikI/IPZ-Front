"use client"

import { useState } from "react";
import styles from "./loginForm.module.css";
import { z } from "zod";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const CheckShema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      CheckShema.parse(formData);
      toast.success('Registration successful!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className={styles.input}
            required
            value={formData.email}
            onChange={handleInputChange}
          />

          <label className={styles.label} htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={styles.input}
            required
            value={formData.password}
            onChange={handleInputChange}
          />

          <button type="submit" className={styles.button}>Register</button>
        </form>
        <p className={styles.loginText}>
          Don't have an account? <a href="/registration" className={styles.loginLink}>Register here</a>
        </p>
      </div>
    </div>
  );
}
