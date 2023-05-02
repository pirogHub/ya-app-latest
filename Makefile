createImg: 
	docker build -t ya-app .
run:
	docker run -d -p 80:8080 --name ya-app ya-app