import './Aside.scss';
import { memo, useEffect, useMemo, useState } from 'react';
import { TCard } from '@Components/Card';
import { CharacteristicList, TCharacteristicList } from '@Components/CharactiristicList';

export type TAside<T> = { list: T[] };

export const Aside: React.FC<TAside<TCard>> = memo((props) => {
    const [ageGroups, setAgeGroups] = useState<TCharacteristicList['list']>();

    useEffect(() => {
        let group_1 = 0;
        let group_2 = 0;
        let group_3 = 0;
        let group_4 = 0;
        let group_5 = 0;

        props.list.map(item => {
            const { age } = item.dob;
            if (age >= 11 && age <= 20) {
                group_1++;
            }
            else if (age >= 21 && age <= 30) {
                group_2++;
            }
            else if (age >= 31 && age <= 40) {
                group_3++;
            }
            else if (age >= 41 && age <= 50) {
                group_4++;
            }
            else if (age >= 51) {
                group_5++;
            }
        });

        const newAgeGroups: TCharacteristicList['list'] = [
            { key: '11 to 20', value: group_1 },
            { key: '21 to 30', value: group_2 },
            { key: '31 to 40', value: group_3 },
            { key: '41 to 50', value: group_4 },
            { key: '51+', value: group_5 }
        ];
        setAgeGroups(newAgeGroups);
    }, [props.list]);

    const genderGroupMale = useMemo(
        () => props.list.filter(item => item.gender === 'male'),
        [props.list]
    ).length;

    const genderGroupFemale = useMemo(
        () => props.list.length - genderGroupMale,
        [props.list.length, genderGroupMale]
    );

    const genderGroups = useMemo(() => [
        { key: 'Male', value: genderGroupMale },
        { key: 'Female', value: genderGroupFemale },
    ], [
        genderGroupMale,
        genderGroupFemale
    ]);

    return (
        <div className='Aside'>
            <div className="AsideTitle">{props.list.length} Users</div>
            <div className="AsideLine"></div>
            {ageGroups && (
                <>
                    <div className="AsideSubTitle">Age Groups</div>
                    <CharacteristicList list={ageGroups} />
                    <div className="AsideLine"></div>
                </>
            )}
            <div className="AsideSubTitle">Gender Groups</div>
            <CharacteristicList list={genderGroups} />
        </div>
    )
});
