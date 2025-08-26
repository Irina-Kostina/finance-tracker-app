// File: src/types.ts
export interface Account {
id: string;
name: string;
type: 'checking' | 'savings' | 'investment';
balance: number;
color: string;
gradient: string;
icon: string;
}


export interface Category {
id: string;
label: string;
color: string;
gradient: string;
type: 'expense' | 'income';
}


export interface FinanceEntry {
id: number;
amount: number;
category: string; // category id or 'transfer'
account: string; // account id
description: string;
date: string; // YYYY-MM-DD
timestamp: number;
type: 'expense' | 'income' | 'transfer';
mood?: string;
}


export interface FormData {
amount: string;
category: string;
account: string;
description: string;
date: string;
type: 'expense' | 'income' | 'transfer';
toAccount?: string;
mood?: string;
}


export interface Budget {
categoryId: string;
limit: number;
spent: number;
}


export interface Goal {
id: string;
name: string;
targetAmount: number;
currentAmount: number;
deadline: string;
gradient: string;
}


export type ViewType = 'dashboard' | 'transactions' | 'budget' | 'accounts' | 'goals' | 'analytics';
export type PeriodType = 'week' | 'month' | 'quarter' | 'year';