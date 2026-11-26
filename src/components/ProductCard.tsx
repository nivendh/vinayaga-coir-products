import { MessageCircle } from 'lucide-react';

interface ProductCardProps {
    title: string;
    description: string;
    image: string;
    category: string;
}

export default function ProductCard({ title, description, image, category }: ProductCardProps) {
    const whatsappMsg = encodeURIComponent(`Hi, I'm interested in ${title}. Please share details and pricing.`);
    const whatsappLink = `https://wa.me/919443408684?text=${whatsappMsg}`;

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-primary-50">
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary-800 text-white text-xs font-medium rounded-full">
                    {category}
                </span>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold font-display text-eco-text mb-2 group-hover:text-primary-800 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {description}
                </p>
                <div className="flex items-center gap-3">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:bg-[#1da851] transition-colors duration-300"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Enquire
                    </a>
                </div>
            </div>
        </div>
    );
}
