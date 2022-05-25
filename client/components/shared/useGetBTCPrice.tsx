import { useState } from 'react';
import useSWR from 'swr';

interface Props {
    amount?: number
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
};

interface iCoins {
    coins: Price[]
}

const defaultState:iCoins = {
    coins: []
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetBTCPrice = ({ amount }: Props) => {
    // const [fetchedData, setFetchedData] = useState(defaultState.coins)
    const { data, error } = useSWR('https://api.coinstats.app/public/v1/coins?skip=0&limit=1', fetcher, { refreshInterval: 30000 });
    
    if (!amount) return data?.coins[0].price;

    console.log('data is ', data)
    console.log('price is ', data?.coins[0].price)
    console.log('amount is ',amount)

    let price = data?.coins[0].price; 
    let usdToBTC = amount * 1 / price;
    let usdToSats = usdToBTC * 100000000;
    return {
        usdToBTC,
        usdToSats,
        usd: amount,
    } 
}