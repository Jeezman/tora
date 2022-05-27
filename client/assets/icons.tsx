import * as React from "react"
import {SVGProps} from 'react';

export const LightningIcon = (props: any) => (
  <svg
    width={20}
    height={20}
    className="mr-3"
    viewBox="0 0 200 307"
    fill="none"
    {...props}
  >
    <path d="m56 0 51.606 131H0l177 176-70.021-142H200L56 0Z" />
  </svg>
)

export const CartIcon = (props: any) => (
  <svg
    width={76}
    height={95}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m74.45 60.27-.889-19.156-.45-9.578v-.243a.558.558 0 0 0-.61-.363H56.058l-.61-14.792a20.207 20.207 0 0 0-2.082-8.002c-.244-.485-.5-.946-.78-1.394a17.362 17.362 0 0 0-1.888-2.486 13.033 13.033 0 0 0-4.64-3.258 13.089 13.089 0 0 0-5.592-.985c-.898.026-1.793.107-2.68.242h-.731a9.264 9.264 0 0 0-1.827-.121 13.439 13.439 0 0 0-9.148 3.152c-.383.343-.745.707-1.085 1.091a17.89 17.89 0 0 0-2.643 3.965c-.484.974-.89 1.983-1.218 3.02a23.428 23.428 0 0 0-.426 1.587 22.819 22.819 0 0 0-.5 3.31l-.853 12.488h6.457v-.121h.11l.852-12.488a18.96 18.96 0 0 1 4.385-11.276c.22-.242.45-.484.67-.703a7.1 7.1 0 0 1 2.799-2.616 7.142 7.142 0 0 1 7.378.482 7.088 7.088 0 0 1 2.43 2.959 18.61 18.61 0 0 1 4.386 11.154l.597 14.67H4.53a.866.866 0 0 0-.731.728L.023 91.186c-.06.484-.001.975.17 1.432.175.458.45.872.804 1.212l.085.073a3.337 3.337 0 0 0 2.68 1.09h68.581a3.79 3.79 0 0 0 2.68-1.09c.122-.122.122-.243.244-.243.122-.242.243-.364.365-.606.262-.57.387-1.192.366-1.819v-.12L74.45 60.27Zm-53.232 2.728c0-1.475.44-2.916 1.263-4.142a7.485 7.485 0 0 1 3.362-2.747 7.524 7.524 0 0 1 8.164 1.617 7.425 7.425 0 0 1 1.624 8.126 7.464 7.464 0 0 1-2.76 3.346 7.517 7.517 0 0 1-4.161 1.257 7.62 7.62 0 0 1-5.266-2.216A7.548 7.548 0 0 1 21.218 63Zm26.58-59.82c.74.577 1.425 1.223 2.046 1.927a17.051 17.051 0 0 1 2.437 3.637c.443.917.818 1.865 1.12 2.837.446 1.509.72 3.062.816 4.632l.597 14.67h-4.007l-.61-14.791a18.974 18.974 0 0 0-4.75-11.882A16.008 16.008 0 0 0 40.818.57c.341 0 .682 0 1.023.06.832.1 1.65.295 2.436.582a12.283 12.283 0 0 1 3.52 1.964ZM74.707 91.78a1.986 1.986 0 0 1-.622 1.212 2.438 2.438 0 0 1-1.827.728H61.295c-.325 0-.647-.057-.95-.17a2.642 2.642 0 0 1-.414-.206l-.317-.242a2.226 2.226 0 0 1-.634-1.564L56.18 32.25h15.713l2.802 59.166c.023.12.027.243.013.364Z"
      fill={props.color || "#fff"}
    />
  </svg>
)

