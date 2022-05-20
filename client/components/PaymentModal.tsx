import { useState, ReactNode, useContext } from 'react';
import { SpinnerIcon } from '../assets/icons';
import Modal from './shared/Modal';
import styles from '../styles/PaymentModal.module.css';
import { CartContext } from '../pages/context/CartContext';
import {QRCodeSVG} from "qrcode.react"

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

export const PaymentModal = ({ show, close }: Props) => {
  const { isFetchingInvoice, addresses } = useContext(CartContext);
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
                <h2 className='mb-2 mt-4 font-semibold'>Bitcoin Address</h2>
                <span className={styles.address}>{addresses.bitcoinAddress}</span>
              </div>
              <div>
                <h2 className='mb-2 mt-4 font-semibold'>Lightning Address</h2>
                <span className={styles.address}>{addresses.lnInvoice}</span>
                </div>
                <QRCodeSVG value={addresses.lnInvoice} includeMargin size={256} />
            </aside>
          )}
        </section>
      </Modal>
    </div>
  );
};
