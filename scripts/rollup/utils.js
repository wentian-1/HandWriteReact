import path from 'path';
import fs from 'fs';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

const basePath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export const resovePath = (pkgName, isDist) => {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${basePath}/${pkgName}`;
};

export const getPackageJSON = (pkgName) => {
	const path = resovePath(pkgName);
	const str = fs.readFileSync(`${path}/package.json`);
	return JSON.parse(str);
};

export const getBasePlugins = (tsconfig = {}) => {
	return [commonjs(), typescript(tsconfig)];
};
