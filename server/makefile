NODE = node
TSC = node_modules/.bin/tsc
NODEMON = nodemon
ENTRY_POINT = built/server/app/app.js
MOCHA = mocha
TEST_BUILT = built/server/test/
WAIT = ../shared/bin/wait

# Phonies target
.PHONY: start compile watch

# Generate the main entrypoint
compile: 
	@echo "Compiling the server"
	$(TSC)

# Start the main entrypoint
start: compile
	@echo "Starting the server"
	$(NODE) $(ENTRY_POINT)

watch: 
	@echo "Watching the server"
	$(NODEMON) --watch app/ -e ts --exec "make start || true"

compile_tests: 
	@echo "Compiling the tests"
	$(TSC) -p test/tsconfig.json

test: compile_tests	
	@echo "Launching the tests"
	$(WAIT)
	$(MOCHA) $(TEST_BUILT) || true

watch-test: 
	nodemon -w test -w app --exec "make test" -e ts

clean: 
	rm built -fr
