import React, { useState } from 'react';
import cn from 'classnames';

interface ProductComponentProps {
  id: number;
  name: string;
  image: string;
  price?: number;
  isSelected: boolean;
  onSelect: (id: number, isSelected: boolean) => void;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ id, name, image, price, isSelected, onSelect }) => {
  const [showPriceTooltip, setShowPriceTooltip] = useState(false);

  const handleClick = () => {
    onSelect(id, !isSelected);
  };

  const handleMouseEnter = () => {
    setShowPriceTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowPriceTooltip(false);
  };

  const buttonClasses = cn('visibleElement', {
    'selected': isSelected,
  });

  return (
    <div
    className={buttonClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'}}
      >
      <img src={image} alt={name} style={{ scale: '60%', objectFit: 'cover' }} />
        {name}
      </div>
      {showPriceTooltip && (
        <div className='showPriceTooltip'>
          ${price}+
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
