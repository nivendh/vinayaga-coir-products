import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md'
                : 'bg-transparent'
                }`}
        >
            <div className="section-container">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/logo.png"
                            alt="Vinayaga Coir Products"
                            className="h-16 w-auto object-contain transition-all duration-300"
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                                    ? scrolled
                                        ? 'bg-primary-800 text-white shadow-md'
                                        : 'bg-white/20 text-white'
                                    : scrolled
                                        ? 'text-eco-text hover:bg-primary-50 hover:text-primary-800'
                                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="ml-3 btn-primary text-sm !px-6 !py-2.5"
                        >
                            Get Quote
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${scrolled ? 'text-eco-text hover:bg-primary-50' : 'text-white hover:bg-white/10'
                            }`}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-white/95 backdrop-blur-md border-t border-primary-100 shadow-lg">
                    <div className="section-container py-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                                    ? 'bg-primary-800 text-white'
                                    : 'text-eco-text hover:bg-primary-50 hover:text-primary-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="block btn-primary text-sm text-center mt-3"
                        >
                            Get Quote
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
