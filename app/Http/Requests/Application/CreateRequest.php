<?php

namespace App\Http\Requests\Application;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                Rule::unique('applications')->where(function ($query) {
                    return $query->where('job_vacancy_id', $this->job_vacancy_id);
                }),
            ],
            'resume' => 'required|file|mimes:pdf,jpg,png|max:2048',
            'cover_letter' => 'required|string',
            'job_vacancy_id' => 'required|integer|exists:job_vacancies,id',
        ];
    }
}
