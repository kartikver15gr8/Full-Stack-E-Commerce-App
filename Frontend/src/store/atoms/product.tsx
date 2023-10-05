import { atom } from 'recoil';

export const productState = atom({
    key: "productState",
    default: {
        isLoading: true,
        productDetails: null
    }
})
