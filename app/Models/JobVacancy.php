<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class JobVacancy extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['slug','title', 'description', 'location', 'type', 'salary_min', 'salary_max'];

    /**
     * Get all of the applications for the JobVacancy
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;

        $slug = Str::slug($value);

        // Cek apakah slug sudah ada
        $existingSlugCount = JobVacancy::where('slug', 'like', "{$slug}%")->count();

        if ($existingSlugCount > 0) {
            $slug .= '-' . ($existingSlugCount + 1);
        }

        $this->attributes['slug'] = $slug;
    }

}
