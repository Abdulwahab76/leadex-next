"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type ContactFormData = {
    company: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    product: string;
    message: string;
};

const initialFormData: ContactFormData = {
    company: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    product: "",
    message: "",
};

export default function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // 🔁 Replace later with API route or Server Action
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Something went wrong. Please try again.");
            }

            setSuccess(true);
            setFormData(initialFormData);
        } catch (err) {
            setError("Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-3.5"
            aria-describedby="form-status"
        >
            {/* Company */}
            <Input
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
            />

            {/* Name */}
            <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            {/* Email */}
            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            {/* Phone */}
            <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />

            {/* Address */}
            <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
            />

            {/* Country */}
            <Input
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
            />

            {/* Product */}
            <Input
                label="Product"
                name="product"
                value={formData.product}
                onChange={handleChange}
            />

            {/* Message */}
            <div>
                <label htmlFor="message" className="sr-only">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="w-full bg-gray-100 px-4 py-2 text-sm rounded"
                />
            </div>

            {/* Status */}
            <div id="form-status" aria-live="polite">
                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && (
                    <p className="text-sm text-green-600">
                        Thank you! Your message has been sent.
                    </p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="border border-primary-500   text-xs px-6 py-2 rounded-full bg-primary-500 text-white transition-colors delay-75 cursor-pointer disabled:opacity-50"
            >
                {isSubmitting ? "Sending..." : "Send"}
            </button>
        </form>
    );
}


type InputProps = {
    label: string;
    name: keyof ContactFormData;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
};

function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    required,
}: InputProps) {
    return (
        <div>
            <label htmlFor={name} className="sr-only">
                {label}
                {required && " *"}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={`${label}${required ? " *" : ""}`}
                className="w-full bg-gray-100 px-4 py-2 text-xs rounded outline-primary-500 h-10  "
            />
        </div>
    );
}
