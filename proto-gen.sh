cd ./src/app/lib

mkdir -p ./proto
protoc -I=./grpc/xcuisite.Client/Protos \
./grpc/xcuisite.Client/Protos/*.proto \
 --js_out=import_style=commonjs:./proto \
 --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto