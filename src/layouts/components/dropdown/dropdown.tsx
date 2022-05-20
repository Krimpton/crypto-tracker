import { FC, useState } from 'react';
import './dropdown.scss';

export interface selectedProps {
  selected: boolean;
  setSelected: any;
}

const Dropdown: FC<selectedProps> = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const options = ['Top Traded', 'Top Gainer', 'Top Loser'];

  return (
    <div>
      <div className="dropdown">
        <div role="presentation" className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
          {selected}
          <span className="material-icons-outlined">arrow_drop_down</span>
        </div>
        {isActive && (
          <div className="dropdown-content">
            {options.map((option) => (
              <div
                role="presentation"
                onClick={() => {
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
