import { Phone, Mail, MapPin, Clock, Leaf } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const contactInfo = [
    {
        icon: Phone,
        label: 'Phone',
        value: '+91 9443408684',
        href: 'tel:+919443408684',
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'nivendhan03@gmail.com',
        href: 'mailto:nivendhan03@gmail.com',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: '75VQ+VJ, Ponnakannikadu, Tamil Nadu 614804, India',
        href: null,
    },
    {
        icon: Clock,
        label: 'Business Hours',
        value: 'Mon - Sat, 6 AM - 6 PM IST',
        href: null,
    },
];

export default function Contact() {
    return (
        <>
            {/* Hero Banner */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/4224874/pexels-photo-4224874.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt="Contact banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-900/75 to-primary-800/60" />
                </div>
                <div className="section-container relative z-10">
                    <div className="max-w-2xl">
                        <span className="text-primary-300 font-medium text-sm uppercase tracking-wider">Get in Touch</span>
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-white mt-2 mb-4">
                            Contact Us
                        </h1>
                        <p className="text-primary-100/90 text-lg leading-relaxed">
                            Have questions or need a quote? Reach out to us and our team will get back to you promptly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding bg-eco-bg">
                <div className="section-container">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Left - Contact Info */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-50 mb-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="p-2 bg-primary-100 rounded-lg">
                                        <Leaf className="w-5 h-5 text-primary-800" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-display text-eco-text">
                                        Vinayaga Coir Products
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    {contactInfo.map(({ icon: Icon, label, value, href }) => (
                                        <div key={label} className="flex items-start gap-4">
                                            <div className="p-2.5 bg-primary-50 rounded-xl shrink-0">
                                                <Icon className="w-5 h-5 text-primary-700" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
                                                {href ? (
                                                    <a href={href} className="text-eco-text font-medium text-sm hover:text-primary-800 transition-colors">
                                                        {value}
                                                    </a>
                                                ) : (
                                                    <p className="text-eco-text font-medium text-sm">{value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Map Integration */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-primary-50 flex flex-col">
                                <div className="relative aspect-[4/3] w-full">
                                    <iframe
                                        title="Vinayaga Coir Products Factory Map Location"
                                        src="https://maps.google.com/maps?q=10.294444,79.189009&z=15&output=embed"
                                        className="w-full h-full border-0 absolute inset-0"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4 bg-primary-50 border-t border-primary-100 text-center">
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=10.294444,79.189009"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-800 text-white rounded-xl text-sm font-medium hover:bg-primary-900 transition-colors shadow-md w-full"
                                    >
                                        <MapPin className="w-4 h-4" />
                                        Open in Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right - Enquiry Form */}
                        <div className="lg:col-span-3">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
