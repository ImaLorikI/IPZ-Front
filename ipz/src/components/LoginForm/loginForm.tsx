"use client"

import { useState } from "react";
import styles from "./loginForm.module.css";
import { z } from "zod";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from "@/API/Auth/authAPI";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const CheckShema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      CheckShema.parse(formData);
      const response = await loginUser(formData.email, formData.password);
      
      toast.success('Login successful!');
      localStorage.setItem('token', response.token);
      setFormData({ email: "", password: "" });
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during login');
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

          <button type="submit" className={styles.button}>Login</button>
        </form>
        <p className={styles.loginText}>
          Don't have an account? <a href="/registration" className={styles.loginLink}>Register here</a>
        </p>
      </div>
    </div>
  );
}
