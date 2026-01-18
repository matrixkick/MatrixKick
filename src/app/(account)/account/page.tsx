import { PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';
import { PricingCard } from '@/features/pricing/components/price-card';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { Price, ProductWithPrices } from '@/features/pricing/types';

/**
 * Minimal safe subscription shape
 * (we only need price_id here)
 */
type SafeSubscription = {
  price_id: string;
} | null;

export default async function AccountPage() {
  // 🔒 FORCE TYPES FOR EVERYTHING (kills `never`)
  const [session, subscription, products] =
    (await Promise.all([
      getSession(),
      getSubscription(),
      getProducts(),
    ])) as [
      Awaited<ReturnType<typeof getSession>>,
      SafeSubscription,
      ProductWithPrices[]
    ];

  if (!session) {
    redirect('/login');
  }

  let userProduct: ProductWithPrices | null = null;
  let userPrice: Price | null = null;

 if (subscription && products?.length) {
  // Fix: tell TypeScript products has prices
  for (const product of products as any[]) {
    // Safety: skip if no prices
    for (const price of product.prices || []) {
      if (price.id === subscription.price_id) {
        userProduct = product;
        userPrice = price;
        break;
      }
    if (userProduct) break;
  }


  return (
    <section className="rounded-lg bg-black px-4 py-16">
      <h1 className="mb-8 text-center text-3xl font-bold text-white">
        Account
      </h1>

      <div className="flex flex-col gap-6">
        <Card
          title="Your Plan"
          footer={
            subscription ? (
              <Button size="sm" variant="secondary" asChild>
                <Link href="/manage-subscription">
                  Manage your subscription
                </Link>
              </Button>
            ) : (
              <Button size="sm" variant="secondary" asChild>
                <Link href="/pricing">
                  Start a subscription
                </Link>
              </Button>
            )
          }
        >
          {userProduct && userPrice ? (
            <PricingCard product={userProduct} price={userPrice} />
          ) : (
            <p className="py-8 text-center text-gray-400">
              You don&apos;t have an active subscription yet.
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
    <div className="m-auto w-full max-w-3xl overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
      <div className="p-6">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          {title}
        </h2>
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
