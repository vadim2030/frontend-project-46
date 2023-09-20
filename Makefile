install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
testrun1:
	gendiff 	__fixtures__/filepath1.json __fixtures__/filepath2.json
testrun2:
	gendiff 	__fixtures__/filepath1.yml __fixtures__/filepath2.json	
testrun3:
	gendiff 	__fixtures__/filepath1.yml __fixtures__/filepath2.yml		
jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest	