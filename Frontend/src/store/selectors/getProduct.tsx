import { productState } from "../atoms/product";
import { selector } from "recoil";

export const isProductLoading = selector({
    key: 'isProductLoading',
    get: ({ get }) => {
        const state = get(productState);

        return state.isLoading;
    },
});

export const productDetails = selector({
    key: 'productDetailsState',
    get: ({ get }) => {
        const state = get(productState);

        return state.productDetails;
    },
});

export const productDetailsTitle = selector({
    key: 'productTitleState',
    get: ({ get }) => {
        const state = get(productState);
        if (state.productDetails) {
            return state.productDetails.title;
        }
        return "";
    },
});

export const productDetailsDescription = selector({
    key: 'productDescriptionState',
    get: ({ get }) => {
        const state = get(productState);
        if (state.productDetails) {
            return state.productDetails.description;
        }
        return "";
    },
});

export const productDetailsId = selector({
    key: 'productDetailsId',
    get: ({ get }) => {
        const state = get(productState);
        if (state.productDetails) {
            return state.productDetails._id;
        }
        return "";
    },
});

export const productDetailsPrice = selector({
    key: 'productDetailsPriceState',
    get: ({ get }) => {
        const state = get(productState);
        if (state.productDetails) {
            return state.productDetails.price;
        }
        return "";
    },
});

export const productDetailsImage = selector({
    key: 'productDetailsImageState',
    get: ({ get }) => {
        const state = get(productState);
        if (state.productDetails) {
            return state.productDetails.imgLink;
        }
        return "";
    },
});