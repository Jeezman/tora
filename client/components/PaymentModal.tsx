import { useState, ReactNode, useContext } from 'react';
import { SpinnerIcon } from '../assets/icons';
import Modal from './shared/Modal';
import styles from '../styles/PaymentModal.module.css';
import { QRCodeSVG } from 'qrcode.react';
import { StoreContext } from '../pages/context/StoreContext';
import { commaify } from '../util/commaify';
import { Button } from './shared/Button';

type Props = {
  show?: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  actions?: ReactNode;
  close: () => void;
  showCrowdFund: () => void;
  //   onSubmit: (data: ProductRequestModel) => void;

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
  data: Data;
};

interface Data {
  usd?: number;
  usdToSats?: number;
  usdToBTC?: number;
}

const CHAIN = {
  bitcoin: 'BITCOIN',
  lightning: 'LIGHTNING',
};

export const PaymentModal = ({ show, close, data, showCrowdFund }: Props) => {
  const { isFetchingInvoice, addresses } = useContext(StoreContext);
  const [chain, setChain] = useState(CHAIN.bitcoin);
  const handleSubmit = () => {};

  const formattedPriceInSats = Number(data.usdToSats?.toFixed(0));
  console.log('formattedPriceInSats ', formattedPriceInSats);
  return (
    <div className={styles.container} onClick={close}>
      <Modal
        title="Make Payment"
        show={show}
        closeModal={close}
        handleSubmit={handleSubmit}
        showFooter={false}
      >
        <section className={styles.content}>
          <div className={styles.crowdfundBtn}>
            <Button disabled={false} onClick={showCrowdFund}>
              Crowd Fund
            </Button>
          </div>
          {isFetchingInvoice ? (
            <aside className={styles.loading_container}>
              <SpinnerIcon size={40} color="#444" />
            </aside>
          ) : (
            <aside>
              <div>
                <div className="h-10 flex-shrink-0 relative mt-4 md:mt-8 text-gray-400 flex rounded-2xl text-sm max-w-lg w-full mx-auto bg-gray-300">
                  <button
                    onClick={() => setChain(CHAIN.bitcoin)}
                    className={`w-1/2 z-10 text-black-200 ${
                      chain === CHAIN.bitcoin ? 'text-white font-semibold' : ''
                    }`}
                  >
                    Bitcoin
                  </button>
                  <button
                    onClick={() => setChain(CHAIN.lightning)}
                    className={`w-1/2 z-10 text-black-200 ${
                      chain === CHAIN.lightning
                        ? 'text-white font-semibold'
                        : ''
                    }`}
                  >
                    Lightning
                  </button>
                  <div
                    className={`absolute inset-0 bg-white h-full w-1/2 ${
                      chain === CHAIN.bitcoin
                        ? styles.method_selected
                        : `${styles.method_selected} ${styles.slide_right}`
                    }`}
                  />
                </div>
              </div>
              <div className="border rounded-md mt-10 mx-2 px-10 py-5 flex flex-col justify-center items-center">
                <h2 className="text-3xl">
                  {commaify(formattedPriceInSats)} Sats
                </h2>
                <h5 className="text-black text-lg opacity-75 mb-6">
                  ${data.usd} USD
                </h5>
                {chain === CHAIN.bitcoin ? (
                  <>
                    <QRCodeSVG value={addresses.lnInvoice} size={300} />
                    <h2 className="mt-6 uppercase text-gray-600">
                      Bitcoin Address
                    </h2>
                    <span className={styles.address}>
                      {addresses.bitcoinAddress.toUpperCase()}
                    </span>
                  </>
                ) : (
                  <>
                    <QRCodeSVG value={addresses.lnInvoice} size={300} />
                    <h2 className="mt-6 uppercase text-gray-600">
                      Lightning Invoice
                    </h2>
                    <span className={styles.address}>
                      {addresses.lnInvoice.toUpperCase()}
                    </span>
                  </>
                )}
              </div>
            </aside>
          )}
        </section>
      </Modal>
    </div>
  );
};
