import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export interface BreadcrumbLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
  asChild?: boolean;
}

export function Breadcrumb({ children, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("mb-4 flex", className)}
      {...props}
    >
      <ol className="flex items-center space-x-2 space-x-reverse">
        {children}
      </ol>
    </nav>
  );
}

export function BreadcrumbItem({ children, className, ...props }: BreadcrumbItemProps) {
  return (
    <li
      className={cn("inline-flex items-center", className)}
      {...props}
    >
      {children}
    </li>
  );
}

export function BreadcrumbLink({ children, href, className, ...props }: BreadcrumbLinkProps) {
  return (
    <div className="flex items-center">
      <Link href={href}>
        <a
          className={cn("text-sm font-medium text-neutral-600 hover:text-primary", className)}
          {...props}
        >
          {children}
        </a>
      </Link>
      <ChevronLeft className="mx-2 h-4 w-4 text-neutral-400" />
    </div>
  );
}
