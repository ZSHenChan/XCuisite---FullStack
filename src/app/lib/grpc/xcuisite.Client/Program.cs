using Grpc.Net.Client;
using grpcServices;

class Program
{
    static void Main(string[] args)
    {
        var channel = GrpcChannel.ForAddress("http://localhost:8082");
        var client = new GetProductsService.GetProductsServiceClient(channel);
        var req = new ProductsRequest
        {
            Flavour = "",
        };
        var reply = client.GetProducts(req);
        Console.WriteLine("Reply: " + reply);
    }
}