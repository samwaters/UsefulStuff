/*
 * CSS|SASS preprocessor
 * Converts the CSS to a hashmap containing the selectors
 * Used to simulate css-loader in Webpack
 */
const parser = require('cssparser');
const sass = require('node-sass');

module.exports = {
	getSelectors(rules) {
		let selectors = {};
		rules.forEach(rule => {
			if(rule.type === 'style') {
				// Remove the first . or # (if there is one)
				let selectorName = rule.selector.replace(/^[.#]/, '');
				// Remove any :pseudo
				selectorName = selectorName.replace(/:[A-Za-z0-9()-]+/g, '');
				// No spaces for you
				selectorName = selectorName.replace(/\s+/g, '');
				// Remove any [ ] attrs
				selectorName = selectorName.replace(/\[[^\]]+\]/, '');
				// Split any selectors up
				let selectorTree = selectorName.split(/[^A-Za-z0-9_-]/);
				// Add them all into the selector list
				selectorTree.forEach(sT => selectors[sT] = sT);
			}
			if(rule.children) {
				Object.assign(selectors, this.getSelectors(rule.children));
			}
		});
		return selectors;
	},
	process(src, path) {
		let stylesObject = {};
		if(/\.s?css$/i.test(path)) {
			let result = sass.renderSync({file: path});
			let parsed = parser.parse(result.css.toString('utf8'));
			stylesObject = this.getSelectors(parsed.rulelist);
		}
		return 'module.exports = ' + JSON.stringify(stylesObject);
	}
};