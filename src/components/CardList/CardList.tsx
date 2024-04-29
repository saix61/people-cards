import './CardList.scss';
import { memo, useState, useEffect, useRef } from 'react';
import { Card, TCard } from '@Components/Card';

export type TCardList<T> = { list: T[] };

export const CardList: React.FC<TCardList<TCard>> = memo((props) => {
    const [visibleCount, setVisibleCount] = useState<number>(50);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setVisibleCount(prevCount => prevCount + 50);
            }
        }, { threshold: 1 });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [props.list.length]);

    return (
        <div className='CardList'>
            {props.list.slice(0, visibleCount).map((item) => {
                return (
                    <Card key={item.login.uuid} {...item} />
                );
            })}
            {visibleCount < props.list.length && (
                <div className='CardListLazyLoad' ref={loaderRef}>Loading...</div>
            )}
        </div>
    )
});
