import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
];

const products = [
    'Coir Fiber',
    'Coco Peat',
    'Coir Rope',
];

export default function Footer() {
    return (
        <footer className="bg-primary-900 text-white">
            <div className="section-container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-5">
                            <img
                                src="/logo.png"
                                alt="Vinayaga Coir Products"
                                className="h-16 w-auto object-contain"
                            />
                        </div>
                        <p className="text-primary-200 text-sm leading-relaxed mb-6">
                            Leading manufacturer and exporter of premium quality coir products.
                            Committed to sustainable practices and eco-friendly solutions since
                            over a decade.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://www.facebook.com/share/191vQRg9hf/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-primary-800 rounded-lg hover:bg-primary-700 transition-colors duration-300" aria-label="Facebook">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/vinayaga_coir?igsh=cWE1MjZ6dTZnd25i" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-primary-800 rounded-lg hover:bg-primary-700 transition-colors duration-300" aria-label="Instagram">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://wa.me/919443408684" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-primary-800 rounded-lg hover:bg-primary-700 transition-colors duration-300" aria-label="WhatsApp">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-200 mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-primary-300 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 bg-primary-500 rounded-full" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-200 mb-5">Our Products</h4>
                        <ul className="space-y-3">
                            {products.map((product) => (
                                <li key={product}>
                                    <Link
                                        to="/products"
                                        className="text-primary-300 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 bg-primary-500 rounded-full" />
                                        {product}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-200 mb-5">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                                <span className="text-primary-300 text-sm">+91 9443408684</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                                <span className="text-primary-300 text-sm">nivendhan03@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                                <span className="text-primary-300 text-sm">75VQ+VJ, Ponnakannikadu, Tamil Nadu 614804, India</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary-800">
                <div className="section-container py-5">
                    <p className="text-center text-primary-400 text-sm">
                        &copy; {new Date().getFullYear()} Vinayaga Coir Products. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
