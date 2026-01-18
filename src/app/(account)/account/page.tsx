export default async function AccountPage() {
  const [session, subscription, products] = await Promise.all([
    getSession(),
    getSubscription(),
    getProducts(), // now properly typed
  ]);

  if (!session) {
    redirect('/login');
  }

  let userProduct: ProductWithPrices | undefined;
  let userPrice: Price | undefined;

  if (subscription) {
    for (const product of products) {
      for (const price of product.prices) {
        if (price.id === subscription.price_id) {
          userProduct = product;
          userPrice = price;
          break;
        }
      }
    }
  }

  return (
    <section className='rounded-lg bg-black px-4 py-16'>
      <h1 className='mb-8 text-center text-3xl font-bold text-white'>Account</h1>

      <div className='flex flex-col gap-6'>
        <Card
          title="Your Plan"
          footer={
            subscription ? (
              <Button size='sm' variant='secondary' asChild>
                <Link href='/manage-subscription'>Manage your subscription</Link>
              </Button>
            ) : (
              <Button size='sm' variant='secondary' asChild>
                <Link href='/pricing'>Start a subscription</Link>
              </Button>
            )
          }
        >
          {userProduct && userPrice ? (
            <PricingCard product={userProduct} price={userPrice} />
          ) : (
            <p className="text-gray-400 text-center py-8">
              You don't have an active subscription yet.
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
