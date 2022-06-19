import React, { useContext, useEffect, useState, Fragment } from 'react';
import Head from 'next/head';
import { DashboardLayout, siteTitle } from '../../components/DashboardLayout';
import styles from '../../styles/Dashboard.module.css';
import { useRouter } from 'next/router';
import { Button } from '../../components/shared/Button';
import { Dialog, Transition } from '@headlessui/react';
import { DashboardContext } from '../context/DashboardContext';
import { BalanceCard } from '../../components/BalanceCard';
import { TransactionTable } from '../../components/shared/TransactionsTable';
import { StoreContext } from '../context/StoreContext';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
function Dashboard() {
  const router = useRouter();
  const { handleCreateStore,handleGetUserBalance,balance } = useContext(DashboardContext);
  const { storeName } = useContext(StoreContext);
  const [addStoreModal, setAddStoreModal] = useState(false);
  const [price, setPrice] = useState(false);

  const { data, error } = useSWR('https://api.coinstats.app/public/v1/coins?skip=0&limit=1', fetcher, { refreshInterval: 60000 });

  useEffect(() => {
    handleGetUserBalance()
  }, [])

  const handleCloseAddStoreModal = () => setAddStoreModal(false);
  const onCreateStore = (name: string) => {
    handleCreateStore({ name: name });
    setAddStoreModal(false);
  };

  return (
    <section>
      <div className={styles.top}>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <Button disabled={!!storeName} onClick={() => setAddStoreModal(true)}>{!!storeName ? `${storeName.toUpperCase()}` : `Create store`}</Button>
      </div>
      <div className='flex w-1/2 justify-between my-10'>
        <BalanceCard title='Bitcoin Wallet' amount={balance} type={1} />
        <BalanceCard title='USD Wallet' amount={Number(balance * data?.coins[0].price).toFixed(2)} type={2} />
      </div>
      <aside>
        <h2 className='mb-8 text-2xl font-semibold'>Recent Activity</h2>
        <TransactionTable />
      </aside>
      <MyModal
        show={addStoreModal}
        closeModal={handleCloseAddStoreModal}
        handleSubmit={onCreateStore}
      />
    </section>
  );
}

Dashboard.layout = DashboardLayout;

function MyModal({ show, closeModal, handleSubmit }: any) {
  const [storeName, setStoreName] = useState('');
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-10" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <label htmlFor="store">Enter store name</label>
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      id="store"
                      onChange={(e) => setStoreName(e.target.value)}
                      type="text"
                      className=" form-control block w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleSubmit(storeName)}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Dashboard;
