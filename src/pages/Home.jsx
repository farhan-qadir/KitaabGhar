import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { bookAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Globe2,
  Heart,
  LayoutGrid,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(() => localStorage.getItem('homeCategory') || '');
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const featuredBooks = books.slice(0, 4);
  const recentBooks = books.slice(0, 3);

  const stats = useMemo(() => {
    const totalBooks = books.length;
    const avgRating = totalBooks
      ? (books.reduce((sum, book) => sum + (Number(book.rating) || 0), 0) / totalBooks).toFixed(1)
      : '4.8';

    return [
      { label: 'Books listed', value: totalBooks || '500+', icon: LayoutGrid },
      { label: 'Happy readers', value: '12k+', icon: Users },
      { label: 'Avg. rating', value: avgRating, icon: Star },
      { label: 'Sustainable swaps', value: '98%', icon: Globe2 },
    ];
  }, [books]);

  const categoryPills = useMemo(
    () => [{ label: 'All', value: '' }, ...categories.map((item) => ({ label: item, value: item }))],
    [categories]
  );

  const homeSteps = [
    {
      number: '01',
      title: 'Browse the shelf',
      description: 'Search by title, author, or category to find your next great read.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Compare and save',
      description: 'Check prices, ratings, and availability before you add to cart.',
      icon: TrendingUp,
    },
    {
      number: '03',
      title: 'Wishlist favorites',
      description: 'Heart books you love and come back when you are ready to buy.',
      icon: Heart,
    },
    {
      number: '04',
      title: 'Checkout quickly',
      description: 'Secure your order and keep your reading list moving forward.',
      icon: ShieldCheck,
    },
  ];

  const trustPoints = [
    { title: 'Verified listings', description: 'Built for trusted buying and selling across readers.' },
    { title: 'Fair pricing', description: 'Affordable second-hand books without the bookstore markup.' },
    { title: 'Fast discovery', description: 'Smart filters help you find the right book in seconds.' },
    { title: 'Community first', description: 'A marketplace that feels like a friendly book club.' },
  ];

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Avid reader',
      text: 'I found the exact books I needed for the semester and saved a ton of money.',
    },
    {
      name: 'Ayesha Khan',
      role: 'University student',
      text: 'The homepage makes browsing so easy — the filters and featured books are spot on.',
    },
    {
      name: 'Michael Chen',
      role: 'Collector',
      text: 'It feels modern, clean, and very bookish. The wishlist feature is my favorite part.',
    },
  ];

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {};
      if (category) filters.category = category;
      if (searchQuery) filters.search = searchQuery;
      const response = await bookAPI.getAll(1, 20, filters);
      setBooks(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
      toast.error('Failed to load books.');
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await bookAPI.getCategories();
      setCategories(response.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
    fetchCategories();
    localStorage.setItem('homeCategory', category);
  }, [fetchBooks, fetchCategories, category]);

  const handleAddToCart = async (bookId) => {
    try {
      await addToCart(bookId, 1);
      toast.success('Book added to cart!');
    } catch {
      toast.error('Please log in to add to cart.');
    }
  };

  const handleWishlist = (book) => {
    toggleWishlist(book);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const value = searchInput.trim();
    navigate(value ? `/?search=${encodeURIComponent(value)}` : '/');
  };

  const getBookInitials = (title = '') => {
    const words = title.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return 'BK';
    return words.slice(0, 2).map((word) => word.charAt(0)).join('').toUpperCase();
  };

  const renderBookVisual = (book, className = '') => {
    if (book?.image) {
      return <img src={book.image} alt={book.title} className={`h-full w-full object-cover ${className}`} />;
    }

    return (
      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 via-white to-amber-50 ${className}`}>
        <span className="text-3xl font-black tracking-[0.3em] text-primary-300 sm:text-4xl">{getBookInitials(book?.title)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.09),transparent_30%),linear-gradient(to_bottom,#f8fafc,white_18%,#f8fafc_100%)] text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200/70">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-amber-50/60" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-emerald-200/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 flex items-center justify-between rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              <button className="rounded-full bg-slate-900 p-2 text-white shadow-sm lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/25">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">KitaabGhar</p>
                <h1 className="text-sm font-semibold text-slate-900 sm:text-base">Book marketplace for curious readers</h1>
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <a href="#featured" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">Featured</a>
              <a href="#browse" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">Browse</a>
              <a href="#stories" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">Stories</a>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
                <Sparkles className="h-4 w-4" />
                Discover books, save money, and keep reading
              </div>

              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Buy, sell, and swap books with fellow readers.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Find textbooks, fiction, and hidden gems in one place. Browse fast, filter smart, and turn your shelf into a community resource.
              </p>

              <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/40">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-inset ring-slate-200 focus-within:ring-primary-300">
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                      placeholder="Search by title, author, or ISBN..."
                      aria-label="Search books"
                    />
                  </div>

                  <div className="flex items-center gap-3 lg:w-auto">
                    <div className="hidden items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500 ring-1 ring-inset ring-slate-200 sm:flex">
                      <Filter className="h-4 w-4" />
                      {category || 'All categories'}
                    </div>
                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:-translate-y-0.5 hover:bg-primary-700">
                      Search
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#browse" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5">
                  <BookOpen className="h-4 w-4" />
                  Browse books
                </a>
                <a href="#featured" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-200 hover:text-primary-700">
                  <ChevronRight className="h-4 w-4" />
                  Explore featured
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-2xl font-black text-slate-950">{stat.value}</p>
                      <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary-100 via-white to-emerald-100 blur-2xl" />
              <div className="rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-2xl shadow-slate-200/50 backdrop-blur">
                <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="overflow-hidden rounded-[1.75rem] bg-slate-900 p-5 text-white">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
                      <span>BookLoop shelf</span>
                      <span>Live</span>
                    </div>
                    <div className="mt-8 space-y-4">
                      <p className="text-3xl font-black leading-tight">Read more. Spend less. Share often.</p>
                      <p className="max-w-xs text-sm leading-6 text-slate-300">A modern home page built for book lovers who want to discover quickly and buy confidently.</p>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {featuredBooks.slice(0, 2).map((book, index) => (
                        <div key={`${book._id}-${index}`} className="overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10">
                          <div className="h-28">{renderBookVisual(book, 'rounded-2xl')}</div>
                          <div className="p-3">
                            <p className="line-clamp-1 text-sm font-semibold text-white">{book.title}</p>
                            <p className="line-clamp-1 text-xs text-slate-300">{book.author}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
                      <div className="grid grid-cols-2 gap-4 p-4">
                        {featuredBooks.slice(0, 4).map((book, index) => (
                          <div key={book._id} className={`overflow-hidden rounded-2xl border border-white bg-white shadow-sm ${index % 2 === 0 ? 'translate-y-2' : '-translate-y-2'}`}>
                            <div className="h-32">{renderBookVisual(book, 'rounded-2xl')}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center gap-2 text-slate-500">
                          <Clock3 className="h-4 w-4" />
                          <span className="text-sm font-medium">Recently added</span>
                        </div>
                        <div className="space-y-3">
                          {recentBooks.map((book) => (
                            <div key={book._id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                              <div className="h-14 w-10 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">{renderBookVisual(book)}</div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">{book.title}</p>
                                <p className="truncate text-xs text-slate-500">{book.author}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[1.75rem] border border-slate-200 bg-primary-600 p-5 text-white shadow-sm">
                        <div className="mb-3 flex items-center gap-2 text-primary-100">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-sm font-medium">Why readers love it</span>
                        </div>
                        <ul className="space-y-3 text-sm leading-6 text-primary-50">
                          <li>• Fast discovery with meaningful categories</li>
                          <li>• Wishlist and cart built into every card</li>
                          <li>• Smooth buying experience on every screen</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="browse" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <Filter className="h-4 w-4" />
              Browse by category
            </div>
            <h3 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Find your next book in seconds</h3>
            <p className="mt-3 max-w-2xl text-slate-600">Use filters to narrow your search, then tap into featured books, recent listings, and top-rated picks.</p>
          </div>

          <a href="#featured" className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary-200 hover:text-primary-700">
            View featured <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex flex-wrap gap-3">
          {categoryPills.map((item) => {
            const active = category === item.value;
            return (
              <button
                key={item.label}
                type="button"
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${active ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/10' : 'border border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700'}`}
                onClick={() => setCategory(item.value)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
              <Star className="h-4 w-4 fill-current" />
              Featured books
            </div>
            <h3 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Handpicked for the homepage</h3>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button className="rounded-full border border-slate-200 bg-white p-3 text-slate-500 shadow-sm transition hover:text-slate-950">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-slate-200 bg-white p-3 text-slate-500 shadow-sm transition hover:text-slate-950">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {error && <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-600">Error: {error}</div>}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-[28rem] animate-pulse rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-4 h-56 rounded-2xl bg-slate-200" />
                <div className="mb-3 h-4 rounded-full bg-slate-200" />
                <div className="mb-6 h-4 w-2/3 rounded-full bg-slate-200" />
                <div className="mt-auto flex items-center justify-between">
                  <div className="h-6 w-20 rounded-full bg-slate-200" />
                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(featuredBooks.length > 0 ? featuredBooks : books).map((book) => (
              <BookCard
                key={book._id}
                id={book._id}
                image={book.image}
                title={book.title}
                author={book.author}
                originalPrice={book.price}
                isWishlisted={isWishlisted(book._id)}
                onAddToCart={() => handleAddToCart(book._id)}
                onAddToWishlist={() => handleWishlist(book)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-8 py-20 text-center shadow-sm">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-950">No books found</h3>
            <p className="mt-2 text-slate-500">Try a different category or search term.</p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
              <LayoutGrid className="h-4 w-4" />
              How it works
            </div>
            <h3 className="text-3xl font-black tracking-tight text-slate-950">A simple path from discovery to checkout</h3>
            <div className="mt-8 space-y-5">
              {homeSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex gap-4 rounded-3xl bg-slate-50 p-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-sm ring-1 ring-slate-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary-600">{step.number}</span>
                        <h4 className="text-lg font-semibold text-slate-950">{step.title}</h4>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
              <ShieldCheck className="h-4 w-4" />
              Why readers trust us
            </div>
            <h3 className="text-3xl font-black tracking-tight">Marketplace energy with a clean, premium feel</h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-base font-semibold text-white">{point.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{point.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-primary-600 p-5 shadow-lg shadow-primary-600/20">
              <div className="flex items-center gap-2 text-primary-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Platform highlights</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-white">
                <div>
                  <p className="text-2xl font-black">4.8/5</p>
                  <p className="text-sm text-primary-100">Reader satisfaction</p>
                </div>
                <div>
                  <p className="text-2xl font-black">24h</p>
                  <p className="text-sm text-primary-100">Fast discovery cycle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stories" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <Users className="h-4 w-4" />
              Reader stories
            </div>
            <h3 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">What our community is saying</h3>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((review) => (
            <div key={review.name} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex text-amber-400">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-600">“{review.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 font-bold text-primary-700">{review.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-slate-950">{review.name}</p>
                  <p className="text-sm text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-10 text-white shadow-2xl shadow-slate-200 sm:px-10 lg:px-14 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                <Sparkles className="h-4 w-4" />
                Start your next chapter
              </div>
              <h3 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">Turn your bookshelf into a community marketplace.</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Whether you are hunting for a bargain or listing books you no longer need, this home page now leads with a stronger story and a smoother path to action.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="#browse" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
                Browse books
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#featured" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                See featured picks
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
