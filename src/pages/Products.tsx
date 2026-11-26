import { useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Gallery from '../components/Gallery';

interface Product {
    title: string;
    description: string;
    image: string;
    category: string;
}

const products: Product[] = [
    {
        title: 'Coir Fiber',
        description: 'High-quality natural coir fiber for industrial and agricultural use. Extracted from mature coconut husks using advanced processing techniques.',
        image: '/white rope.jpeg',
        category: 'Coir Fiber',
    },
    {
        title: 'Coco Peat',
        description: 'Organic growing medium with excellent water retention. Ideal for horticulture, hydroponics, and soil conditioning.',
        image: '/peat.jpeg',
        category: 'Coco Peat',
    },
    {
        title: 'Coir Rope',
        description: 'Durable coir rope made from natural coconut fibers. Perfect for agricultural, marine, and general-purpose applications.',
        image: '/rope.jpeg',
        category: 'Coir Rope',
    },
    {
        title: 'Brown Coir Fiber',
        description: 'Premium brown coir fiber with high tensile strength, suitable for mattress stuffing, upholstery, and cushion manufacturing.',
        image: '/coco white block.jpeg',
        category: 'Coir Fiber',
    },
    {
        title: 'Coco Peat Blocks',
        description: 'Compressed coco peat blocks for easy transport and storage. Expands up to 5x when hydrated, providing excellent growing medium.',
        image: '/coco block.png',
        category: 'Coco Peat',
    },
];

const categories = ['All', 'Coir Fiber', 'Coco Peat', 'Coir Rope'];

export default function Products() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = products.filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* Hero Banner */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/4224863/pexels-photo-4224863.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt="Products banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-900/75 to-primary-800/60" />
                </div>
                <div className="section-container relative z-10">
                    <div className="max-w-2xl">
                        <span className="text-primary-300 font-medium text-sm uppercase tracking-wider">Our Catalog</span>
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-white mt-2 mb-4">
                            Coir Products
                        </h1>
                        <p className="text-primary-100/90 text-lg leading-relaxed">
                            Discover our complete range of natural, sustainable coir products designed for quality and performance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="bg-white border-b border-primary-50 sticky top-20 z-30">
                <div className="section-container py-5">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary-100 bg-eco-bg text-sm outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-primary-800 text-white shadow-md'
                                        : 'bg-primary-50 text-primary-800 hover:bg-primary-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="section-padding bg-eco-bg">
                <div className="section-container">
                    {filtered.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No products found matching your search.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((product) => (
                                <ProductCard key={product.title} {...product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery */}
            <Gallery />
        </>
    );
}
