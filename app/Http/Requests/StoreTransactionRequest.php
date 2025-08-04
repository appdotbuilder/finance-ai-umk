<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'amount' => 'required|numeric|min:0.01',
            'description' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'type' => 'required|in:income,expense,transfer',
            'transaction_date' => 'required|date',
            'from_account_id' => 'nullable|exists:financial_accounts,id',
            'to_account_id' => 'nullable|exists:financial_accounts,id',
            'currency' => 'nullable|string|size:3',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'amount.required' => 'Transaction amount is required.',
            'amount.numeric' => 'Amount must be a valid number.',
            'amount.min' => 'Amount must be greater than zero.',
            'description.required' => 'Transaction description is required.',
            'type.required' => 'Transaction type is required.',
            'type.in' => 'Transaction type must be income, expense, or transfer.',
            'transaction_date.required' => 'Transaction date is required.',
            'transaction_date.date' => 'Please provide a valid transaction date.',
        ];
    }
}