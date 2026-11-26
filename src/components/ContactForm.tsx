import { useState } from 'react';
import { Send, CheckCircle, User, Phone, MapPin, Mail } from 'lucide-react';

interface FormData {
    name: string;
    phone: string;
    location: string;
    email: string;
}

interface FormErrors {
    name?: string;
    phone?: string;
    email?: string;
    location?: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        location: '',
        email: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');
    const [lastSubmitted, setLastSubmitted] = useState<FormData | null>(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const validate = (): FormErrors => {
        const errs: FormErrors = {};
        if (!formData.name.trim()) errs.name = 'Name is required';
        if (!formData.phone.trim()) errs.phone = 'Phone number is required';
        else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone.trim())) errs.phone = 'Enter a valid phone number';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address';
        return errs;
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
        if (apiError) setApiError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmitting(true);
        setApiError('');

        try {
            const response = await fetch(`${API_URL}/api/enquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle server-side validation errors
                if (data.errors) {
                    const serverErrors: FormErrors = {};
                    data.errors.forEach((err: { field: string; message: string }) => {
                        if (err.field in formData) {
                            serverErrors[err.field as keyof FormErrors] = err.message;
                        }
                    });
                    setErrors(serverErrors);
                } else {
                    setApiError(data.message || 'Something went wrong. Please try again.');
                }
                return;
            }

            setLastSubmitted(formData);
            setSubmitted(true);
            setFormData({ name: '', phone: '', location: '', email: '' });
        } catch {
            setApiError('Unable to connect to server. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    const fields = [
        { key: 'name' as const, label: 'Name', icon: User, placeholder: 'Your full name', required: true },
        { key: 'phone' as const, label: 'Phone Number', icon: Phone, placeholder: '+91 9443408684', required: true },
        { key: 'location' as const, label: 'Location', icon: MapPin, placeholder: 'Your city / country', required: false },
        { key: 'email' as const, label: 'Email ID', icon: Mail, placeholder: 'you@example.com', required: false },
    ];

    return (
        <div className="relative">
            {submitted && lastSubmitted && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 rounded-2xl p-6 text-center animate-fade-in">
                    <div className="max-w-xs mx-auto">
                        <CheckCircle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold font-display text-eco-text mb-2">Enquiry Sent!</h3>
                        <p className="text-gray-600 text-sm mb-6">We'll get back to you shortly.</p>
                        
                        <div className="flex flex-col gap-3">
                            <a
                                href={`https://wa.me/919443408684?text=${encodeURIComponent(
                                    `Hi Vinayaga Coir Products, I have submitted an enquiry:\n\nName: ${lastSubmitted.name}\nPhone: ${lastSubmitted.phone}\nLocation: ${lastSubmitted.location || 'Not provided'}\nEmail: ${lastSubmitted.email || 'Not provided'}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-medium rounded-xl shadow transition-all duration-300 text-sm hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Send copy to WhatsApp
                            </a>
                            <button
                                type="button"
                                onClick={() => {
                                    setSubmitted(false);
                                    setLastSubmitted(null);
                                }}
                                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-sm transition-all duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-primary-50">
                <h3 className="text-2xl font-bold font-display text-eco-text mb-2">Send Enquiry</h3>
                <p className="text-gray-500 text-sm mb-6">Fill in the details and we'll reach out to you.</p>

                <div className="space-y-4">
                    {fields.map(({ key, label, icon: Icon, placeholder, required }) => (
                        <div key={key}>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-eco-text mb-1.5">
                                <Icon className="w-4 h-4 text-primary-600" />
                                {label}
                                {required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type={key === 'email' ? 'email' : 'text'}
                                value={formData[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                                placeholder={placeholder}
                                className={`w-full px-4 py-3 rounded-xl border ${errors[key] ? 'border-red-400 focus:ring-red-300' : 'border-primary-100 focus:ring-primary-300'
                                    } focus:outline-none focus:ring-2 bg-primary-50/30 text-sm transition-all duration-300`}
                            />
                            {errors[key] && (
                                <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full mt-6 !rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Enquiry
                        </span>
                    )}
                </button>
            </form>
        </div>
    );
}
