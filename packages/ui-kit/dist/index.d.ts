import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React from 'react';
import React__default from 'react';
import { VariantProps } from 'class-variance-authority';

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface InputProps extends React__default.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}
declare const Input: React__default.FC<InputProps>;

interface CardProps extends React__default.HTMLAttributes<HTMLDivElement> {
    children: React__default.ReactNode;
}
declare const Card: React__default.FC<CardProps>;

interface TypographyProps extends React__default.HTMLAttributes<HTMLElement> {
    children: React__default.ReactNode;
}
declare const H1: React__default.FC<TypographyProps>;
declare const H2: React__default.FC<TypographyProps>;
declare const P: React__default.FC<TypographyProps>;

export { Button, type ButtonProps, Card, type CardProps, H1, H2, Input, type InputProps, P, type TypographyProps, buttonVariants };
