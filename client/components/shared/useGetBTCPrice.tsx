import { useState } from 'react';
import useSWR from 'swr';

interface Props {
    amount: number
}

interface Price {
    id:              string;
    icon:            string;
    name:            string;
    symbol:          string;
    rank:            number;
    price:           number;
    priceBtc:        number;
    volume:          number;
    marketCap:       number;
    availableSupply: number;
    totalSupply:     number;
    priceChange1h:   number;
    priceChange1d:   number;
    priceChange1w:   number;
    websiteUrl:      string;
    twitterUrl:      string;
    exp:             string[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetBTCPrice = ({ amount }: Props) => {
    const [fetchedData, setFetchedData] = useState({coins: []})
    const { data, error } = useSWR('https://api.coinstats.app/public/v1/coins?skip=0&limit=1', fetcher, {refreshInterval: 3000} );

    console.log('data is ', data)

    setFetchedData(data);

    // @ts-ignore
    let price = fetchedData?.coins[0].price; 
    let usdToBTC = amount * 1 / price;
    let usdToSats = usdToBTC * 100000000;
    return {
        usdToBTC,
        usdToSats,
        usd: amount,
    } 
}