export const CartIconBag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    // width={22}
    // height={25}
    fill="currentColor"
    {...props}
  >
    <path
      d="M7.421 6.284h7.904v2.384a3.91 3.91 0 0 1-1.157 2.774 3.969 3.969 0 0 1-5.59 0 3.908 3.908 0 0 1-1.157-2.774V6.284z"
      fill="currentColor"
    />
    <path
      d="M11.373 0A3.969 3.969 0 0 0 8.58 1.15a3.908 3.908 0 0 0-1.16 2.773v2.53h1.635v-2.53a2.293 2.293 0 0 1 .695-1.599 2.328 2.328 0 0 1 3.248 0c.434.423.683.997.695 1.6v2.53h1.635v-2.53a3.901 3.901 0 0 0-1.159-2.776A3.958 3.958 0 0 0 11.373 0z"
      fill="currentColor"
    />
    <path
      d="M21.996 23.67 20.102 7.343a1.19 1.19 0 0 0-.395-.754 1.208 1.208 0 0 0-.8-.303H13.71v2.317a2.31 2.31 0 0 1-.684 1.64 2.346 2.346 0 0 1-3.306 0 2.31 2.31 0 0 1-.684-1.64V6.285H3.844c-.296 0-.58.108-.801.303a1.19 1.19 0 0 0-.394.754L.758 23.671a1.185 1.185 0 0 0 .297.93 1.201 1.201 0 0 0 .898.399h18.844a1.21 1.21 0 0 0 .9-.397 1.19 1.19 0 0 0 .299-.932z"
      fill="currentColor"
    />
  </svg>
)

export const SpinnerIcon = ({ size = 24, color = '#fff', className = ''}) => {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24">
      <rect width="24" height="24" fill="none" rx="0" ry="0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4.5C11 5.05 11.45 5.5 12 5.5C12.55 5.5 13 5.05 13 4.5V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2V4.5ZM11 22C11 22.55 11.45 23 12 23C12.55 23 13 22.55 13 22V19.5C13 18.95 12.55 18.5 12 18.5C11.45 18.5 11 18.95 11 19.5V22ZM17 21.66C16.66 21.66 16.32 21.48 16.13 21.16L14.87 18.99C14.59 18.51 14.76 17.9 15.23 17.62C15.71 17.34 16.32 17.5 16.6 17.98L17.86 20.15C18.14 20.63 17.97 21.24 17.5 21.52C17.34 21.62 17.17 21.66 17 21.66ZM7.38998 6.01006C7.57998 6.33006 7.91998 6.51006 8.25998 6.51006C8.42998 6.51006 8.59998 6.47006 8.75998 6.37006C9.23997 6.10006 9.39997 5.49006 9.11998 5.01006L7.85998 2.84006C7.58998 2.36006 6.96997 2.20006 6.49998 2.48006C6.01998 2.75006 5.85997 3.36006 6.13998 3.84006L7.38998 6.01006ZM20.66 18C20.49 18 20.32 17.96 20.16 17.86L17.99 16.6C17.51 16.32 17.35 15.71 17.63 15.23C17.91 14.75 18.52 14.59 19 14.87L21.17 16.13C21.65 16.41 21.81 17.02 21.53 17.5C21.34 17.82 21 18 20.66 18ZM5.01006 9.11998C5.17006 9.21998 5.34006 9.25998 5.51006 9.25998C5.85006 9.25998 6.19006 9.07998 6.37006 8.76998C6.65006 8.28998 6.49006 7.67998 6.01006 7.39998L3.85006 6.13998C3.37006 5.85997 2.76006 6.01998 2.48006 6.49998C2.20006 6.97998 2.36006 7.58998 2.84006 7.85998L5.01006 9.11998ZM22 13H19.5C18.95 13 18.5 12.55 18.5 12C18.5 11.45 18.95 11 19.5 11H22C22.55 11 23 11.45 23 12C23 12.55 22.55 13 22 13ZM2 13H4.5C5.05 13 5.5 12.55 5.5 12C5.5 11.45 5.05 11 4.5 11H2C1.45 11 1 11.45 1 12C1 12.55 1.45 13 2 13ZM18.49 9.25997C18.15 9.25997 17.81 9.07997 17.62 8.75997C17.34 8.27997 17.51 7.66997 17.9799 7.38997L20.15 6.12997C20.6299 5.84997 21.24 6.00996 21.52 6.48996C21.8 6.96996 21.63 7.57997 21.16 7.85997L18.99 9.11996C18.83 9.21996 18.66 9.25997 18.49 9.25997ZM2.48006 17.5C2.66006 17.82 3.00006 18 3.34006 18C3.51006 18 3.68006 17.96 3.85006 17.86L6.02006 16.6C6.49006 16.32 6.66006 15.71 6.38006 15.23C6.10006 14.75 5.49006 14.59 5.01006 14.87L2.84006 16.13C2.37006 16.41 2.20006 17.02 2.48006 17.5ZM15.74 6.51005C15.57 6.51005 15.4 6.47005 15.24 6.37005C14.76 6.09005 14.6 5.48005 14.88 5.00005L16.14 2.83005C16.42 2.35005 17.03 2.19005 17.51 2.47005C17.99 2.75005 18.15 3.36005 17.87 3.84005L16.6 6.01005C16.42 6.33005 16.08 6.51005 15.74 6.51005ZM6.49998 21.52C6.65998 21.62 6.82998 21.66 6.99998 21.66C7.33998 21.66 7.67998 21.48 7.86998 21.16L9.12998 18.99C9.40998 18.51 9.24998 17.9 8.76998 17.62C8.28998 17.34 7.67998 17.5 7.39998 17.98L6.13998 20.15C5.85997 20.63 6.01998 21.24 6.49998 21.52Z"
        fill={color}
      />
    </svg>
  );
};

