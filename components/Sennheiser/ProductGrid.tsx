import Link from 'next/link';

interface ProductGridProps {
    currentProducts: any[];
    filteredProducts: any[];
    currentPage: number;
    totalPages: number;
    productsPerPage: number;
    setCurrentPage: (page: number) => void;
    setProductsPerPage: (size: number) => void;
    isPageSizeOpen: boolean;
    setIsPageSizeOpen: (open: boolean) => void;
}

export default function ProductGrid({
    currentProducts,
    filteredProducts,
    currentPage,
    totalPages,
    productsPerPage,
    setCurrentPage,
    setProductsPerPage,
    isPageSizeOpen,
    setIsPageSizeOpen
}: ProductGridProps) {
    return (
        <div className="px-[20px] pb-16 pt-[20px] w-full flex flex-col items-center">
            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full pb-[16px]">
                {currentProducts.map((product, index) => {
                    const isExternal = product.link.startsWith('http');
                    
                    // 1. Generate a URL-friendly slug from the name
                    const nameSlug = product.name
                        .toLowerCase()
                        .trim()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/[\s_-]+/g, '-')
                        .replace(/^-+|-+$/g, '');

                    // 2. Construct the dynamic path
                    const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
                    const dynamicHref = `/sennheiser/urunler/${categorySlug}/${nameSlug}-${product.articleNo}`;

                    const productKey = product.id 
                        ? `id-${product.id}` 
                        : `art-${product.articleNo}`;

                    // RE-DEFINING THE CARD UI
                    const CardContent = (
                        <div className="group relative aspect-square bg-[var(--color-light-gray)] overflow-hidden transition-colors">
                            <div className="absolute inset-0 flex items-center justify-center p-3">
                                {product.image && product.image.length > 0 ? (
                                    <img 
                                        src={Array.isArray(product.image) ? product.image[0] : product.image} 
                                        alt={product.name}
                                        className="antialiased subpixel-antialiased object-contain w-full h-full transition-transform duration-400 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-115"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="antialiased subpixel-antialiased text-[10px] text-gray-200 tracking-widest uppercase">
                                            {product.articleNo || "Software"}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                                <h3 
                                    className="antialiased subpixel-antialiased font-medium transition-colors duration-200 group-hover:text-[var(--color-brand-hover-blue)]"
                                    style={{ fontSize: '0.65rem', lineHeight: '110%', fontWeight: 500, letterSpacing: '0.02em' }}
                                >
                                    {product.name}
                                </h3>
                            </div>
                        </div>
                    );

                    return isExternal ? (
                        <a key={productKey} href={product.link} target="_blank" rel="noopener noreferrer">{CardContent}</a>
                    ) : (
                        <Link key={productKey} href={dynamicHref}>{CardContent}</Link>
                    );
                })}
            </div>

            {/* Empty State or Pagination */}
            {filteredProducts.length === 0 ? (
                <div className="py-20 text-center text-gray-400 italic">Aradığınız kriterlere uygun ürün bulunamadı.</div>
            ) : (
                <div className="mt-[16px] mb-[0px] flex flex-col items-center gap-2">
                    {totalPages > 0 && (
                        <nav aria-label="Pagination">
                            <div className="flex items-center justify-center gap-1">
                                {[...Array(totalPages)].map((_, i) => {
                                    const pageNum = i + 1;
                                    const isActive = currentPage === pageNum;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`flex items-center justify-center rounded-full transition-colors w-[32px] h-[32px] text-[13px] ${isActive ? 'bg-light-gray text-black' : 'hover:bg-light-gray'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                        </nav>
                    )}

                    <div className="flex items-center gap-2">
                        <span className="antialiased subpixel-antialiased font-regular text-[13px]">Sayfada gösterilen ürün sayısı:</span>
                        <div className="relative">
                            {isPageSizeOpen && <div className="fixed inset-0" onClick={() => setIsPageSizeOpen(false)} />}
                            {isPageSizeOpen && (
                                <div className="absolute top-full -mt-[1px] left-0 w-full bg-white border border-light-gray rounded-b-[16px] shadow-xl overflow-hidden z-50">
                                    {[24, 48, 72].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => { setProductsPerPage(size); setCurrentPage(1); setIsPageSizeOpen(false); }}
                                            className={`w-full px-3 py-1 text-[13px] cursor-pointer antialiased subpixel-antialiased text-left hover:bg-light-gray ${productsPerPage === size ? 'text-brand-hover-blue' : ''}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button 
                                onClick={() => setIsPageSizeOpen(!isPageSizeOpen)}
                                className={`
                                    antialiased subpixel-antialiased cursor-pointer flex items-center gap-2 py-1 px-3 
                                    text-[13px] font-medium rounded-[16px] transition-colors duration-200
                                    hover:bg-[#E9E9ED] 
                                    ${isPageSizeOpen ? 'bg-[#E9E9ED] rounded-b-none' : 'bg-[#F5F5F7]'}
                                `}
                            >
                                <span>{productsPerPage}</span>
                                <svg viewBox="0 0 32 32" className={`w-2 h-2 transition-transform ${isPageSizeOpen ? 'rotate-180' : ''}`}><path d="M1.1,1.1l15,29.9L30.9,1.1H1.1z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}