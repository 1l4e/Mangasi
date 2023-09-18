"use client"

import { home } from '@/lib/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const bread = pathname.split('/').filter(part => part !== '');;
  const rootBreadcrumb = (
    <Link href={home} key="home">
      Home
    </Link>
  );
  let breadcrumbs = [rootBreadcrumb];

  for (let i = 0; i < bread.length; i++) {
    const currentPath = bread.slice(0, i + 1).join('/');
    const displayName = bread[i]; // You can customize the display name here if needed

    const breadcrumb = (
      <Link href={`/${currentPath}`} key={currentPath}>
        {displayName}
      </Link>
    );

    breadcrumbs.push(breadcrumb);
  }
  return (
    <div className="breadcrumb container h-10 ">
    {breadcrumbs.map((breadcrumb, index) => (
      <React.Fragment key={index}>
        {index > 0 && ' / '} {/* Add a separator between breadcrumbs */}
        {breadcrumb}
      </React.Fragment>
    ))}
  </div>
  )
}

export default BreadcrumbComponent