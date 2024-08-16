<?php

namespace App\Http\Requests\Job;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class CreateRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:full-time,part-time,contract',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
        ];
    }

    protected function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $salaryMin = $this->input('salary_min');
            $salaryMax = $this->input('salary_max');

            if ($salaryMin !== null && $salaryMax !== null && $salaryMax < $salaryMin) {
                $validator->errors()->add('salary_max', 'Salary max cannot be less than salary min.');
            }
        });
    }
}
