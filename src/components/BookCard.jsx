import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export default function BookCard({
  id,
  image,
  title,
  author,
  originalPrice,
  isWishlisted = false,
  onAddToCart,
  onAddToWishlist
}) {
  const [localWishlisted, setLocalWishlisted] = useState(isWishlisted);

  // keep in sync when prop changes (e.g. navigating back)
  useEffect(() => { setLocalWishlisted(isWishlisted); }, [isWishlisted]);

  const handleWishlist = () => {
    setLocalWishlisted(prev => !prev);
    if (onAddToWishlist) onAddToWishlist();
  };

  const titleInitials = title ? `${title.charAt(0)}${title.charAt(title.length - 1)}` : '??';

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative h-56 bg-slate-100 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
            <span className="text-5xl font-bold text-primary-300 uppercase tracking-widest">{titleInitials}</span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-medium text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
            View Details
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-400 hover:text-red-500 shadow-sm transition-colors z-10"
        >
          <Heart className={`h-5 w-5 ${localWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-amber-400">
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current text-slate-300" />
          </div>
          <span className="text-xs text-slate-500 font-medium">(4.0)</span>
        </div>
        
        <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors" title={title}>
          {title}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-1">{author}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Price</span>
            <span className="text-lg font-bold text-slate-900">Rs {originalPrice?.toFixed(2) || '0.00'}</span>
          </div>
          
          <button
            onClick={onAddToCart}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 text-slate-700 hover:bg-primary-600 hover:text-white transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
