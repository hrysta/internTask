// App.tsx
import React, { useState, useEffect } from 'react';
import ProductComponent from './ProductComponent';
import './index.scss';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const App: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/components.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  const handleSelect = (id: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedProducts((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedProducts((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id));
    }
  };

  const handleReset = () => {
    setSelectedProducts([]);
    setShowMoreMenu(false)
  };

  const getMoreButtonText = (): string => {
    const selectedCount = selectedProducts.filter((el)=>el > 4).length;
    if (selectedCount === 1) {
      const selectedProduct = products.find((product) => product.id === selectedProducts[0]);
      return selectedProduct ? selectedProduct.name : '';
    } else if (selectedCount > 1) {
      return `${selectedCount} Selected`;
    } else {
      return '';
    }
  };

  return (
    <div className='container'>
      <div className='container_visible'>
          <div>
            <h2>Car type</h2>
          </div>
        { selectedProducts.length > 0 && (
          <div style={{margin: 'auto'}}>
            <button
              className='resetBtn'
              onClick={handleReset}>
                <h2>Reset</h2>
            </button>
          </div>
        )}
      </div>
      <div style={{ display: 'flex'}}>
        {products.slice(0, 4).map((product) => (
          <ProductComponent
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            isSelected={selectedProducts.includes(product.id)}
            onSelect={handleSelect}
          />
        ))}
        {products.length > 4 && (
          <div style={{ position: 'relative'}}>
            <div
            className="moreBtn"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            >
                <div>More {showMoreMenu ? <span>&#x2715;</span> : <span className='arrow'>&#10096;</span>}</div>
 {getMoreButtonText()}


            </div>
            {showMoreMenu && (
              <div
              className='moreMenu'
              >
                {products.slice(4).map((product) => (
                  <div className='hiddenElementsList'
                  key={product.id}
                  >
                    <label
                      className='hiddenElementsList_element'
                    >
                     <div
                     className='hiddenElementsList_element--name'
                     >
                     <input
                        type="checkbox"
                        style={{scale: '130%'}}
                        checked={selectedProducts.includes(product.id)}
                        onChange={() =>
                          handleSelect(product.id, !selectedProducts.includes(product.id))
                        }
                      />
                      <img src={product.image} alt={product.name} style={{ scale: '60%' , objectFit: 'cover' }} />
                     <p>
                     {product.name}
                     </p>
                     </div>

                      <p style={{marginLeft: '10px'}}>
                        ${product.price.toFixed()}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
