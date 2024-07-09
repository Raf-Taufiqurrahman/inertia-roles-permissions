<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            'dashboard-access', 'dashboard-data',
            'permissions-access', 'permissions-data', 'permissions-create', 'permissions-update', 'permissions-delete',
            'users-access', 'users-data', 'users-create', 'users-update', 'users-delete',
            'posts-access', 'posts-data', 'posts-create', 'posts-update', 'posts-delete',
        ])->each(fn($item) => Permission::create(['name' => $item]));
    }
}
