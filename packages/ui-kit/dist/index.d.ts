import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React$1 from 'react';
import React__default from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare const buttonVariants: (
  props?:
    | ({
        variant?:
          | 'default'
          | 'destructive'
          | 'outline'
          | 'secondary'
          | 'ghost'
          | 'link'
          | null
          | undefined;
        size?: 'default' | 'sm' | 'lg' | null | undefined;
      } & class_variance_authority_dist_types.ClassProp)
    | undefined,
) => string;
interface ButtonProps
  extends React__default.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
declare const Button: React__default.ForwardRefExoticComponent<
  ButtonProps & React__default.RefAttributes<HTMLButtonElement>
>;

interface CardProps extends React__default.HTMLAttributes<HTMLDivElement> {
  children: React__default.ReactNode;
}
declare const Card: React__default.ForwardRefExoticComponent<
  CardProps & React__default.RefAttributes<HTMLDivElement>
>;

declare const typographyVariants: (
  props?:
    | ({
        variant?: 'list' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | null | undefined;
      } & class_variance_authority_dist_types.ClassProp)
    | undefined,
) => string;
type VariantType = VariantProps<typeof typographyVariants>['variant'];
interface TypographyProps extends React__default.HTMLAttributes<HTMLElement> {
  variant?: VariantType;
  children: React__default.ReactNode;
}
declare const Typography: React__default.ForwardRefExoticComponent<
  TypographyProps & React__default.RefAttributes<HTMLElement>
>;
declare const H1: React__default.ForwardRefExoticComponent<
  React__default.HTMLAttributes<HTMLHeadingElement> &
    React__default.RefAttributes<HTMLHeadingElement>
>;
declare const H2: React__default.ForwardRefExoticComponent<
  React__default.HTMLAttributes<HTMLHeadingElement> &
    React__default.RefAttributes<HTMLHeadingElement>
>;
declare const H3: React__default.ForwardRefExoticComponent<
  React__default.HTMLAttributes<HTMLHeadingElement> &
    React__default.RefAttributes<HTMLHeadingElement>
>;
declare const H4: React__default.ForwardRefExoticComponent<
  React__default.HTMLAttributes<HTMLHeadingElement> &
    React__default.RefAttributes<HTMLHeadingElement>
>;
declare const P: React__default.ForwardRefExoticComponent<
  React__default.HTMLAttributes<HTMLParagraphElement> &
    React__default.RefAttributes<HTMLParagraphElement>
>;
declare const Blockquote: React__default.ForwardRefExoticComponent<
  React__default.HTMLAttributes<HTMLQuoteElement> & React__default.RefAttributes<HTMLQuoteElement>
>;
declare const List: React__default.ForwardRefExoticComponent<
  React__default.HTMLAttributes<HTMLUListElement> & React__default.RefAttributes<HTMLUListElement>
>;

interface LoadingProps extends React__default.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}
declare const Loading: React__default.ForwardRefExoticComponent<
  LoadingProps & React__default.RefAttributes<HTMLDivElement>
>;

declare const Alert: React$1.ForwardRefExoticComponent<
  React$1.HTMLAttributes<HTMLDivElement> &
    VariantProps<
      (
        props?:
          | ({
              variant?: 'default' | 'destructive' | null | undefined;
            } & class_variance_authority_dist_types.ClassProp)
          | undefined,
      ) => string
    > &
    React$1.RefAttributes<HTMLDivElement>
>;
declare const AlertTitle: React$1.ForwardRefExoticComponent<
  React$1.HTMLAttributes<HTMLHeadingElement> & React$1.RefAttributes<HTMLParagraphElement>
>;
declare const AlertDescription: React$1.ForwardRefExoticComponent<
  React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>
>;

declare function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;

interface InputProps extends React$1.InputHTMLAttributes<HTMLInputElement> {}
declare const Input: React$1.ForwardRefExoticComponent<
  InputProps & React$1.RefAttributes<HTMLInputElement>
>;

interface SelectProps extends React$1.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{
    value: string;
    label: string;
  }>;
}
declare const Select: React$1.ForwardRefExoticComponent<
  SelectProps & React$1.RefAttributes<HTMLSelectElement>
>;

export {
  Alert,
  AlertDescription,
  AlertTitle,
  Blockquote,
  Button,
  type ButtonProps,
  Card,
  type CardProps,
  H1,
  H2,
  H3,
  H4,
  Input,
  type InputProps,
  List,
  Loading,
  type LoadingProps,
  P,
  Select,
  type SelectProps,
  Skeleton,
  Typography,
  type TypographyProps,
  buttonVariants,
};
