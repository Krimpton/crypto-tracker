import React, {FC, useState} from 'react';
import "./Dropdown.scss";
import {selectedProps} from "../main-page/main-page";


const Dropdown: FC<selectedProps> = ({selected, setSelected}) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const options = ["Top Traded", "Top Gainer", "Top Loser"];

    return (
        <div>
            <div className="dropdown">
                <div className="dropdown-btn" onClick={(e) =>
                    setIsActive(!isActive)}>
                    {selected}
                    <span className="material-icons-outlined">arrow_drop_down</span>
                </div>
                {isActive && (
                    <div className="dropdown-content">
                        {options.map((option) => (
                            <div
                                onClick={(e) => {
                                    setSelected(option);
                                    setIsActive(false);
                                }}
                                className="dropdown-item"
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;