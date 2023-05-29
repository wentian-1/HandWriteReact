import { resovePath, getPackageJSON, getBasePlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const pkgJSON = getPackageJSON('react');
const basePath = resovePath(pkgJSON.name);
const distPath = resovePath(pkgJSON.name, true);

export default [
	{
		input: `${basePath}/${pkgJSON.module}`,
		output: [
			{
				file: `${distPath}/index.js`,
				name: 'react',
				format: 'umd'
			}
		],
		plugins: [
			...getBasePlugins(),
			generatePackageJson({
				inputFolder: basePath,
				outputFolder: distPath,
				baseContents: ({ name, version, description }) => ({
					name,
					version,
					description
				})
			})
		]
	},
	{
		input: `${basePath}/src/jsx.ts`,
		output: [
			{
				file: `${distPath}/jsx-dev-runtime.js`,
				name: 'jsxDEV',
				format: 'umd'
			},
			{
				file: `${distPath}/jsx-runtime.js`,
				name: 'jsx',
				format: 'umd'
			}
		],
		plugins: getBasePlugins()
	}
];
