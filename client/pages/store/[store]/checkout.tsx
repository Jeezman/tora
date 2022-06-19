import {useState, useContext, useEffect, useCallback} from 'react';
import {Button} from '../../../components/shared/Button';
import styles from '../../../styles/Store.module.css';
import {CheckoutRequestModel} from '../../models/cart.model';
import {useRouter} from 'next/router';
import {PaymentModal} from '../../../components/PaymentModal';
import {useGetBTCPrice} from '../../../components/shared/useGetBTCPrice';
import {StoreContext} from '../../context/StoreContext';
import {generatePin, handleCrowdPayment} from '../../../api/store';

type crowdData = {
  orderId: string;
  paymentId: string;
  paymentPin: number;
  lnurl: string;
};

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
  const [pin, setPin] = useState(1234);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [crowdData, setCrowdData] = useState<crowdData>({
    orderId: '',
    lnurl: '',
    paymentPin: 0,
    paymentId: '',
  });
  const [crowdBtnText, setCrowdBtnText] = useState('Create payment');
  const [crowdBtnDis, setCrowdBtnDis] = useState(false);

  const data = useGetBTCPrice({amount: orderTotal || 0});

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

  const crowdModal = useCallback(async () => {
    setSidebarActive(true);
    const pin = await generatePin();
    setPin(pin.data);
  }, []);
  
  const crowdPayment =  async () => {
    setCrowdBtnText('Creating ....');
    setCrowdBtnDis(true);
    
    if (orderDetails.orderId) {
      let requestData = {
        orderId: orderDetails.orderId,
        paymentPin: pin,
        sats: data.usdToSats,
      };
 
      const result = await handleCrowdPayment(requestData);
      setCrowdData(result.data);
      setCrowdBtnText('Create payment');
      setCrowdBtnDis(false);
    }
  };

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
            Address
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
          showCrowdFund={crowdModal}
        />
      )}
      <section className={styles.main_sidebar}>
        <div
          className={`${styles.cart_sidebar} ${sidebarActive ? styles.active : ''
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
                value={`${window.location.origin}/crowdpayments/${crowdData.paymentId}`}
              />
              <button className={styles.cf_share_btn} onClick={() => navigator.clipboard.writeText(`${window.location.origin}/crowdpayments/${crowdData.paymentId}`)}>Copy</button>
            </div>
            <div className={styles.cf_pin_wrap}>
              <p className="text-lg text-center uppercase font-bold text-black opacity-75">
                Pin
              </p>
              <h1 className={styles.cf_pin}>{pin}</h1>
              <button className={styles.cf_pin_btn} onClick={() => navigator.clipboard.writeText(pin.toString())}>Copy pin</button>
            </div>
            <div className={styles.crowd_wrap}>
              <button disabled={crowdBtnDis} className={styles.crowd_btn} onClick={crowdPayment}>{crowdBtnText}</button>
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
