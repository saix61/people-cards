import './Card.scss';
import { memo, useState, useMemo } from 'react';
import { clsx } from 'clsx';
import { TCard } from '@Components/Card';
import { CharacteristicList } from '@Components/CharactiristicList';

const getCorrectDate = (date: string): string => {
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return dateObject.toLocaleDateString('en-GB', options);
}

export const Card: React.FC<TCard> = memo((props) => {
    const [cardState, setCardState] = useState<boolean>(false);
    const className = clsx(['Card', cardState && '_active']);

    const cardName = useMemo(() => [
        props.name.title,
        props.name.first,
        props.name.last,
    ].join(' '), [
        props.name.title,
        props.name.first,
        props.name.last,
    ]);

    const formattedDate: string = useMemo(() => getCorrectDate(props.dob.date), [props.dob.date]);

    const address = useMemo(() => [
        props.location.city,
        props.location.state,
        props.location.country,
    ].join(', '), [
        props.location.city,
        props.location.state,
        props.location.country,
    ]);

    const CharacteristicListProps = [
        { key: 'Phone No', value: props.phone },
        { key: 'Birthday', value: formattedDate },
        { key: 'Address', value: address },
    ];

    const onCardClick = () => setCardState(state => !state);

    return (
        <div className={className} onClick={onCardClick}>
            <div className="CardHead">
                <div className="CardPhoto" title={cardName}>
                    <picture>
                        <source srcSet={props.picture.thumbnail} media="(max-width: 480px)" />
                        <source srcSet={props.picture.medium} media="(max-width: 768px)" />
                        <source srcSet={props.picture.large} />
                        <img src={props.picture.large} alt={cardName} />
                    </picture>
                </div>
                <div className="CardMainInfo">
                    <div className="CardFullname" title={cardName}>{cardName}</div>
                    <div className="CardEmail" title={props.email}>{props.email}</div>
                </div>
            </div>
            <CharacteristicList list={CharacteristicListProps} />
        </div >
    );
});
