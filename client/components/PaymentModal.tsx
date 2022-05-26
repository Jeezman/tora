import { useState, ReactNode, useContext } from 'react';
import { SpinnerIcon } from '../assets/icons';
import Modal from './shared/Modal';
import styles from '../styles/PaymentModal.module.css';
import { CartContext } from '../pages/context/CartContext';
import { QRCodeSVG } from 'qrcode.react';

type Props = {
  show?: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  actions?: ReactNode;
  close: () => void;
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
};

const CHAIN = {
  bitcoin: 'BITCOIN',
  lightning: 'LIGHTNING',
};

export const PaymentModal = ({ show, close }: Props) => {
  const { isFetchingInvoice, addresses } = useContext(CartContext);
  const [chain, setChain] = useState(CHAIN.bitcoin);
  const handleSubmit = () => {};
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
                <h2 className="text-3xl">0.000868 BTC</h2>
                <h5 className="text-black text-lg opacity-75 mb-6">$25 USD</h5>
                {chain === CHAIN.bitcoin ? (
                  <>
                    <QRCodeSVG
                      value={
                        addresses.lnInvoice ||
                        '3MCK95rgzRiJxZ19swhvS44khTfYiHQdjF'
                      }
                      size={300}
                    />
                    <h2 className="mt-6 uppercase text-gray-600">
                      Bitcoin Address
                    </h2>
                    <span className={styles.address}>
                      {addresses.bitcoinAddress ||
                        '3MCK95rgzRiJxZ19swhvS44khTfYiHQdjF'}
                    </span>
                  </>
                ) : (
                  <>
                    <QRCodeSVG
                      value={
                        addresses.lnInvoice ||
                        'LNBC868230N1P3G73V4PP56PRHQ5FGN75XD7PFZADVLPHX6MV7LPJRDS4UYYKREQ7SNDQUE5SQDPZF9H8VMMFVDJJQGE3YQKJQNNFVD5X7MRPWVCQZPGXQZJHSP5UHAXZHHHYFU7E9GK6C57VY3W0C4YNGH6LL0JG8QULHN3GX5YWN0Q9QYYSSQHMS2GSGH7LTE7QZ4R6GFMJH00YRSRZHTGPQFLX7HWMFKPH9WEVM57LXMRRA4P022FSGHW9C4X2RV49MM8MTYJZXZLVH27ZHJ66C6K3GQGJJFDY'
                      }
                      size={300}
                    />
                    <h2 className="mt-6 uppercase text-gray-600">
                      Lightning Invoice
                    </h2>
                    <span className={styles.address}>
                      {addresses.lnInvoice ||
                        'LNBC868230N1P3G73V4PP56PRHQ5FGN75XD7PFZADVLPHX6MV7LPJRDS4UYYKREQ7SNDQUE5SQDPZF9H8VMMFVDJJQGE3YQKJQNNFVD5X7MRPWVCQZPGXQZJHSP5UHAXZHHHYFU7E9GK6C57VY3W0C4YNGH6LL0JG8QULHN3GX5YWN0Q9QYYSSQHMS2GSGH7LTE7QZ4R6GFMJH00YRSRZHTGPQFLX7HWMFKPH9WEVM57LXMRRA4P022FSGHW9C4X2RV49MM8MTYJZXZLVH27ZHJ66C6K3GQGJJFDY'}
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
