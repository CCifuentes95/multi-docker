docker build -t ccifuentes95/multi-client:latest  -t ccifuentes95/multi-client:$SHA  -f ./client/Dockerfile ./client
docker build -t ccifuentes95/multi-api:latest     -t ccifuentes95/multi-api:$SHA     -f ./api/Dockerfile    ./api
docker build -t ccifuentes95/multi-worker:latest  -t ccifuentes95/multi-worker:$SHA  -f ./worker/Dockerfile ./worker

docker push ccifuentes95/multi-client:latest
docker push ccifuentes95/multi-api:latest
docker push ccifuentes95/multi-worker:latest

docker push ccifuentes95/multi-client:$SHA
docker push ccifuentes95/multi-api:$SHA
docker push ccifuentes95/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=ccifuentes95/multi-client:$SHA
kubectl set image deployments/api-deployment api=ccifuentes95/multi-api:$SHA
kubectl set image deployments/api-deployment worker=ccifuentes95/multi-api:$SHA