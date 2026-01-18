import { PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';
import { PricingCard } from '@/features/pricing/components/price-card';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { Price, ProductWithPrices } from '@/features/pricing/types';

// Helper type to tell TypeScript that prices exists
type SafeProduct = ProductWithPrices & { prices: Price[] };

export default async function AccountPage() {
  const [session, subscription, rawProducts] = await Promise.all([
    getSession(),
    getSubscription(),
    getProducts(),
  ]);

  if (!session) {
    redirect('/login');
  }

  // Type assertion to fix 'never' issue
  const products = rawProducts as SafeProduct[];

  let userProduct: SafeProduct | undefined;
  let userPrice: Price | undefined;

  if (subscription && products.length > 0) {
    outer: for (const product of products) {
      if (product.prices && product.prices.length > 0) {
        for (const price of product.prices) {
          if (price.id === subscription.price_id) {
            userProduct = product;
            userPrice = price;
            break outer;
          }
        }
      }
    }
  }

  return (
    <section className="rounded-lg bg-black px-4 py-16">
      <h1 className="mb-8 text-center text-3xl font-bold text-white">Account</h1>

      <div className="flex flex-col gap-6">
        <Card
          title="Your Plan"
          footer={
            subscription ? (
              <Button size="sm" variant="secondary" asChild>
                <Link href="/manage-subscription">Manage subscription</Link>
              </Button>
            ) : (
              <Button size="sm" variant="secondary" asChild>
                <Link href="/pricing">Start a subscription</Link>
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

function Card({
  title,
  footer,
  children,
}: PropsWithChildren<{
  title: string;
  footer?: ReactNode;
}>) {
  return (
    <div className="m-auto w-full max-w-3xl rounded-md bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="p-6">
        <h2 className="mb-4 text-2xl font-semibold text-white">{title}</h2>
        <div className="py-4">{children}</div>
      </div>
      {footer && (
        <div className="flex justify-end border-t border-zinc-800 bg-zinc-950/50 p-4">
          {footer}
        </div>
      )}
    </div>
  );
}
