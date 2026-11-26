import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Leaf, Globe, HeadphonesIcon, ArrowRight, MessageCircle, ChevronDown, Quote } from 'lucide-react';
import ProductCard from '../components/ProductCard';

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return { ref, visible };
}

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const { ref, visible } = useInView();

    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [visible, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const whyChooseUs = [
    {
        icon: ShieldCheck,
        title: 'Premium Quality',
        description: 'Rigorous quality control at every stage ensures only the finest coir products reach our customers.',
    },
    {
        icon: Leaf,
        title: 'Eco-Friendly Products',
        description: '100% natural and biodegradable coir products manufactured using sustainable practices.',
    },
    {
        icon: Globe,
        title: 'International Export Support',
        description: 'Trusted export partner serving 5+ states with reliable logistics and documentation.',
    },
    {
        icon: HeadphonesIcon,
        title: 'Reliable Customer Service',
        description: 'Dedicated support team available around the clock to assist with your requirements.',
    },
];

const featuredProducts = [
    {
        title: 'Coir Fiber',
        description: 'High-quality natural coir fiber extracted from mature coconut husks, ideal for industrial and agricultural applications.',
        image: '/white rope.jpeg',
        category: 'Coir Fiber',
    },
    {
        title: 'Coco Peat',
        description: 'Premium organic growing medium with excellent water retention and aeration properties for horticulture.',
        image: '/peat.jpeg',
        category: 'Coco Peat',
    },
    {
        title: 'Coir Rope',
        description: 'Durable and strong coir rope crafted from natural coconut fibers for multi-purpose use.',
        image: '/rope.jpeg',
        category: 'Coir Rope',
    },
];

const stats = [
    { value: 50, suffix: '+', label: 'Clients Worldwide' },
    { value: 10, suffix: '+', label: 'Products Offered' },
    { value: 8, suffix: '+', label: 'Years Experience' },
    { value: 5, suffix: '+', label: 'States Served' },
];

export default function Home() {
    const heroVisible = useInView(0.1);
    const aboutVisible = useInView(0.15);
    const founderVisible = useInView(0.15);
    const whyVisible = useInView(0.1);
    const statsVisible = useInView(0.15);
    const productsVisible = useInView(0.1);

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/factory image 1.jpeg"
                        alt="Vinayaga Coir Products Factory Yard"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-900/70 to-primary-800/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />
                </div>

                <div ref={heroVisible.ref} className="section-container relative z-10 pt-20">
                    <div className="max-w-3xl">
                        <div className={`transition-all duration-700 ${heroVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-200 text-sm font-medium mb-6">
                                <Leaf className="w-4 h-4" />
                                Sustainable Coir Solutions
                            </span>
                        </div>

                        <h1
                            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display text-white leading-[1.1] mb-6 transition-all duration-700 delay-100 ${heroVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                        >
                            Premium Coir Products{' '}
                            <span className="text-primary-300">Manufacturer</span>
                        </h1>

                        <p
                            className={`text-lg sm:text-xl text-primary-100/90 max-w-xl mb-10 leading-relaxed transition-all duration-700 delay-200 ${heroVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                        >
                            Sustainable Coir Fiber, Coco Peat, and Coir Rope Solutions for global industries and agriculture.
                        </p>

                        <div
                            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${heroVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <Link to="/products" className="btn-primary text-base">
                                View Products <ArrowRight className="w-5 h-5 ml-1" />
                            </Link>
                            <Link to="/contact" className="btn-secondary !bg-white !border-white !text-primary-800 hover:!bg-primary-50 hover:!text-primary-900 text-base">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
                </div>
            </section>

            {/* About Section */}
            <section className="section-padding bg-eco-bg">
                <div ref={aboutVisible.ref} className="section-container">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className={`transition-all duration-700 ${aboutVisible.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                            <div className="relative">
                                <img
                                    src="/factory image 1.jpeg"
                                    alt="Vinayaga Coir Products Factory Yard"
                                    className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-primary-800 text-white p-6 rounded-2xl shadow-lg hidden md:block">
                                    <p className="text-3xl font-bold font-display">8+</p>
                                    <p className="text-primary-200 text-sm">Years of Excellence</p>
                                </div>
                            </div>
                        </div>

                        <div className={`transition-all duration-700 delay-100 ${aboutVisible.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">About Us</span>
                            <h2 className="text-3xl md:text-4xl font-bold font-display text-eco-text mt-2 mb-6">
                                Leading the Way in Sustainable Coir Manufacturing
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Vinayaga Coir Products is a premier manufacturer and exporter of high-quality coir products based in Tamil Nadu, India. With over a decade of expertise, we deliver natural, eco-friendly coir solutions to clients across the globe.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Our mission is to promote sustainable agriculture and industry by providing 100% natural coir products that replace synthetic alternatives. Every product we manufacture supports a greener planet.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-primary-800 font-medium text-sm">
                                    <ShieldCheck className="w-5 h-5" />
                                    ISO Certified
                                </div>
                                <div className="flex items-center gap-2 text-primary-800 font-medium text-sm">
                                    <Leaf className="w-5 h-5" />
                                    100% Natural
                                </div>
                                <div className="flex items-center gap-2 text-primary-800 font-medium text-sm">
                                    <Globe className="w-5 h-5" />
                                    Inter National Export
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Founder */}
            <section className="section-padding bg-white relative overflow-hidden">
                {/* Subtle decorative background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

                <div ref={founderVisible.ref} className="section-container relative z-10">
                    <div className="text-center mb-14">
                        <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">Leadership</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-eco-text mt-2">
                            Meet Our Founder
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Founder Image */}
                        <div className={`transition-all duration-700 ${founderVisible.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                            <div className="relative max-w-sm mx-auto">
                                {/* Decorative border frame */}
                                <div className="absolute -inset-3 bg-gradient-to-br from-primary-300 via-primary-500 to-primary-800 rounded-2xl opacity-20" />
                                <img
                                    src="/founder.jpg"
                                    alt="G. Senthil Kumar - Founder of Vinayaga Coir Products"
                                    className="relative rounded-2xl shadow-xl w-full object-cover aspect-[3/4]"
                                />
                                {/* Name badge */}
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary-800 text-white px-6 py-3 rounded-xl shadow-lg text-center whitespace-nowrap">
                                    <p className="text-lg font-bold font-display">G. Senthil Kumar</p>
                                    <p className="text-primary-200 text-xs font-medium">Founder & Managing Director</p>
                                </div>
                            </div>
                        </div>

                        {/* Founder Bio */}
                        <div className={`transition-all duration-700 delay-200 ${founderVisible.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                            <div className="relative">
                                <Quote className="w-10 h-10 text-primary-200 mb-4" />
                                <p className="text-xl md:text-2xl font-display text-eco-text leading-relaxed mb-6 italic">
                                    "Our vision is to bring the finest natural coir products from Tamil Nadu to the world, while uplifting our local communities and preserving the environment."
                                </p>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-4">
                                With over 8 years of dedicated experience in the coir industry, <strong className="text-eco-text">G. Senthil Kumar</strong> founded Vinayaga Coir Products with a passion for delivering premium, eco-friendly coir solutions to clients across India and beyond.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Under his leadership, the company has grown from a small local unit to a trusted name serving 50+ clients across 5+ states, known for uncompromising quality and reliable service. His hands-on approach to manufacturing ensures every product meets the highest standards.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-50 text-primary-800 rounded-full text-sm font-medium">
                                    <Leaf className="w-4 h-4" />
                                    Sustainability Advocate
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-50 text-primary-800 rounded-full text-sm font-medium">
                                    <Globe className="w-4 h-4" />
                                    Export Pioneer
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-50 text-primary-800 rounded-full text-sm font-medium">
                                    <ShieldCheck className="w-4 h-4" />
                                    Quality Focused
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-eco-bg">
                <div ref={whyVisible.ref} className="section-container">
                    <div className="text-center mb-14">
                        <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-eco-text mt-2">
                            The Vinayaga Advantage
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyChooseUs.map((item, idx) => (
                            <div
                                key={item.title}
                                className={`group p-7 bg-eco-bg rounded-2xl border border-primary-50 card-hover text-center transition-all duration-700 ${whyVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-800 transition-colors duration-300">
                                    <item.icon className="w-7 h-7 text-primary-800 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg font-bold font-display text-eco-text mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="section-padding bg-primary-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                </div>
                <div ref={statsVisible.ref} className="section-container relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-4xl md:text-5xl font-bold font-display text-white mb-2">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </p>
                                <p className="text-primary-200 text-sm font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section-padding bg-eco-bg">
                <div ref={productsVisible.ref} className="section-container">
                    <div className="text-center mb-14">
                        <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">Our Products</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-eco-text mt-2">
                            Featured Products
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-lg mx-auto text-sm">
                            Explore our range of premium coir products crafted with care and quality.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product, idx) => (
                            <div
                                key={product.title}
                                className={`transition-all duration-700 ${productsVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                                style={{ transitionDelay: `${idx * 150}ms` }}
                            >
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/products" className="btn-primary">
                            View All Products <ArrowRight className="w-5 h-5 ml-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/rope.jpeg"
                        alt="Coir ropes"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary-900/85" />
                </div>
                <div className="section-container relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-4">
                        Need Bulk Orders?
                    </h2>
                    <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">
                        Get customized coir products at competitive prices for your business requirements.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact" className="btn-primary !bg-white !text-primary-800 hover:!bg-primary-50">
                            Contact Us
                        </Link>
                        <a
                            href="https://wa.me/919443408684"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary !bg-transparent !border-white/30 !text-white hover:!bg-white hover:!text-primary-800"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
