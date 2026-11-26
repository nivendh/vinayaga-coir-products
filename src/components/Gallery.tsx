import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
    {
        src: '/factory_1.jpg',
        alt: 'Coir sorting machinery conveyor',
        span: 'col-span-2 row-span-2',
    },
    {
        src: '/factory_2.jpg',
        alt: 'Factory yard and tractor loader',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/factory_3.jpg',
        alt: 'Indoor coir rope spinning machines',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/factory_4.jpg',
        alt: 'Outdoor raw coir husk conveyor',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '/factory_5.jpg',
        alt: 'Coir fiber processing system',
        span: 'col-span-1 row-span-2',
    },
    {
        src: '/factory image 1.jpeg',
        alt: 'Vinayaga Coir Products main facility',
        span: 'col-span-1 row-span-1',
    },
];

export default function Gallery() {
    const [lightbox, setLightbox] = useState<number | null>(null);

    return (
        <section className="section-padding bg-white">
            <div className="section-container">
                <div className="text-center mb-12">
                    <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">Our Facility</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-eco-text mt-2">
                        Factory Gallery
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-lg mx-auto text-sm">
                        Take a look at our coir manufacturing plant, machinery, and production facility.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
                    {galleryImages.map((img, idx) => (
                        <div
                            key={idx}
                            className={`relative group cursor-pointer rounded-xl overflow-hidden ${img.span}`}
                            onClick={() => setLightbox(idx)}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={() => setLightbox(null)}
                        aria-label="Close lightbox"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={galleryImages[lightbox].src.replace('w=800', 'w=1200')}
                        alt={galleryImages[lightbox].alt}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                        {galleryImages[lightbox].alt}
                    </p>
                </div>
            )}
        </section>
    );
}
