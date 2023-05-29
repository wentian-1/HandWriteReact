import {
	IReactElement,
	TKey,
	TProps,
	TRef,
	TElementType
} from 'shared/ReactTypes';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';

// jsx或者createElement返回的结果是一个ReactElemt的数组结构
/**
 * 定义ReactElemt
 * @param type 标签类型
 * @param key key
 * @param ref ref
 * @param props props
 */
const ReactElement = function (
	type: TElementType,
	key: TKey,
	ref: TRef,
	props: TProps
): IReactElement {
	const element = {
		// 区分是否是ReactElement的数据结构
		$$typeof: REACT_ELEMENT_TYPE,
		key,
		ref,
		props,
		type,
		__mark: 'yfc' // 区分真实的React
	};
	return element;
};

export const jsx = (type: TElementType, config: any, ...args: any[]) => {
	let key: TKey = null;
	let ref: TRef = null;
	const props: TProps = {};

	for (const prop in config) {
		if (Object.prototype.hasOwnProperty.call(config, prop)) {
			const element = config[prop];
			if (prop === 'key' && element !== undefined) {
				key = '' + element;
				continue;
			}
			if (prop === 'ref' && element !== undefined) {
				ref = element;
				continue;
			}
		}
	}

	const argsLen = args.length;
	if (argsLen) {
		if (argsLen === 1) {
			props.children = args[0];
		} else {
			props.children = args;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDev = jsx;
