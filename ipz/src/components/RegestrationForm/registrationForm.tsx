"use client"

import { useState } from "react";
import styles from "./registrationForm.module.css";
import { z } from "zod";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registrationUser } from "../../API/Auth/authAPI";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      CheckShema.parse(formData);
      const response = await registrationUser(formData.email, formData.password);
      toast.success('Registration successful!');
      router.push("/login");
      setFormData({ email: "", password: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Register</h2>
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

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className={styles.loginText}>
          Already have an account? <a href="/login" className={styles.loginLink}>Login here</a>
        </p>
      </div>
    </div>
  );
}
