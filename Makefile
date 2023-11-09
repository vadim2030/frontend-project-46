install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test	
		
jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
