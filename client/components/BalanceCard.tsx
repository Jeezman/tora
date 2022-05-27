import { USDIcon } from '../assets/icons';
import { commaify } from '../util/commaify';

interface BalanceProps {
  amount: number;
  title: string;
  type: number;
}

export const BalanceCard = (props: BalanceProps) => {
  return (
    <div className="border w-2/5 rounded-2xl p-4 bg-white box-content flex flex-col justify-center items-center">
      <div className="flex items-center ">
        <span className="rounded-xl relative p-4 bg-gray-100 text-4xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-grey-800 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            data-v-4fa90e7f=""
            width="40"
            height="40"
          >
            <rect width="17" height="6" x="3.5" y="9" rx="3"></rect>
            <path d="M5.5 12a1 1 0 011-1H13v2H6.5a1 1 0 01-1-1v0zM15 11h2.5a1 1 0 011 1v0a1 1 0 01-1 1H15v-2z"></path>
          </svg>
        </span>
        <p className="text-md text-black dark:text-gray-600 ml-2">
          {props.title}
        </p>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-gray-700 dark:text-gray-600 text-4xl text-left mt-4">
          <span className="text-sm inline-block">
            {props.type === 1 ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.9004 7.3444C19.544 7.60538 21.6171 8.41336 21.8469 10.8202C22.0028 12.5748 21.2631 13.6188 20.0399 14.2071C22.0147 14.7001 23.216 15.8589 22.9678 18.4298C22.6656 21.652 20.2549 22.489 16.8085 22.6656L16.8139 25.9923L14.7842 25.9949L14.7788 22.6682C14.557 22.6649 14.3251 22.6682 14.0872 22.6717H14.0871C13.7692 22.6762 13.4408 22.6809 13.1116 22.6703L13.117 25.997L11.091 25.9996L11.0856 22.6729L7.02639 22.5927L7.36847 20.1615C7.36847 20.1615 8.90154 20.1952 8.87311 20.1776C9.43751 20.1746 9.60501 19.7744 9.64673 19.5117L9.63663 14.1789L9.65258 10.3834C9.59025 9.98774 9.32103 9.51304 8.49127 9.49863C8.53646 9.45811 7.00514 9.50054 7.00514 9.50054L7 7.27168L11.1596 7.26634L11.1543 4.00778L13.2499 4.00508L13.2552 7.26364C13.6597 7.25244 14.0588 7.25564 14.4623 7.25888C14.5948 7.25995 14.7277 7.26101 14.8615 7.26158L14.8562 4.00302L16.8951 4.0004L16.9004 7.3444ZM13.0057 13.4753L13.1086 13.4798C14.3423 13.5335 18.0001 13.693 18.0057 11.4753C18.0001 9.36981 14.8871 9.43774 13.4406 9.4693H13.4406H13.4406C13.2698 9.47303 13.1222 9.47625 13.0057 9.47533V13.4753ZM13.1786 20.0076C13.1138 20.0049 13.0541 20.0025 13 20.0004L13 16.0004C13.1289 16.0016 13.2909 15.9996 13.4783 15.9972C15.1877 15.976 19.0058 15.9284 18.9877 18.051C19.007 20.2466 14.6973 20.0698 13.1786 20.0076Z"
                  fill="#323232"
                />
              </svg>
            ) : (
              <USDIcon />
            )}
          </span>
          {commaify(props.amount)}
        </p>
      </div>
    </div>
  );
};
