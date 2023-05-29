export type TRef = any;
export type TProps = any;
export type TKey = any;
export type TElementType = any;
export interface IReactElement {
	$$typeof: symbol | number;
	type: TElementType;
	ref: TRef;
	props: TProps;
	key: TKey;
	__mark: string;
}