export const MinusButtton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={24}
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={12} cy={12} fill="#F2F2F2" r={11.5} stroke="#E0E0E0" />
    <path d="M14.158 12.332H10.7v-1.057h3.458v1.057Z" fill="#333" />
  </svg>
)

export const PlusButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={24}
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={12} cy={12} fill="#F2F2F2" r={11.5} stroke="#E0E0E0" />
    <path
      d="M15.406 11.772h-2.849v3.01h-1.022v-3.01H8.7v-.945h2.835V7.838h1.022v2.989h2.849v.945Z"
      fill="#333"
    />
  </svg>
)

export const USDIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle opacity={0.14} cx={12} cy={12} r={12} fill="#222" />
    <g clipPath="url(#a)" fill="#111">
      <path d="M12.1 4.002c-4.452 0-8.1 3.648-8.1 8.1s3.648 8.1 8.1 8.1 8.1-3.648 8.1-8.1-3.648-8.1-8.1-8.1Zm5.048 13.148a7.099 7.099 0 0 1-5.048 2.103c-1.9 0-3.692-.747-5.048-2.103a7.099 7.099 0 0 1-2.103-5.048c0-1.9.747-3.693 2.103-5.049A7.099 7.099 0 0 1 12.1 4.951c1.9 0 3.693.747 5.048 2.102a7.098 7.098 0 0 1 2.103 5.049c0 1.9-.747 3.692-2.103 5.048Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1 5.902c1.646 0 3.2.648 4.377 1.824a6.156 6.156 0 0 1 1.825 4.377c0 1.646-.648 3.2-1.825 4.377a6.156 6.156 0 0 1-4.377 1.825c-1.646 0-3.2-.648-4.377-1.825a6.155 6.155 0 0 1-1.825-4.377c0-1.646.648-3.2 1.825-4.377A6.156 6.156 0 0 1 12.1 5.902Zm.264 5.717c1.337.413 1.969.931 1.969 1.88 0 1.044-.721 1.806-1.96 1.927v.778H11.7v-.778c-1.012-.097-1.79-.64-2.122-1.458l1.118-.583c.202.453.543.737 1.02.842v-1.482c-.672-.203-1.142-.438-1.409-.721a1.558 1.558 0 0 1-.478-1.158c0-.503.178-.924.535-1.264.356-.348.802-.55 1.336-.616V8.16h.673v.826c.866.106 1.522.584 1.846 1.337l-1.077.591a1.171 1.171 0 0 0-.777-.72v1.425Zm-.648-1.458c-.38.073-.59.308-.59.624 0 .267.194.477.59.631v-1.255Zm1.313 3.434c0-.283-.17-.445-.665-.64v1.28c.397-.089.665-.324.665-.64Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(4 4)" d="M0 0h16.2v16.2H0z" />
      </clipPath>
    </defs>
  </svg>
)

