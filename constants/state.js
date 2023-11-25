import {atom} from "recoil";

export const headerState = atom({
	key: "header",
	default: "Trang chủ",
});

export const loaderState = atom({
	key: "loader",
	default: false
})

export const searchState = atom({
	key: "search",
	default: ""
})
