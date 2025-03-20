import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export function useInfiniteScroll<T>(
  fetchFn: (page: number) => Promise<{ items: T[]; hasMore: boolean }>,
  options: UseInfiniteScrollOptions = {}
) {
  const {
    threshold = 0.5,
    rootMargin = '100px',
    enabled = true
  } = options;

  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const { items: newItems, hasMore: hasMoreItems } = await fetchFn(page);
      setItems(prev => [...prev, ...newItems]);
      setHasMore(hasMoreItems);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Произошла ошибка'));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, page, isLoading, hasMore]);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          fetchMore();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [enabled, threshold, rootMargin, hasMore, isLoading, fetchMore]);

  const reset = useCallback(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  return {
    items,
    isLoading,
    error,
    hasMore,
    observerTarget,
    reset,
    fetchMore
  };
} 