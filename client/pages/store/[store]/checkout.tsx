import { useState, useContext, useEffect } from 'react';
import { Button } from '../../../components/shared/Button';
import styles from '../../../styles/Store.module.css';
import { CheckoutRequestModel } from '../../models/cart.model';
import { useRouter } from 'next/router';
import { PaymentModal } from '../../../components/PaymentModal';
import { useGetBTCPrice } from '../../../components/shared/useGetBTCPrice';
import { StoreContext } from '../../context/StoreContext';

const Checkout = () => {
  const {
    handleAddToCart,
    handleFetchCart,
    cartItems,
    handleCartCheckout,
    handlePayment,
    orderDetails,
    orderTotal,
  } = useContext(StoreContext);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(true);

  const data = useGetBTCPrice({ amount: orderTotal || 0 });

  const router = useRouter();

  const handleCheckout = async () => {
    let data = {
      email,
      phoneNumber: phone,
      address,
      cartId: cartItems[0].cartId,
      storeName: router.query.store,
    };
    await handleCartCheckout(data);
    showModal();
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    router.push(`/store/${router.query.store}`);
  };

  const showModal = () => {
    setShowPaymentModal(true);
  };

  useEffect(() => {
    if (orderDetails.orderId) {
      let requestData = {
        orderId: orderDetails.orderId,
        orderTotal,
        bitcoins: data.usdToBTC,
        sats: data.usdToSats,
      };
      handlePayment(requestData);
    }
  }, [
    data?.usdToBTC,
    data?.usdToSats,
    handlePayment,
    orderDetails.orderId,
    orderTotal,
  ]);

  const canPay = Boolean(email) && Boolean(phone) && Boolean(address);

  return (
    <section className={styles.container}>
      <h1 className="text-6xl">Checkout</h1>
      <div className="mb-2 w-2/5">
        <div className="mb-6 mt-10">
          <label htmlFor="email" className="mb-[3px] block text-gray-600">
            Email
          </label>
          <input
            id="email"
            placeholder="John@example.com"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className=" form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="phone" className="mb-[3px] block text-gray-600">
            Phone Number
          </label>
          <input
            id="phone"
            placeholder="08082223322"
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className=" form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="mb-[3px] block text-gray-600">
            Email
          </label>
          <input
            id="address"
            placeholder="4 Unamed road, Lagos"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className=" form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <Button disabled={!canPay} onClick={handleCheckout}>
          Pay
        </Button>
      </div>
      {orderTotal > 0 && (
        <PaymentModal
          data={data}
          show={showPaymentModal}
          close={closeModal}
          showCrowdFund={() => setSidebarActive(true)}
        />
      )}
      <section className={styles.main_sidebar}>
        <div
          className={`${styles.cart_sidebar} ${
            sidebarActive ? styles.active : ''
          }`}
        >
          <h1 className="mb-4 text-2xl font-bold">Crowdfund Shopping Cart</h1>
          <p className="mb-2 text-lg">
            Share payment link with friends or family
          </p>
          <div className={styles.cf_content}>
            <div className={styles.cf_input_wrap}>
              <input
                className={styles.cf_input}
                placeholder="localhost:3000/taro/crowdpayments"
                value="localhost:3000/taro/crowdpayments"
              />
              <button className={styles.cf_share_btn}>Copy</button>
            </div>
            <div className={styles.cf_pin_wrap}>
              <p className="text-lg text-center uppercase font-bold text-black opacity-75">
                Pin
              </p>
              <h1 className={styles.cf_pin}>4231</h1>
            </div>
          </div>
        </div>
        <div
          onClick={() => setSidebarActive(!sidebarActive)}
          className={styles.cart_sidebar_overlay}
        ></div>
      </section>
    </section>
  );
};

export default Checkout;
