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
				name: 'demo',
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
	}
];
