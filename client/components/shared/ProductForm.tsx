import { useState, ReactNode } from 'react';
import { ProductRequestModel } from '../../pages/models/store.model';
import Modal from './Modal';

type Props = {
  show?: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  actions?: ReactNode;
  close: () => void;
  onSubmit: (data: ProductRequestModel) => void;

  /* styles */
  className?: string;
  headerClassName?: string;
  mainClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;

  style?: object;

  bordered?: boolean;
  noShadow?: boolean;
  bgHeader?: boolean;
  small?: boolean;
  fixedHeight?: boolean;
};

/**
 * {
    "storeId": 1,
    "name": "Crocs",
    "amount": 5,
    "description": "Simple Crocs",
    "dTimeline": 7,
    "count": 40,
    "image": "http://res.cloudinary.com/dze6uuzdx/image/upload/v1652792730/y4ymdlxmlrzlpzrqqhti.png"
}
 */

export const ProductForm = ({ show, close, onSubmit }: Props) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [deliveryTimeline, setDeliveryTimeline] = useState(0);
  const [amountInStock, setAmountInStock] = useState(0);
  const [image, setImage] = useState('');

  const handleSubmit = () => {
    let data: ProductRequestModel = {
      name: productName,
      dTimeline: deliveryTimeline,
      storeId: 1,
      amount: amount,
      count: amountInStock,
      image: image,
      description,
    };
    onSubmit(data)
  };
  return (
    <div>
      <Modal
        title="Add Product"
        show={show}
        closeModal={close}
        handleSubmit={handleSubmit}
      >
        <div className="mb-4 mt-6">
          <label htmlFor="name" className="mb-[3px] block text-gray-600">
            Name
          </label>
          <input
            id="name"
            placeholder="Your product name"
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            className=" form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="mb-[3px] block text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Add a simple product description"
            onChange={(e) => setDescription(e.target.value)}
            className=" form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="mb-[3px] block text-gray-600">
            Price
          </label>
          <input
            id="price"
            placeholder="0"
            onChange={(e) => setAmount(Number(e.target.value))}
            type="text"
            className=" form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="delivery" className="mb-[3px] block text-gray-600">
            Delivery Timeline
          </label>
          <input
            id="delivery"
            placeholder="Days this product can be delivered nationwide"
            onChange={(e) => setDeliveryTimeline(Number(e.target.value))}
            type="text"
            className=" form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="in-stock" className="mb-[3px] block text-gray-600">
           Number in stock
          </label>
          <input
            id="in-stock"
            placeholder="How many in stock"
            onChange={(e) => setAmountInStock(Number(Number(e.target.value)))}
            type="text"
            className=" form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
      </Modal>
    </div>
  );
};
