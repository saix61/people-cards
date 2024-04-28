import "./CharacteristicList.scss";
import { memo, Fragment } from "react";

export type TCharacteristicList = {
    list: { key: string; value: string | number }[];
};

export const CharacteristicList: React.FC<TCharacteristicList> = memo((props) => (
    <div className="CharacteristicList">
        {props.list.map((item, index) => (
            <Fragment key={`${index} ${item.key} ${item.value}`}>
                <div className="CharacteristicListName">{item.key}</div>
                <div className="CharacteristicListValue" title={String(item.value)}>
                    {item.value}
                </div>
            </Fragment>
        ))}
    </div>
));
