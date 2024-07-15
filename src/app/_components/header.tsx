import { Icon } from "@iconify/react";

export async function Header() {
  return (
    <div className="headerMainDiv bg-white">
      <div className="headerTopMainDiv flex h-[100px] flex-col justify-evenly">
        <div className="headerTopDiv flex h-max items-center justify-end gap-6 px-12 pt-1 text-sm">
          <span>Help</span>
          <span>Orders & Returns</span>
          <span>Hi, John</span>
        </div>
        <div className="headerSecondDiv flex h-max w-full items-center justify-between px-12 py-2">
          <span className="text-3xl font-bold">ECOMMERCE</span>
          <div className="flex gap-6 text-base font-bold">
            <span>Categories</span>
            <span>Sale</span>
            <span>Clearance</span>
            <span>New stock</span>
            <span>Trending</span>
          </div>
          <div className="flex gap-4">
            <Icon className="text-xl" icon="carbon:search" />
            <Icon className="text-xl" icon="prime:shopping-cart" />
          </div>
        </div>
      </div>
      <div className="headerThirdDiv flex h-9 items-center justify-center bg-slate-100">
        <span>
          {"<"}
          <span className="px-3 text-sm">Get 10% off on business sign up</span>
          {">"}
        </span>
      </div>
    </div>
  );
}
